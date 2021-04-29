from django.urls import path
from website.views import index
from website.views import show_index
from website.views import login_index
from website.views import reg_index
from website.views import test_index
from website.views import logout_index
from website.views import user_index
from website.views import admin_index
from website.views import admin_user_index
from website.views import admin_goods_index



urlpatterns = [
    path('',index,name='index'),
    path('show_index/',show_index,name='show_index'),
    path('login_index/',login_index,name='login_index'),
    path('reg_index/success/',login_index),
    path('reg_index/',reg_index,name='reg_index'),
    path('test_index',test_index,name='test_index'),
    path('logout_index',logout_index,name='logout_index'),
    path('user_index',user_index,name='user_index'),
    path('admin_index',admin_index,name='admin_index'),
    path('admin_user_index',admin_user_index,name='admin_user_index'),
    path('admin_goods_index',admin_goods_index,name='admin_goods_index'),
] 
