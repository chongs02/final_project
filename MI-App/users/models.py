from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='user', null=True)

    id = models.AutoField(primary_key=True)
    watchedMovie = models.CharField(max_length=8, blank=True, null=True)
    like = models.CharField(max_length=8, blank=True, null=True)
    hate = models.CharField(max_length=8, blank=True, null=True)

    def __str__(self):
        # print(self.user.username)
        return str(self.user)
