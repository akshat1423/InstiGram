from django.urls import path
from . import views

urlpatterns = [
    path('', views.signup, name= 'sign'),
    path('signup', views.signup, name= 'signup'),
    path('upload', views.upload, name= 'upload'),
    path('follow', views.follow, name= 'follow'),
    path('interest', views.interest, name= 'interest'),
    path('search', views.search, name= 'search'),
    # path('profile/<str:pk>', views.profile, name= 'profile'),
    path('like-post', views.like_post, name= 'like-post'),
    path('comment', views.comment, name= 'comment'),
    path('signin', views.signin, name= 'signin'),
    path('logout', views.logout, name= 'logout'),
    path('profile/details', views.settings, name= 'settings'), 
]