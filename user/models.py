from django.db import models
from django.contrib.auth import get_user_model
import uuid
from datetime import datetime

User= get_user_model()


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_user = models.IntegerField()
    department= models.CharField(max_length=50,blank=True)
    degree= models.CharField(max_length=20,blank=True)
    year= models.CharField(max_length=20,blank=True)
    bio = models.TextField(blank=True)
    profileimg= models.TextField(blank=True)
    
    def __str__(self):
        return self.user.username

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default= uuid.uuid4)
    user= models.CharField(max_length=100)
    image= models.TextField()
    caption= models.TextField()
    created_at= models.DateTimeField(default= datetime.now)
    no_of_likes= models.IntegerField(default=0)
    no_of_comments= models.IntegerField(default=0)

    def __str__(self):
        return self.user 

class LikePost(models.Model):
    post_id= models.CharField(max_length=500)
    username = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class comments(models.Model):
    post_id= models.CharField(max_length=500)
    username = models.CharField(max_length=100)
    text= models.TextField()

    def __str__(self):
        return self.username

class FollowersCount(models.Model):
    follower= models.CharField(max_length=100)
    user= models.CharField(max_length=100)

    def __str__(self):
        return self.user

class ShowInterest(models.Model):
    interesties = models.CharField(max_length=100)
    user= models.CharField(max_length=100)

    def __str__(self):
        return self.user

class Events(models.Model):
    event_name= models.CharField(max_length=100)
    event_date= models.IntegerField()
    event_color= models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return self.event_name
    

class ChatMsg(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender")
    reciever = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reciever")

    msg= models.CharField(max_length=6969)
    is_read=models.BooleanField(default=False)
    date=models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering=['date']
        verbose_name_plural= "Message"

    def __str__(self) -> str:
        return f"sender: {self.sender} - receiver: {self.reciever}"

    @property
    def sender_profile(self):
        sender_profile= Profile.objects.get(user=self.sender)
        return sender_profile
    
    @property
    def reciever_profile(self):
        reciever_profile= Profile.objects.get(user=self.reciever)
        return reciever_profile