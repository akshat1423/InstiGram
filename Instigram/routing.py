from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import user.routing
from django.urls import re_path


application = ProtocolTypeRouter({
    'websocket':AuthMiddlewareStack(
        URLRouter(
            user.routing.websocket_urlpatterns
        )
    )
})