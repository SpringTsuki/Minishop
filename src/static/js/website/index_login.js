function GETID(elementID) {
    return document.getElementById(elementID);
}

function update() {
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
                alert("登陆成功!");
                location.reload();
            } else {
                alert("登陆失败，请检查用户名与密码");
            }
        },
        error: function(data) {
            alert("回调失败，请联系服务器管理者解决此问题");
        }
    })
}