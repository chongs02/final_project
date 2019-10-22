from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    watchedMovie = models.CharField(max_length=8, blank=True, null=True)

    def __str__(self):
        return self.user.username
