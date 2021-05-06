from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import redirect
from django.http import HttpResponseRedirect
from django.core import serializers
from django.http import JsonResponse
from django.forms.models import model_to_dict
import os
import xlwt
import pandas
import json
import random
# Create your views here.

def index(request):
    return render(request,'index.html')

def test_index(request):
    return render(request,'index_test.html')

def show_index(request):
    login_user = request.session.get('username')
    if login_user :
        if request.method == 'POST':
            username = login_user
            goodsname = request.POST['goodsname']
            goodsinformation = request.POST['goodsinfo']
            goodsprice = request.POST['goodsprice']
            goodspic = request.FILES.get('goodspic')
            goodsId = []
            goodsID = ''.join(str(i) for i in random.sample(range(0,9),8))

            from database.models import goodsinfo
            goods_info = goodsinfo()
            goods_info.goodID = goodsID
            goods_info.username = username
            goods_info.goodsname = goodsname
            goods_info.goodsinfo = goodsinformation
            goods_info.goodsprice = goodsprice
            goods_info.goodspic = goodspic
            try:
                goods_info.save()
                return HttpResponse("上传成功，这是您的产品编号："+ goodsID )
            except:
                return HttpResponse("上传失败")
            # return HttpResponse("upload success")
        else:
            return render(request,'index_show.html')
    else:
        return HttpResponse("请先登录！")

def login_index(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        from database.models import user
        result = user.objects.filter(username=username,password=password)
        if result:
            request.session['username'] = username
            print(username,"已登录")
            return HttpResponse(json.dumps({
                'username':username,
                'result':True,
            }))
        else:
            return HttpResponse(json.dumps({
                'result':False,
            }))

    login_user = request.session.get('username')
    if login_user :
        from database.models import user
        # userdata = json.dumps(list(user.objects.filter(username = login_user).values()))
        # userdata = serializers.serialize("python",user.objects.filter(username = login_user))
        userdata = model_to_dict(user.objects.filter(username = login_user).first())
        if userdata['identity'] == 'admin':
            return render(request,'index_admin.html')
        elif userdata['identity'] == 'business':
            return render(request,'index_admin.html',{'username':login_user}) #商家管理界面
        else:
            return render(request,'index_user.html',{'username':login_user})

    return render(request,'index_login.html')

def reg_index(request):
    if request.method == 'POST':
        from database.models import user
        username = request.POST['username']
        userdata = user.objects.values().filter(username = username)
        if bool(userdata) == True:
            return HttpResponse(json.dumps({
                'usertest':False
            }))
        else:
            password = request.POST['password']
            userinfo = user()
            userinfo.username = username
            userinfo.password = password
            try:
                userinfo.save()
                return HttpResponse(json.dumps({
                    'result':True
                    }))
            except:
                return HttpResponse(json.dumps({
                    'result':False
                    }))
    else:
        return render(request,'index_register.html')

def logout_index(request):
    login_user = request.session.get('username')
    print(login_user,"已登出")
    request.session.flush()
    return render(request,'index_logout.html')

def user_index(request):
    return render(request,'index_user.html')

def admin_index(request):
    return render(request,'index_admin.html')

def admin_user_index(request):
    if request.method == 'POST':
        from database.models import user
        userinfo = user.objects.values()
        userdata = list(userinfo)
        return JsonResponse({"userdata":userdata})
    return render(request,'index_admin_user.html')

def admin_user_export(request):
    from database.models import user
    userinfo = user.objects.values()
    userdata = list(userinfo)
    print(userdata)
    data = pandas.DataFrame(userdata)
    order = ['id','username','password','identity']
    data = data[order]
    column_map = {
        'id':'用户ID',
        'username':'用户名',
        'password':'用户密码',
        'identity':'用户身份',
    }
    data.rename(columns = column_map,inplace = True)
    file_path = pandas.ExcelWriter('Userdata.xlsx')
    data.fillna(' ',inplace = True)
    data.to_excel(file_path,encoding = 'utf-8', index = False)
    file_path.save()
    return HttpResponse("导出测试中")

def admin_goods_index(request):
    if request.method == "POST":
        from database.models import goodsinfo
        goodsdata = list(goodsinfo.objects.values())
        print(goodsdata)
        return JsonResponse({"goodsdata":goodsdata})
    return render(request,'index_admin_goods.html')
