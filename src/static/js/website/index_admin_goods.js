$(document).ready(function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            result_1 = JSON.stringify(result); //JSON数据转化为JSON对象
            result_2 = eval("(" + result_1 + ")"); //JSON转成数组
            result_3 = result_2['goodsdata'];
            data = "";
            data += '<tr><td>商品ID </td><td>商家名</td><td>商品ID</td><td>商品名</td><td>商品介绍</td><td>商品价格</td><td>商品图片</td><td>商品审核</td></tr>';
            for (let key1 in result_3) {
                id = (result_3[key1].id);
                username = (result_3[key1].username);
                goodsID = (result_3[key1].goodID);
                goodsname = result_3[key1].goodsname;
                goodsinfo = result_3[key1].goodsinfo;
                goodsprice = result_3[key1].goodsprice;
                goodspic = result_3[key1].goodspic;
                if ((result_3[key1].goodssubmit) == '0') {
                    goodssubmit = '审核中';
                } else if ((result_3[key1].identity) == '1') {
                    goodssubmit = '已通过';
                } else {
                    goodssubmit = '未知用户';
                }
                data += '<tr><td>' + id + '</td>' + '<td>' + username + '</td>' + '<td>' + goodsID + '</td>' + '<td>' + goodsname + '</td> + <td>' + goodsinfo + '</td>' + '<td>' + goodsprice + '</td>' + '<td>' + goodspic + '</td>' + '<td>' + goodssubmit + '</td>' + '</tr>';
            }
            $("#list").append(data)
        },
        error: function(data) {
            alert("回调失败，请联系服务器管理者解决此问题");
        }
    })
})