function GETID(elementID) {
    return document.getElementById(elementID);
}

function checkuser() {
    var result = false;
    var username = GETID("username").value;
    var reg = /^\w{4,15}$/;
    var usertip = GETID("usertip");
    usertip.innerHTML = "";
    if (reg.test(username) == false) {
        usertip.innerHTML = ("<font color=red>用户名格式不正确，应为4至15位</font>");
        return false;
    } else {
        $.ajax({
            type: 'POST',
            data: {
                'username': username,
            },
            async: false,
            dataType: 'json',
            success: function(result) {
                result_1 = JSON.stringify(result); //JSON数据转化为JSON对象
                result_2 = eval("(" + result_1 + ")"); //JSON转成数组
                if (result_2.usertest == false) {
                    usertip.innerHTML = ("<font color=red>用户名已被注册，请重试</font>");
                    result = false;
                }
            },
            error: function(data) {
                usertip.innerHTML = "";
                result = true;
            }
        })
        console.log(result)
        return result;
    }
}

function checkpwd() {
    var pwd = GETID("password").value;
    var pwdtip = GETID("pswdtip");
    pwdtip.innerHTML = "";
    var reg = /[a-zA-Z0-9]{6,16}$/

    if (reg.test(pwd) == false) {
        pwdtip.innerHTML = "<font color=red>密码格式不正确，应为6至16位</font>";
        return false;
    }
    pwdtip.innerHTML = "";
    return true;
}

function update() {
    if (checkuser() == true && checkpwd() == true) {
        var username = GETID("username").value;
        var password = GETID("password").value;
        $.ajax({
            type: 'POST',
            data: {
                'username': username,
                'password': password,
            },
            dataType: 'json',
            success: function(result) {
                result_1 = JSON.stringify(result); //JSON数据转化为JSON对象
                result_2 = eval("(" + result_1 + ")"); //JSON转成数组
                if (result_2.result == true) {
                    alert("注册成功!");
                    window.location.href = "success/"
                } else {
                    // alert("用户名已被注册，请重试");
                }
            },
            error: function(data) {
                alert("回调失败，请联系服务器管理者解决此问题");
            }
        })
    } else {
        checkuser();
        checkpwd();
    }
}

function reset() {
    GETID("username").value = '';
    GETID("password").value = '';
}