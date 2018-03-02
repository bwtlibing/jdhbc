export var resultCode = {
    SUCCESS: 0,
    LOGIN_INVALIDATE: 10,
}

export var routeMap = {
    order: [
        { name: '订单汇总', link: '/order/summary' },
        { name: '订单查询', link: '/order/query' },
        { name: '订单退款', link: '/order/refunds' },
    ],
    emall: [
        { name: '商品管理', link: '/emall/products' },
        { name: '商品审核', link: '/emall/productCheck' },
        { name: '推荐管理', link: '/emall/recommendations' },
        { name: '推荐审核', link: '/emall/recommendationCheck' },
    ],
    crm: [
        { name: '商家管理', link: '/crm/sellers' },
        { name: '商家审核', link: '/crm/sellerCheck' },
        { name: '用户管理', link: '/crm/users' },
    ],
    idc:[
        {name : '数据分析', link:'/idc/data'}
    ]
};

export var apiCallback = {
    success: function (data, message) {
        //alert("||"+JSON.stringify(data));
        if(data.resultMsg == null){
            data = data.body;
        }
        message({
            message: data.resultMsg,
            type: 'error'
        });
        //alert("||"+JSON.stringify(data));
        if (data.resultCode === resultCode.LOGIN_INVALIDATE) {
            location.href = "./#/login";
        }
    },
    error: function (response) {
        if (response.status === 500) {
            alert("服务器出错了");
        } else {
            alert("出错了，错误码" + response.status + "，" + response.statusText);
        }
    }
}

export function checkLogin() {
    if (!$.cookie('adminUserId')) {
        return false;
    }
    return true;
}


export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}