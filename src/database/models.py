from django.db import models

# Create your models here.
class test(models.Model):
    user = models.CharField(max_length=64,default='test')
    password = models.CharField(max_length=64,default='123456')

class user(models.Model):
    username = models.CharField(max_length=30,unique=True)
    password = models.CharField(max_length=30)
    identity = models.CharField(max_length=30,default='user')