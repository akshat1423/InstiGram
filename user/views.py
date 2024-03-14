from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib import messages 
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Profile, Post, LikePost, FollowersCount, ShowInterest, comments
from itertools import chain
from django.http import JsonResponse
import json
import base64
import random


# Create your views here.

# @login_required(login_url='signin')
def index(request):
    user_object= User.objects.get(username= request.user.username)
    user_profile= Profile.objects.get(user= user_object)

    user_following_list = []
    feed= []

    user_following = FollowersCount.objects.filter(follower=request.user.username)

    for users in user_following:
        user_following_list.append(users.user)
    
    for usernames in user_following_list:
        feed_lists= Post.objects.filter(user= usernames)
        feed.append(feed_lists)
    
    feed_list = list(chain(*feed))

    # posts = Post.objects.all()

    all_users = User.objects.all()
    user_following_all = []

    for user in user_following:
        user_list = User.objects.get(username=user.user)
        user_following_all.append(user_list)
    
    new_suggestions_list = [x for x in list(all_users) if (x not in list(user_following_all))]
    current_user = User.objects.filter(username=request.user.username)
    final_suggestions_list = [x for x in list(new_suggestions_list) if ( x not in list(current_user))]
    random.shuffle(final_suggestions_list)

    username_profile = []
    username_profile_list = []

    for users in final_suggestions_list:
        username_profile.append(users.id)

    for ids in username_profile:
        profile_lists = Profile.objects.filter(id_user=ids)
        username_profile_list.append(profile_lists)

    suggestions_username_profile_list = list(chain(*username_profile_list))


    return render(request, 'index.html', {'user_profile': user_profile, 'posts':feed_list, 'suggestions_username_profile_list': suggestions_username_profile_list[:4]})

def edit(request):
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
        

# @login_required(login_url='signin')
def settings(request):
    data = json.loads(request.body)
    user_auth= data.get('userId')
    # print(user_auth)
    user_profile= Profile.objects.get(user_id= int(user_auth))
    # print(user_profile)
    if request.method== 'POST':

        # if request.FILES.get('image')== None:
            
        #     image= user_profile.profileimg
        #     bio= data.get('bio')
        #     department= data.get('department')
        #     degree= data.get('degree')
        #     year= data.get('year')
        #     # location= data.get['location']

        #     user_profile.profileimg= image
        #     user_profile.bio= bio
        #     user_profile.degree= degree
        #     user_profile.year= year
        #     user_profile.department= department
        #     # user_profile.location= location
        #     user_profile.save()

        # if request.FILES.get('image') != None:
        if data.get('profileImage')== None:
            image= user_profile.profileimg
        else:
            image= data.get('profileImage')
        bio= data.get('bio')
        department= data.get('department')
        degree= data.get('degree')
        year= data.get('year')
        
        # location= data.get['location']

        user_profile.profileimg= image
        user_profile.bio= bio
        user_profile.degree= degree
        user_profile.year= year
        user_profile.department= department
        # user_profile.location= location
        user_profile.save()
        
    
    response_data = {'data': 'done'}
    return JsonResponse(response_data, status=200)
    # return render(request, 'setting.html', {'user_profile': user_profile})

# @login_required(login_url='signin')
def upload(request):
    if request.method=='POST':
        user = request.user.username
        image= request.FILES.get('image_upload')
        caption = data.get['caption']

        new_post = Post.objects.create(user= user, image= image, caption= caption)
        new_post.save()

        return redirect('/')
    else:
        return redirect('/')

# @login_required(login_url='signin')
def search(request):

    user_object = User.objects.get(username= request.user.username)
    user_profile= Profile.objects.get(user= user_object)
    if request.method=='POST':
        username = data.get['username']
        username_object= User.objects.filter(username__icontains= username)

        username_profile= []
        username_profile_list= []

        for users in username_object:
            username_profile.append(users.id)

        for ids in username_profile:
            profile_lists= Profile.objects.filter(id_user=ids)
            username_profile_list.append(profile_lists)

        username_profile_list= list(chain(*username_profile_list))

    return render(request, 'search.html', {'user_object': user_object, 'user_profile': user_profile,'username_profile_list': username_profile_list})

# @login_required(login_url='signin')
def like_post(request):
    username= request.user.username
    post_id= request.GET.get('post_id')

    post = Post.objects.get(id= post_id)

    like_filter= LikePost.objects.filter(post_id=post_id, username=username).first()

    if like_filter== None:
        new_like= LikePost.objects.create(post_id=post_id, username= username)
        new_like.save()
        post.no_of_likes= post.no_of_likes+1
        post.save()
        return redirect('/')
    else:
        like_filter.delete()
        post.no_of_likes= post.no_of_likes-1
        post.save()
        return redirect('/')

# @login_required(login_url='signin')
def comment(request):
    username= request.user.username
    post_id= data.get('post_id')
    text= data.get['text']

    new_comment= comments.objects.create(post_id= post_id, username= username, text= text)
    new_comment.save()

    return redirect('/')


# @login_required(login_url='signin')
def profile(request):
    data = json.loads(request.body)
    # data = json.loads(request.body)
    user_auth = data.get('userId')
    user_object = User.objects.get(id=user_auth)
    user_profile= Profile.objects.get(user_id= user_auth)
    pk= user_object.username
    user_posts= Post.objects.filter(user=pk)
    user_post_length= len(user_posts)

    posts_array = [{'postId': post.id, 'postImage': post.image} for post in user_posts]

    follower= request.user.username
    # interesties= request.user.username
    user= pk

    if FollowersCount.objects.filter(follower=follower, user= user).first():
        button_text= 'Unfollow'
        isFollowing= True
    else:
        button_text= 'Follow'
        isFollowing= False
    
    user_followers= len(FollowersCount.objects.filter(user=pk))
    user_following= len(FollowersCount.objects.filter(follower=pk))

    # if ShowInterest.objects.filter(interesties=interesties, user= user).first():
    #     interest_button_text= 'Not Interested'
    # else:
    #     interest_button_text= 'Show interest'

    response_data = {
        # 'user_object': user_object, 
        # 'user_profile': user_profile,
        'DP': user_profile.profileimg,
        'posts': posts_array,
        # 'user_post_length': user_post_length,
        # 'button_text': button_text,
        # 'user_followers': user_followers,
        # 'user_following': user_following,
        # 'interest_button_text': interest_button_text,
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

# @login_required(login_url='signin')
def follow(request):
    if request.method== 'POST':
        follower= data.get['follower']
        user= data.get['user']

        if FollowersCount.objects.filter(follower=follower, user= user).first():
            delete_folower = FollowersCount.objects.get(follower=follower, user=user)
            delete_folower.delete()

            return redirect('/profile/'+user)
        
        else:
            new_follower= FollowersCount.objects.create(follower=follower, user=user)
            new_follower.save()

            return redirect('/profile/'+user)
    else:
        return redirect('/')

# @login_required(login_url='signin')
def interest(request):
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
                response_data = {'data': 'roll'}  # Consider changing 'roll' to 'email'
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

        user= auth.authenticate(username= username, password= password)
        user_profile= Profile.objects.get(user=user)
        if user is not None:
            auth.login(request, user)
            response_data = {'data': 'done', 'userId': user_profile.user_id}
            return JsonResponse(response_data, status=200)
        else:
            # messages.info(request, 'Credentials invalid')
            response_data = {'data': 'Notdone'}
            return JsonResponse(response_data, status=409)
    else:
        return render(request,'signin.html')

# @login_required(login_url='signin')
def logout(request):
    auth.logout(request)
    return redirect('signin')


def chat(request):
    return HttpResponse("Hello")

def room(request, room_name):
    if request.method== 'POST':
            response_data = {'roomName': room_name}
            return JsonResponse(response_data, status=409)
    
