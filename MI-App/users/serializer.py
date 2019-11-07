from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Profile

 


class CollaborativeByEmotion(serializers.Serializer):
    impression = serializers.IntegerField(max_value=None, min_value=None)        # 감동
    fear = serializers.IntegerField(max_value=None, min_value=None)             # 공포
    anger = serializers.IntegerField(max_value=None, min_value=None)             # 분노
    sadness = serializers.IntegerField(max_value=None, min_value=None)           # 슬픔
    fun = serializers.IntegerField(max_value=None, min_value=None)               # 유쾌
    boredom = serializers.IntegerField(max_value=None, min_value=None)           # 지루함
    movieNm = serializers.CharField(max_length=256)
    repGenre = serializers.CharField(max_length=256)
    repNation = serializers.CharField(max_length=128)
    openDt = serializers.CharField(max_length=8)
    poster = serializers.CharField(max_length=None, min_length=None)
    movieCd = serializers.CharField(max_length=16)
    index = serializers.IntegerField(max_value=None, min_value=None)   


class UserMovieEmotionSerializer(serializers.Serializer):
    impression = serializers.IntegerField(max_value=None, min_value=None)        # 감동
    fear = serializers.IntegerField(max_value=None, min_value=None)             # 공포
    anger = serializers.IntegerField(max_value=None, min_value=None)             # 분노
    sadness = serializers.IntegerField(max_value=None, min_value=None)           # 슬픔
    fun = serializers.IntegerField(max_value=None, min_value=None)               # 유쾌
    boredom = serializers.IntegerField(max_value=None, min_value=None)           # 지루함
    positive = serializers.IntegerField(max_value=None, min_value=None)          # 긍정
    negative = serializers.IntegerField(max_value=None, min_value=None)          # 부정



class CollaborativeSerializer(serializers.Serializer):
    score = serializers.FloatField()
    movie_code = serializers.CharField(max_length=16)



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    def create(self, validated_data):
        # print(validated_data[0])
        if 'watchedMovie' in validated_data:
            return Profile.objects.create(
                user=self.context['request'].user, watchedMovie=validated_data['watchedMovie'])
        elif 'like' in validated_data:
            return Profile.objects.create(
                user=self.context['request'].user, like=validated_data['like'])
        else:
            return Profile.objects.create(
                user=self.context['request'].user, hate=validated_data['hate'])
    
   


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')



class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials.")
