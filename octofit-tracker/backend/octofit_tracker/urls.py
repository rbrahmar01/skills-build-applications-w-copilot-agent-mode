"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .views import UserViewSet, TeamViewSet, ActivityViewSet, WorkoutViewSet, LeaderboardViewSet
import os

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)
router.register(r'leaderboards', LeaderboardViewSet)

@api_view(['GET'])
def dynamic_api_root(request, format=None):
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        base = f"https://{codespace_name}-8000.app.github.dev"
    else:
        # fallback to request-derived base without trailing slash
        base = request.build_absolute_uri('/')[:-1]
    return Response({
        'users': f"{base}/api/users/",
        'teams': f"{base}/api/teams/",
        'activities': f"{base}/api/activities/",
        'workouts': f"{base}/api/workouts/",
        'leaderboards': f"{base}/api/leaderboards/",
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', dynamic_api_root, name='api-root'),
    path('api/', include(router.urls)),
]
