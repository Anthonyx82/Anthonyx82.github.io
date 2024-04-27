from rest_framework import routers
from .views import PostViewSet

app_name = 'api'

routers = routers.DefaultRouter()

routers.register('post', PostViewSet, 'post_api')

urlpatterns = routers.urls
