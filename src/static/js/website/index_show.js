function GETID(elementID) {
    return document.getElementById(elementID);
}

// function upload() {
//     var goodsname = GETID("goodsname").value;
//     var goodsinfo = GETID("goodsinfo").value;
//     var goodsprice = GETID("goodsprice").value;
//     var goodspic = GETID("goodspic").value;

//     $.ajax({
//         type: 'POST',
//         data: {
//             'goodsname': goodsname,
//             'goodsinfo': goodsinfo,
//             'goodsprice': goodsprice,
//             'goodspic': goodspic,
//         },
//         dataType: 'json',
//         success: function(result) {
//             result_1 = JSON.stringify(result); //JSON数据转化为JSON对象
//             result_2 = eval("(" + result_1 + ")"); //JSON转成数组
//             if (result_2.result == true) {
//                 alert("上传成功!这是您的商品编号:", result_2.goodsID);
//             } else {
//                 alert("上传失败，请检查代码");
//             }
//         },
//         error: function(data) {
//             alert("回调失败，请联系服务器管理者解决此问题");
//         }
//     })
// }