from .models import ChatMsg,Profile,CUser
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class CUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CUser
        fields = ('id', 'username')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        

        token['user'] = user.profile.user
        token['id_user'] = user.id_user
        token['department'] = user.department
        token['degree'] = user.profile.degree
        token['year'] = user.profile.year
        token['bio'] = user.profile.bio
        token['profileimg'] = user.profile.profileimg

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CUser
        fields = ( 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = CUser.objects.create(
            username=validated_data['username'],
            # email=validated_data['email']

        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields=['id','user', 'id_user', 'department', 'degree', 'year', 'bio','profileimg']


class ChatMsgSerializer(serializers.ModelSerializer):
    reciever_profile= ProfileSerializer(read_only=True)
    sender_profile= ProfileSerializer(read_only=True)
    class Meta:
        model = ChatMsg
        fields=['id','user', 'sender','sender_profile', 'reciever','reciever_profile', 'msg', 'is_read', 'date']