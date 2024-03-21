from .models import ChatMsg,Profile,User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', read_only=True)


    class Meta:
        model = Profile
        fields=['id','user', 'id_user', 'department', 'degree', 'year', 'bio','profileimg']


class ChatMsgSerializer(serializers.ModelSerializer):
    reciever_profile= ProfileSerializer(read_only=True)
    sender_profile= ProfileSerializer(read_only=True)
    class Meta:
        model = ChatMsg
        fields=['id','user', 'sender','sender_profile', 'reciever','reciever_profile', 'msg', 'is_read', 'date']