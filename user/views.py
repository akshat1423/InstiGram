from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages 
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Profile, Post, LikePost, FollowersCount, ShowInterest, comments, Events, ChatMsg
from itertools import chain
from django.http import JsonResponse
import json
import base64
import random

from .serializer import ChatMsgSerializer,ProfileSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status

from django.db.models import OuterRef, Subquery
from django.db.models import Q

# Create your views here.

# @login_required(login_url='signin')

def index(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        user_auth= data.get('userId')
        user_object= User.objects.get(id=user_auth)
        user_profile= Profile.objects.get(user_id= int(user_auth))

        # user_following_list = []
        # feed= []

        # user_following = FollowersCount.objects.filter(follower=request.user.username)

        # for users in user_following:
        #     user_following_list.append(users.user)
        
        # for usernames in user_following_list:
        #     feed_lists= Post.objects.filter(user= usernames)
        #     feed.append(feed_lists)
        
        # feed_list = list(chain(*feed))

        # posts = Post.objects.all()
        posts = Post.objects.all().order_by('-created_at')

        posts_array= [{
            '_id': post.id,
            'auth': post.user,
            'authId': (User.objects.get(username=post.user)).id,
            'profileImage': (Profile.objects.get(user_id= (User.objects.get(username=post.user)).id)).profileimg,
            'likes':post.no_of_likes,
            'isLiked': LikePost.objects.filter(post_id=post.id, username=user_object.username).exists(),
            'comments':[{'commentAuth': comm.username, 'commentContent': comm.text } for comm in comments.objects.filter(post_id=post.id)],
            'caption': post.caption,
            'postImage': post.image} 
            for post in posts
            ]

        return JsonResponse(posts_array, safe=False)
    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def edit(request):
    if request.user.is_authenticated:    
        data = json.loads(request.body)
        user_auth= data.get('userId')
        user_object = User.objects.get(id=user_auth)
        user_profile= Profile.objects.get(user_id= int(user_auth))
        if request.method== 'POST':
            if data.get('profileImage')== None:
                image= user_profile.profileimg
            else:
                image= data.get('profileImage')
            bio= data.get('bio')
            department= data.get('department')
            degree= data.get('degree')
            year= data.get('year')

            username= data.get('username')
            if username == user_object.username:
                user_profile.profileimg= image
                user_profile.bio= bio
                user_profile.degree= degree
                user_profile.year= year
                user_profile.department= department
                user_profile.save()
                
                response_data = {'data': 'done'}
                return JsonResponse(response_data, status=200)
            
            elif User.objects.filter(username=username).exists():
                response_data = {'data': 'username'}
                return JsonResponse(response_data, status=409)
        
            else:
                user_object.username= username
                user_profile.profileimg= image
                user_profile.bio= bio
                user_profile.degree= degree
                user_profile.year= year
                user_profile.department= department
                user_object.save()
                user_profile.save()
                
                response_data = {'data': 'done'}
                return JsonResponse(response_data, status=200)

    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)        

def settings(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        user_auth= data.get('userId')
        user_profile= Profile.objects.get(user_id= int(user_auth))
        if request.method== 'POST':
            if data.get('profileImage')== None:
                image= user_profile.profileimg
            else:
                image= data.get('profileImage')
            bio= data.get('bio')
            department= data.get('department')
            degree= data.get('degree')
            year= data.get('year')

            user_profile.profileimg= image
            user_profile.bio= bio
            user_profile.degree= degree
            user_profile.year= year
            user_profile.department= department
            user_profile.save()
            
        
        response_data = {'data': 'done'}
        return JsonResponse(response_data, status=200)    
    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def upload(request):
    if request.user.is_authenticated:
        if request.method=='POST':
            data = json.loads(request.body)
            user_auth = data.get('userId')
            user_object = User.objects.get(id=user_auth)
            user_profile= Profile.objects.get(user_id= user_auth)
            user = user_object.username
            image= data.get('postImage')
            caption = data.get('caption')

            new_post = Post.objects.create(user= user, image= image, caption= caption)
            new_post.save()

            response_data = {'data': 'done'}
            return JsonResponse(response_data, status=200)
        else:
            response_data = {'data': 'done'}
            return JsonResponse(response_data, status=200)
    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def search(request):
    if request.user.is_authenticated:
        if request.method=='POST':
            data = json.loads(request.body)
            username = data.get('query')
            username_object= User.objects.filter(username__icontains= username)

            username_profile= []
            username_profile_list= []

            for users in username_object:
                username_profile.append(users.id)

            for ids in username_profile:
                profile_lists= Profile.objects.filter(id_user=ids)
                username_profile_list.append(profile_lists)

            username_profile_list= list(chain(*username_profile_list))

        response_data = [{'data': (User.objects.get(id= suser.user_id)).username, 'userId': suser.user_id}
                        for suser in username_profile_list 
                        ]
        return JsonResponse(response_data, safe=False)
    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def like_post(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        user_auth = data.get('userId')
        user_object = User.objects.get(id=user_auth)
        user_profile= Profile.objects.get(user_id= user_auth)
        username= user_object.username
        post_id= data.get('postId')

        post = Post.objects.get(id= post_id)

        like_filter= LikePost.objects.filter(post_id=post_id, username=username).first()

        if like_filter== None:
            new_like= LikePost.objects.create(post_id=post_id, username= username)
            new_like.save()
            post.no_of_likes= post.no_of_likes+1
            post.save()
            response_data = {'data': 'done'}
            return JsonResponse(response_data, status=200)
        else:
            like_filter.delete()
            post.no_of_likes= post.no_of_likes-1
            post.save()
            response_data = {'data': 'done'}
            return JsonResponse(response_data, status=200)

    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def comment(request):
    if request.user.is_authenticated:
        data = json.loads(request.body)
        user_auth = data.get('commentAuth')
        user_object = User.objects.get(id=user_auth)
        user_profile = Profile.objects.get(user_id=user_auth)
        username= user_object.username
        post_id= data.get('postId')
        text= data.get('commentContent')

        post = Post.objects.get(id= post_id)

        new_comment= comments.objects.create(post_id= post_id, username= username, text= text)
        new_comment.save()
        post.no_of_comments= post.no_of_comments+1
        post.save()
        
        response_data = {'data': 'done'}
        return JsonResponse(response_data, status=200)   

    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def profile(request):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        data = json.loads(request.body)
        user_auth = data.get('userId')
        user_object = User.objects.get(id=user_auth)
        user_profile = Profile.objects.get(user_id=user_auth)
        pk = user_object.username
        user_posts = Post.objects.filter(user=pk)
        user_post_length = len(user_posts)

        posts_array = [{'postId': post.id, 'postImage': post.image} for post in user_posts]

        follower = data.get('loggedUser')

        if FollowersCount.objects.filter(follower=follower, user=user_auth).exists():
            button_text = 'Unfollow'
            isFollowing = True
        else:
            button_text = 'Follow'
            isFollowing = False

        user_followers = len(FollowersCount.objects.filter(user=user_auth))
        user_following = len(FollowersCount.objects.filter(follower=user_auth))

        response_data = {
            'DP': user_profile.profileimg,
            'posts': posts_array,
            'details': {
                'username': pk,
                'isFollowing': isFollowing,
                'posts': user_post_length,
                'followers': user_followers,
                'following': user_following,
                'gradYear': user_profile.year,
                'degree': user_profile.degree,
                'department': user_profile.department,
                'bio': user_profile.bio,
            }
        }
        return JsonResponse(response_data, status=200)
    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def follow(request):
    if request.user.is_authenticated:
        if request.method== 'POST':
            data = json.loads(request.body)
            follower= data.get('loggedUser')
            user= data.get('userId')

            if FollowersCount.objects.filter(follower=follower, user= user).first():
                delete_folower = FollowersCount.objects.get(follower=follower, user=user)
                delete_folower.delete()

                response_data = {'data': 'done'}
                return JsonResponse(response_data, status=200)            
            else:
                new_follower= FollowersCount.objects.create(follower=follower, user=user)
                new_follower.save()

                response_data = {'data': 'done'}
                return JsonResponse(response_data, status=200)
    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def interest(request):
    if request.user.is_authenticated:
        if request.method== 'POST':
            interesties= data.get['interesties']
            user= data.get['user']

            if ShowInterest.objects.filter(interesties=interesties, user= user).first():
                delete_interesties = ShowInterest.objects.get(interesties=interesties, user=user)
                delete_interesties.delete()
                
                return redirect('/profile/'+user)
            else:
                new_interested= ShowInterest.objects.create(interesties=interesties, user=user)
                new_interested.save()

                check_match= ShowInterest.objects.filter(interesties= user, user= interesties)

                if check_match != None:
                    messages.info(request, 'Matched')

                return redirect('/profile/'+user)  
        else:
            return redirect('/')

    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('roll')  # Assuming 'roll' in JSON corresponds to email
            password = data.get('password')
            
            if not (username and email and password):
                # Handle case where one or more fields are missing
                return HttpResponse(status=400)  # Bad Request
                
            if User.objects.filter(email=email).exists():
                messages.info(request, 'Email Taken')
                response_data = {'data': 'roll'}  
                return JsonResponse(response_data, status=409)
                
            elif User.objects.filter(username=username).exists():
                response_data = {'data': 'username'}
                return JsonResponse(response_data, status=409)
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()

                
                user_login = auth.authenticate(username=username, password=password)
                auth.login(request, user_login)

                # create a profile object for new user
                user_model = User.objects.get(username=username)
                new_profile = Profile.objects.create(user=user_model, id_user=user_model.id)
                user_id= new_profile.id_user
                new_profile.save()                
                response_data = {'userId': user_id}
                return JsonResponse(response_data, status=200)
        except json.JSONDecodeError:
            response_data = {'data': 'done'}
            return JsonResponse(response_data, status=200)  # Bad Request for invalid JSON
    else:
        return render(request, 'index.html')


def signin(request):

    if request.method== 'POST':
        data = json.loads(request.body)
        username= data.get('username')
        password= data.get('password')

        try:
            user= auth.authenticate(username= username, password= password)
            user_profile= Profile.objects.get(user=user)
            if user is not None:
                auth.login(request, user)
                response_data = {'data': 'done', 'userId': user_profile.user_id}
                return JsonResponse(response_data, status=200)
        except:
            response_data = {'data': 'Notdone'}
            print("NotDone")
            return JsonResponse(response_data, status=409)

def logout(request):
    auth.logout(request)
    response = {'data': 'done'}
    return JsonResponse(response, status=200)


def events(request):
    if request.user.is_authenticated:
        if request.method== 'POST':
            events= Events.objects.all()
            events_array= [{           
                'date': event.event_date,
                'content': event.event_name,
                'color': event.event_color,
            } for event in events]
            return JsonResponse(events_array, safe=False)
    else:
        # User is not authenticated, return an error response
        error_data = {'error': 'Access denied. User is not authenticated.'}
        return JsonResponse(error_data, status=401)

def cookie(request):
    if request.user.is_authenticated:
        response = {'data': 'done'}
        return JsonResponse(response, status=200)
    
    else:
        response = JsonResponse({'data': 'NotAuth'}, status=401)
    
class MyInbox(generics.ListAPIView):
    serializer_class = ChatMsgSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_id']

        messages = ChatMsg.objects.filter(
            id__in =  Subquery(
                User.objects.filter(
                    Q(sender__reciever=user_id) |
                    Q(reciever__sender=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        ChatMsg.objects.filter(
                            Q(sender=OuterRef('id'),reciever=user_id) |
                            Q(reciever=OuterRef('id'),sender=user_id)
                        ).order_by('-id')[:1].values_list('id',flat=True) 
                    )
                ).values_list('last_msg', flat=True).order_by("-id")
            )
        ).order_by("-id")
            
        return messages
    
class GetMessages(generics.ListAPIView):
    serializer_class = ChatMsgSerializer
    
    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        reciever_id = self.kwargs['reciever_id']
        messages =  ChatMsg.objects.filter(sender__in=[sender_id, reciever_id], reciever__in=[sender_id, reciever_id])
        return messages

class SendMessages(generics.CreateAPIView):
    serializer_class = ChatMsgSerializer



class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()




class SearchUser(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
 

    def list(self, request, *args, **kwargs):
        
        username = self.kwargs['username']
        logged_in_user = self.request.user
        users = Profile.objects.filter(Q(user__username__icontains=username))

        if not users.exists():
            return Response(
                {"detail": "No users found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    
