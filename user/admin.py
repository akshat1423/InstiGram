from django.contrib import admin
from .models import Profile, Post, LikePost, FollowersCount, ShowInterest, comments, Events, ChatMsg

# Register your models here.
admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(LikePost)
admin.site.register(FollowersCount)
admin.site.register(ShowInterest)
admin.site.register(comments)
admin.site.register(Events)


class ChatMsgAdmin(admin.ModelAdmin):
    list_editable=['is_read']
    list_display=['sender','reciever','msg','is_read','date']

admin.site.register(ChatMsg,ChatMsgAdmin)