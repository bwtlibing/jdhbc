//订单相关
function validateOrderNum(orderNum, allowEmpty) {
    var result = {};
    result.ok = false;
    if (!orderNum) {
        if (allowEmpty) {
            result.ok = true;
            return result;
        } else {
            result.errorMsg = "订单号不能为空";
            return result;
        }
    }
    result.ok = true;
    return result;
}

function validatePhone(phone, allowEmpty) {
    var result = {};
    result.ok = false;
    if (!phone) {
        if (allowEmpty) {
            result.ok = true;
            return result;
        } else {
            result.errorMsg = "手机不能为空";
            return result;
        }
    }
    var phone_pattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    if (!phone_pattern.test(phone)) {
        result.errorMsg = "请输入正确的手机号";
        return result;
    }
    result.ok = true;
    return result;
}

function validateOrderDate(date, allowEmpty) {
    var result = {};
    result.ok = false;
    if (!date) {
        if (allowEmpty) {
            result.ok = true;
            return result;
        } else {
            result.errorMsg = "下单日期不能为空";
            return result;
        }
    }
    if (Object.prototype.toString.call(date) != '[object Array]' || date.length != 2) {
        result.errorMsg = "下单日期格式有误";
        return result;
    }
    var date_pattern = /^20[0-9]{2}-[0-9]{2}-[0-9]{2}\s[0-9]{2}:[0-9]{2}:[0-9]{2}$/;
    if (!date_pattern.test(date[0]) || !date_pattern.test(date[1])) {
        result.errorMsg = "下单日期格式有误";
        return result;
    }
    result.ok = true;
    return result;
}

function validateExpressCompany(expressCompany) {
    var result = {};
    result.ok = false;
    if (!expressCompany) {
        result.errorMsg = "物流公司不能为空";
        return result;
    }
    result.ok = true;
    return result;
}

function validateExpressNumber(expressNumber) {
    var result = {};
    result.ok = false;
    if (!expressNumber) {
        result.errorMsg = "快递单号不能为空";
        return result;
    }
    if (expressNumber.length > 20) {
        result.errorMsg = "请输入正确的快递单号";
        return result;
    }
    result.ok = true;
    return result;
}

function validateVideoCode(videoCodeHd, videoCode) {
    var result = {};
    result.ok = false;
    if (!videoCodeHd || !videoCode) {
        result.errorMsg = "视频码不能为空";
        return result;
    }
    if (videoCodeHd.length > 100 || videoCode.length > 100) {
        result.errorMsg = "请输入正确的视频码";
        return result;
    }
    result.ok = true;
    return result;
}

function validateContent(contentType, content) {
    var result = {};
    result.ok = false;
    if (contentType !== 0 && contentType !== 1 && contentType !== 2) {
        result.errorMsg = "请选择推荐内容类型";
        return result;
    }
    if (contentType === 0 || contentType === 1) {
        var number_pattern = /^[1-9]\d*$/;
        if (!number_pattern.test(content)) {
            result.errorMsg = "推荐内容处请输入正确的ID";
            return result;
        }
    }
    if (contentType === 2) {
        if (!(content.indexOf('http://') == 0 || content.indexOf('https://') == 0)) {
            result.errorMsg = "推荐内容处请输入正确的URL链接";
            return result;
        }
    }
    result.ok = true;
    return result;
}

function validatePosition(position) {
    var result = {};
    result.ok = false;
    position = position.toString();
    if (position !== '') {
        var position_pattern = /^[1-9]$/;
        if (!position_pattern.test(position) && position !== '10') {
            result.errorMsg = "请输入正确的排序值";
            return result;
        }
    }
    result.ok = true;
    return result;
}

function validateDescription(description) {
    var result = {};
    result.ok = false;
    if (!description) {
        result.errorMsg = "推荐描述不能为空";
        return result;
    }
    if (description.length > 30) {
        result.errorMsg = "请输入正确的推荐描述";
        return result;
    }
    result.ok = true;
    return result;
}

export var orderValidator = {
    validateOrderNum,
    validatePhone,
    validateOrderDate,
    validateExpressCompany,
    validateExpressNumber,
}

export var recommendationValidator = {
    validateVideoCode,
    validateContent,
    validatePosition,
    validateDescription,
}