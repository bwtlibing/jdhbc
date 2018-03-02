//把接口的price字段变成实际显示的钱数：2230 -》 22.30
export function realPrice(p) {
    if (!p) {
        return p;
    }
    return ((p / 100).toFixed(2) + '');
}

//把输入的价格转换成接口字段：22.30 -》2230
export function dataPrice(s) {
    var value = parseFloat(s);
    if (!value) {
        return 0;
    }
    return Math.round(value * 100);
}

//对input输入框进行双向过滤
export var priceFilter = {
    //双向过滤器
    read(val) {
        return realPrice(val);
    },
    write(val, oldVal) {
        var number = val.replace(/[^\d.-]/g, '');
        return dataPrice(number);
    }
};

//订单状态
export function orderStatusFilter(orderStatus) {
    var result = '';
    switch (orderStatus) {
        case 0:
            result = "等待用户付款";
            break;
        case 1:
            result = "订单已取消";
            break;
        case 2:
            result = "等待商家发货";
            break;
        case 3:
            result = "等待用户收货";
            break;
        case 4:
            result = "订单已完成";
            break;
    }
    return result;
};

// 支付方式
export function payTypeFilter(payType) {
    var result = '';
    switch (payType) {
        case 0:
            result = "微信支付";
            break;
        case 1:
            result = "支付宝";
            break;
        case 2:
            result = "翼支付";
            break;
    }
    return result;
}

// 订单历史
export function orderHistoryFilter(orderStatus) {
    var result = '';
    switch (orderStatus) {
        case 0:
            result = "订单已提交";
            break;
        case 1:
            result = "订单已取消";
            break;
        case 2:
            result = "付款成功";
            break;
        case 3:
            result = "商家已发货";
            break;
        case 4:
            result = "订单已完成";
            break;
    }
    return result;
}

// 退款状态
export function refundStatusFilter(refundStatus) {
    var result = '';
    switch (refundStatus) {
        case 0:
            result = "待退款";
            break;
        case 1:
            result = "退款成功";
            break;
        case 2:
            result = "退款失败";
            break;
    }
    return result;
}

// 退款类型
export function refundTypeFilter(refundType) {
    var result = '';
    switch (refundType) {
        case 1:
            result = "取消订单";
            break;
        case 2:
            result = "异常状况";
            break;
    }
    return result;
}

// 推荐内容类型
export function recommendationContentTypeFilter(contentType) {
    var result = '';
    switch (contentType) {
        case 0:
            result = "商品";
            break;
        case 1:
            result = "商家";
            break;
        case 2:
            result = "活动";
            break;
    }
    return result;
}

// 推荐位类型
export function areaTypeFilter(areaType) {
    var result = '';
    switch (areaType) {
        case 0:
            result = "视频推荐位";
            break;
        case 1:
            result = "图片推荐位";
            break;
        case 2:
            result = "轮播图推荐位";
            break;
    }
    return result;
}

/*时间戳转化为时间格式*/
export function dateFormat(time, type = 'toMinute') {
    if (!time) {
        return '';
    }
    const set_time = new Date(time);
    let y = set_time.getFullYear();
    let m = String(set_time.getMonth()+1);
    let d = String(set_time.getDate());
    var h = String(set_time.getHours());
    var i = String(set_time.getMinutes());
    var s = String(set_time.getSeconds());
    if (m.length === 1) {
        m = "0" + m;
    }
    if (d.length === 1) {
        d = "0" + d;
    }
    if (h.length === 1) {
        h = "0" + h;
    }
    if (i.length === 1) {
        i = "0" + i;
    }
    if (s.length === 1) {
        s = "0" + s;
    }
    if (type === 'toDate') {
        return `${y}-${m}-${d}`;
    } else if (type === 'toHour') {
        return `${y}-${m}-${d} ${h}`;
    } else if (type === 'toMinute') {
        return `${y}-${m}-${d} ${h}:${i}`;
    } else if (type === 'toSecond') {
        return `${y}-${m}-${d} ${h}:${i}:${s}`;
    }
    return '';
}

/*时间戳转化此2017-09-21 16:57:40*/

export function  timeFormat (time) {

    if(time<=0){
        return ''
    }else {
        const date=new Date(time);
        let Y=date.getFullYear()+'-';
        let M=(date.getMonth()+1<10 ? '0'+(date.getMonth()+1):date.getMonth()+1)+'-';
        let D=(date.getDate() <10? '0'+date.getDate():date.getDate())+'  ';
        let h=(date.getHours() <10? '0'+date.getHours():date.getHours())+':';
        let m=(date.getMinutes()<10? '0'+date.getMinutes():date.getMinutes())+':';
        let s=(date.getSeconds()<10? '0'+date.getSeconds():date.getSeconds());
        return Y+M+D+h+m+s;
    }
}
/*审核状态*/
export function checkStatusFilter (statusCode) {
    let result='';
    switch  ( statusCode) {
        case 0 :
            result = '待审核';
            break;
        case 1 :
            result = '审核通过';
            break;
        case 2 :
            result = '审核失败';
            break;
    }
    return result;
}


















