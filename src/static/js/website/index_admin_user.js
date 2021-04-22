$(document).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            result_1 = JSON.stringify(result); //JSON数据转化为JSON对象
            result_2 = eval("(" + result_1 + ")"); //JSON转成数组
            result_3 = result_2['userdata'];
            data = "";
            data += '<tr><td>用户ID </td><td>用户名</td><td>密码</td><td>身份</td></tr>';
            for (let key1 in result_3) {
                id = (result_3[key1].id);
                username = (result_3[key1].username);
                password = (result_3[key1].password);
                if ((result_3[key1].identity) == 'admin') {
                    identity = '管理员';
                } else if ((result_3[key1].identity) == 'user') {
                    identity = '用户';
                } else {
                    identity = '未知用户';
                }
                data += '<tr><td>' + id + '</td>' + '<td>' + username + '</td>' + '<td>' + password + '</td>' + '<td>' + identity + '</td></tr>';
            }
            $("#list").append(data)
        },
        error: function(data) {
            alert("回调失败，请联系服务器管理者解决此问题");
        }
    })
})