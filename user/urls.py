from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('route/', views.getRoutes),
    path('test/', views.testEndPoint, name='test'),

    path('', views.signup, name= 'sign'),
    path('signup', views.signup, name= 'signup'),
    path('post/create', views.upload, name= 'upload'),
    path('follow', views.follow, name= 'follow'),
    path('interest', views.interest, name= 'interest'),
    path('search', views.search, name= 'search'),
    path('profile', views.profile, name= 'profile'),
    path('liked', views.like_post, name= 'like-post'),
    path('comment', views.comment, name= 'comment'),
    path('signin', views.signin, name= 'signin'),
    path('logout', views.logout, name= 'logout'),
    path('profile/details', views.settings, name= 'settings'),
    path('pofile/edit', views.edit, name= 'edit'), 
    path('feed', views.index, name= 'feed'),

    path("messages/<user_id>/", views.MyInbox.as_view()),
    path("getmessages/<sender_id>/<reciever_id>/", views.GetMessages.as_view()),
    path("sendmessages/", views.SendMessages.as_view()),

    path("profile/<int:pk>/", views.ProfileDetail.as_view()),
    path("search/<username>/", views.SearchCUser.as_view())

]