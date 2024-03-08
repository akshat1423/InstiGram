from django.contrib import admin
from .models import Profile, Post, LikePost, FollowersCount, ShowInterest, comments

# Register your models here.
admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(LikePost)
admin.site.register(FollowersCount)
admin.site.register(ShowInterest)
admin.site.register(comments)