from django.db import models
from django.contrib.auth import get_user_model
import uuid
from datetime import datetime

User= get_user_model()


# DEGREE = (
#     ("1", "B.Tech"),
#     ("2", "B.Tech Dual"),
#     ("3", "BS"),
#     ("4", "BSc"),
#     ("5", "BDes"),
#     ("6", "M.Tech"),
#     ("7", "MS"),
#     ("8", "Msc"),
#     ("9", "MDes"),
#     ("10", "PhD"),
#     ("11", "MBA"),
# )


# Create your models here.
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_user = models.IntegerField()
    department= models.CharField(max_length=50,blank=True)
    degree= models.CharField(max_length=20,blank=True)
    year= models.CharField(max_length=20,blank=True)
    # gradyear= models.IntegerField(blank=True)
    # fullname= models.CharField(max_length=30,blank=True)
    bio = models.TextField(blank=True)
    # profileimg = models.ImageField(upload_to='profile_images', default='blank-profile-picture.png')
    DEFAULT_IMAGE_DATA = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NDggNTEyIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIDYuNS4xIGJ5IEBmb250YXdlc29tZSAtIGh0dHBzOi8vZm9udGF3ZXNvbWUuY29tIExpY2Vuc2UgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbS9saWNlbnNlL2ZyZWUgQ29weXJpZ2h0IDIwMjQgRm9udGljb25zLCBJbmMuLS0+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTMwNCAxMjhhODAgODAgMCAxIDAgLTE2MCAwIDgwIDgwIDAgMSAwIDE2MCAwek05NiAxMjhhMTI4IDEyOCAwIDEgMSAyNTYgMEExMjggMTI4IDAgMSAxIDk2IDEyOHpNNDkuMyA0NjRIMzk4LjdjLTguOS02My4zLTYzLjMtMTEyLTEyOS0xMTJIMTc4LjNjLTY1LjcgMC0xMjAuMSA0OC43LTEyOSAxMTJ6TTAgNDgyLjNDMCAzODMuOCA3OS44IDMwNCAxNzguMyAzMDRoOTEuNEMzNjguMiAzMDQgNDQ4IDM4My44IDQ0OCA0ODIuM2MwIDE2LjQtMTMuMyAyOS43LTI5LjcgMjkuN0gyOS43QzEzLjMgNTEyIDAgNDk4LjcgMCA0ODIuM3oiLz48L3N2Zz4="
    profileimg= models.TextField(default=DEFAULT_IMAGE_DATA)
    # location = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.user.username

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default= uuid.uuid4)
    user= models.CharField(max_length=100)
    image= models.ImageField(upload_to='post_images')
    caption= models.TextField()
    created_at= models.DateTimeField(default= datetime.now)
    no_of_likes= models.IntegerField(default=0)

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