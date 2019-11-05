from rest_framework import permissions, generics, viewsets, response
from rest_framework.response import Response
from rest_framework.decorators import action

from django.contrib.auth import logout
from knox.models import AuthToken
from .serializer import CreateUserSerializer, UserSerializer, LoginUserSerializer, ProfileSerializer, CollaborativeSerializer,UserMovieEmotionSerializer,CollaborativeByEmotion

from .models import Profile
from .collaborative_filtering import user_based_filtering,item_based_filtering
from .user_movie_score import get_user_movie_emotion

class CollaborativeEmotion(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CollaborativeByEmotion

    def get_queryset(self):
        movieCd = self.request.query_params.get('movieCd')
        recomended_movie = item_based_filtering(self.request, movieCd)
        result = CollaborativeByEmotion(recomended_movie, many=True).data
        return result



class UserMovieEmotion(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserMovieEmotionSerializer

    def get_queryset(self):
        emotion = get_user_movie_emotion(self.request)
        result = UserMovieEmotionSerializer(emotion, many=True).data
        return result


class CollaborativeLike(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CollaborativeSerializer

    def get_queryset(self):
        li = user_based_filtering(self.request, 'like')
        result = CollaborativeSerializer(li, many=True).data
        return result

class CollaborativeHate(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CollaborativeSerializer

    def get_queryset(self):
        li = user_based_filtering(self.request, 'hate')
        result = CollaborativeSerializer(li, many=True).data
        return result

class CollaborativeWatched(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = CollaborativeSerializer

    def get_queryset(self):
        li = user_based_filtering(self.request, 'watchedMovie')
        result = CollaborativeSerializer(li, many=True).data
        return result


class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
