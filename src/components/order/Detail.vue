<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="detail-panel">
            <div class="panel-head">
                订单详情
                <el-button v-if="orderDetail.orderStatus == 0 || orderDetail.orderStatus == 2" class="button" type="info" size="small" @click="cancelOrder">取消订单</el-button>
                <el-button v-if="orderDetail.orderStatus == 2" class="button" type="primary" size="small" @click="showDeliveryDialog">确认发货</el-button>
            </div>
            <div class="panel-body">
                <el-row class="row" :gutter="20">
                    <el-col :span="6">订单号：{{orderNum}}</el-col>
                    <el-col :span="6">订单状态：{{orderDetail.orderStatus | orderStatusFilter}}</el-col>
                    <el-col :span="6">下单时间：{{orderDetail.createTime}}</el-col>
                </el-row>
                <el-row class="row" :gutter="20">
                    <el-col :span="6">订单总额：{{orderDetail.orderRealPayAmount | realPrice}}元</el-col>
                </el-row>
                <el-row class="row" :gutter="20">
                    <el-col :span="6">买家ID：{{orderDetail.userId}}</el-col>
                    <el-col :span="6">买家手机：{{orderDetail.userPhone}}</el-col>
                </el-row>
                <div v-if="orderDetail.remark" class="remark-container">
                    <span class="remark-label">买家留言：</span>
                    <div class="remark">{{orderDetail.remark}}
                    </div>
                </div>
            </div>
        </div>
        <div class="products-panel">
            <div class="panel-head">商品清单</div>
            <div class="panel-body">
                <table class="emall-table">
                    <thead>
                        <tr class="head-row">
                            <th style="width:40%;">商品</th>
                            <th style="width:15%;">单价（元）</th>
                            <th style="width:15%;">数量</th>
                            <th style="width:30%;">优惠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="separation-row"><tr>
                        <tr class="content-row">
                            <td class="product">
                                <img :src="orderDetail.orderProduct.productImage">
                                <router-link :to="'/emall/productinfo/' + orderDetail.orderProduct.productId" target="_blank">{{orderDetail.orderProduct.productName}}</router-link>
                            </td>
                            <td>{{orderDetail.orderProduct.price | realPrice}}</td>
                            <td>{{orderDetail.orderProduct.quantity}}</td>
                            <td>{{orderDetail.orderProduct.discountName}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="info-panel">
            <div class="panel-head">
                <el-row>
                    <el-col class="info-title" :span="6">收货物流信息</el-col>
                    <el-col class="info-title" :span="6">订单金额信息</el-col>
                    <el-col class="info-title" :span="6">付款信息</el-col>
                    <el-col class="info-title" :span="6">订单历史</el-col>
                </el-row>
            </div>
            <div class="panel-body">
                <el-row>
                    <el-col class="info-content" :span="6">
                        <div class="row">
                            <div class="info-item-title">收货人：</div>
                            <div class="info-item-content">{{orderDetail.orderConsignee.consigneeName}}</div>
                        </div>
                        <div class="row">
                            <div class="info-item-title">地址：</div>
                            <div class="info-item-content">{{orderDetail.orderConsignee.consigneeAddress}}</div>
                        </div>
                        <div class="row">
                            <div class="info-item-title">手机号码：</div>
                            <div class="info-item-content">{{orderDetail.orderConsignee.consigneePhone}}</div>
                        </div>
                        <template v-if="orderDetail.expressCompany && orderDetail.expressTrackingNum">
                            <div class="row">
                                <div class="info-item-title">快递公司：</div>
                                <div class="info-item-content">{{orderDetail.expressCompany}}</div>
                            </div>
                            <div class="row">
                                <div class="info-item-title">快递单号：</div>
                                <div class="info-item-content">{{orderDetail.expressTrackingNum}}</div>
                            </div>
                            <el-button class="button" type="primary" size="small" @click="showLogisticsInfoDialog">物流信息</el-button>
                        </template>
                    </el-col>
                    <el-col class="info-content" :span="6">
                        <div class="row">
                            <div class="info-item-title">商品金额：</div>
                            <div class="info-item-content">￥{{orderDetail.orderAmount.produceFee | realPrice}}</div>
                        </div>
                        <div class="row">
                            <div class="info-item-title">折扣：</div>
                            <div class="info-item-content">￥-{{orderDetail.orderAmount.discountAmount | realPrice}}</div>
                        </div>
                        <div class="row">
                            <div class="info-item-title">运费：</div>
                            <div class="info-item-content">￥{{orderDetail.orderAmount.freit | realPrice}}</div>
                        </div>
                        <div class="row">
                            <div class="info-item-title">支付优惠：</div>
                            <div class="info-item-content">￥-{{orderDetail.orderAmount.payAllowance | realPrice}}</div>
                        </div>
                        <div class="row">
                            <div class="info-item-title">订单总额：</div>
                            <div class="info-item-content">￥{{orderDetail.orderAmount.realPayAmount | realPrice}}</div>
                        </div>
                    </el-col>
                    <el-col class="info-content" :span="6">
                        <template v-if="orderDetail.orderPay">
                            <div class="row">
                                <div class="info-item-title">付款方式：</div>
                                <div class="info-item-content">{{orderDetail.orderPay.payType | payTypeFilter}}</div>
                            </div>
                            <div class="row">
                                <div class="info-item-title">付款时间：</div>
                                <div class="info-item-content">{{orderDetail.orderPay.payTime}}</div>
                            </div>
                            <div class="row">
                                <div class="info-item-title">支付单号：</div>
                                <div class="info-item-content">{{orderDetail.orderPay.payTradeNum}}</div>
                            </div>
                            <div class="row">
                                <div class="info-item-title">付款金额：</div>
                                <div class="info-item-content">￥{{orderDetail.orderPay.payAmount | realPrice}}</div>
                            </div>
                        </template>
                    </el-col>
                    <el-col class="info-content" :span="6">
                        <div v-for="orderHistoryItem in orderDetail.historyList" class="row">{{orderHistoryItem.xh}}.&nbsp;{{orderHistoryItem.time}}&nbsp;&nbsp;{{orderHistoryItem.status | orderHistoryFilter}}。</div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="orderRefunds.length > 0" class="refunds-panel">
            <div class="panel-head">退款信息</div>
            <div class="panel-body">
                <table class="emall-table">
                    <thead>
                        <tr class="head-row">
                            <th style="width:5%;">序号</th>
                            <th style="width:16%;">退款单号</th>
                            <th style="width:10%;">退款金额</th>
                            <th style="width:10%;">状态</th>
                            <th style="width:10%;">退款类型</th>
                            <th style="width:20%;">退款信息</th>
                            <th style="width:13%;">退款原因</th>
                            <th style="width:16%;">操作时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(refundItem, index) in orderRefunds" class="content-row">
                            <td>{{index + 1}}</td>
                            <td>{{refundItem.refundTradeNum}}</td>
                            <td>{{refundItem.refundAmount | realPrice}}元</td>
                            <td>{{refundItem.status | refundStatusFilter}}</td>
                            <td>{{refundItem.refundType | refundTypeFilter}}</td>
                            <td>
                                <div>付款方式：{{refundItem.refundChannel | payTypeFilter}}</div>
                                <div>支付单号：{{refundItem.payTradeNum}}</div>
                            </td>
                            <td>{{refundItem.refundDesc}}</td>
                            <td>
                                <div>创建时间：{{refundItem.createTime}}</div>
                                <div v-if="refundItem.finishTime">完成时间：{{refundItem.finishTime}}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <el-dialog
            title="确认发货"
            :visible.sync="dataForDeliveryDialog.visible"
            width="600px">
            <el-row class="delivery-row">
                <el-col :span="4" class="text-label">收货地址：</el-col>
                <el-col :span="20">{{orderDetail.orderConsignee.consigneeAddress}}，{{orderDetail.orderConsignee.consigneeName}}，{{orderDetail.orderConsignee.consigneePhone}}</el-col>
            </el-row>
            <el-row class="delivery-row">
                <el-col :span="4" class="text-label">发货方式：</el-col>
                <el-col :span="20">
                    <el-radio-group v-model="dataForDeliveryDialog.type">
                        <el-radio label="logistics">物流发货</el-radio>
                        <el-radio label="no_logistics_required">无需物流</el-radio>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row v-show="dataForDeliveryDialog.type == 'logistics'" class="delivery-row">
                <el-col :span="4" class="text-label">物流公司：</el-col>
                <el-col :span="7">
                    <el-select v-model="dataForDeliveryDialog.expressCompany" filterable placeholder="请选择物流公司">
                        <el-option
                          v-for="expressCompany in expressCompanies"
                          :key="expressCompany"
                          :value="expressCompany">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" class="text-label">快递单号：</el-col>
                <el-col :span="7">
                    <el-input
                        v-model="dataForDeliveryDialog.expressNumber">
                    </el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dataForDeliveryDialog.visible = false;">取 消</el-button>
                <el-button type="primary" @click="confirmDelivery();">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="物流信息"
            :visible.sync="dataForLogisticsInfoDialog.visible"
            width="800px">
            <el-row class="express-info">
                <el-col :span="8">快递公司：{{orderDetail.expressCompany}}</el-col>
                <el-col :span="12">快递单号：{{orderDetail.expressTrackingNum}}</el-col>
            </el-row>
            <div v-if="dataForLogisticsInfoDialog.expressDetailItems.length == 0" class="logistics-info-row">暂无物流信息</div>
            <template v-else>
                <div v-for="expressItem in dataForLogisticsInfoDialog.expressDetailItems" class="logistics-info-row">{{expressItem.time}}&nbsp;&nbsp;{{expressItem.context}}</div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
import BreadCrumbs from '../base/BreadCrumbs'
import { orderValidator } from '../../utils/dataValidator.js'
import { resultCode, apiCallback } from '../../utils/common'

export default {
    name: 'OrderDetail',
    components: {
        BreadCrumbs,
    },
    data () {
        return {
            orderNum: '',
            dataForBreadCrumbs: [
                '订单系统', '订单查询', '订单:'
            ],
            dataForDeliveryDialog: {
                visible: false,
                type: 'logistics',
                expressCompany: '',
                expressNumber: '',
            },
            dataForLogisticsInfoDialog: {
                visible: false,
                expressDetailItems: [],
                fetched: false,
            },
            expressCompanies: [
            ],
            orderDetail: {
                orderProduct: {
                },
                orderConsignee: {
                },
                orderAmount: {
                },
                orderPay: null,
                historyList: {
                },
            },
            orderRefunds: [
            ],
        }
    },
    created () {
        this.routeChange();
    },
    watch: {
        '$route': 'routeChange'
    },
    methods: {
        routeChange() {
            this.orderNum = this.$route.params.orderNum;
            Vue.set(this.dataForBreadCrumbs, 2, this.dataForBreadCrumbs[2] + this.orderNum);
            this.getOrderDetail();
            this.getOrderRefunds();
            this.getExpressCompanies();
        },
        getOrderDetail() {
            var url = '/IPTVEMall/admin/order/query-order-detail?order_num=' + this.orderNum;
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.orderDetail = response.data.data;
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        getOrderRefunds() {
            var url = '/IPTVEMall/admin/order/query-order-refund-list?order_num=' + this.orderNum;
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.orderRefunds = response.data.data;
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        getExpressCompanies() {
            var url = '/IPTVEMall/admin/order/query-express-company';
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.expressCompanies = response.data.data.split(',');
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        cancelOrder() {
            var extraMsg = '';
            if (this.orderDetail.orderStatus == 2) {
                extraMsg = '用户已付款，取消订单后，款项将原路退还给用户。';
            }
            this.$confirm('确定取消此订单?' + extraMsg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var url = '/IPTVEMall/admin/order/cancel-order?order_num=' + this.orderNum;
                this.$http.post(url)
                .then((response) => {
                    if (response.data.resultCode === resultCode.SUCCESS) {
                        this.$message({
                            type: 'success',
                            message: '取消订单成功!'
                        });
                        location.reload();
                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
            }).catch(() => {       
            });
        },
        showDeliveryDialog() {
            this.dataForDeliveryDialog.visible = true;
        },
        validateParams() {
            var result = orderValidator.validateExpressCompany(this.dataForDeliveryDialog.expressCompany);
            if (!result.ok) {
                return result.errorMsg;
            }
            result = orderValidator.validateExpressNumber(this.dataForDeliveryDialog.expressNumber);
            if (!result.ok) {
                return result.errorMsg;
            }
        },
        confirmDelivery() {
            if (this.dataForDeliveryDialog.type == 'logistics') {
                var result = this.validateParams();
                if (result) {
                    this.$message.error(result);
                    return;
                }
            }
            var url = '/IPTVEMall/admin/order/stock-out?order_num=' + this.orderNum;
            if (this.dataForDeliveryDialog.type == 'logistics') {
                url += '&express_company=' + this.dataForDeliveryDialog.expressCompany + '&express_tracke_num=' + this.dataForDeliveryDialog.expressNumber;
            }
            this.$http.post(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.$message({
                        type: 'success',
                        message: '订单发货成功!'
                    });
                    this.dataForDeliveryDialog.visible = false;
                    location.reload();
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        showLogisticsInfoDialog() {
            this.dataForLogisticsInfoDialog.visible = true;
            if (this.dataForLogisticsInfoDialog.fetched) {
                return;
            }
            var url = '/IPTVEMall/admin/order/query-order-express?order_num=' + this.orderNum;
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.dataForLogisticsInfoDialog.expressDetailItems = response.data.data.expressDetailsArr;
                    this.dataForLogisticsInfoDialog.fetched = true;
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
    },
}
</script>

<style scoped>
.detail-panel, .products-panel, .info-panel, .refunds-panel {
    margin-top: 20px;
}

.panel-head {
    height: 45px;
    background-color: #D1ECF9;
    color: #1E70BB;
    font-size: 17px;
    padding: 0 20px;
    line-height: 45px;
}

.panel-head .button {
    float: right;
    margin-top: 6px;
    margin-left: 20px;
}

.panel-body {
    padding: 20px;
    background-color: white;
}

.panel-body .row {
    margin-bottom: 20px;
}

.remark-label {
    float: left;
    width: 80px;
}

.remark {
    margin-left: 80px;
    background-color: #FAFAFA;
    padding: 10px;
    border-radius: 5px;
    font-size: 12px;
}

.products-panel .panel-head {
    background-color: white;
}

.products-panel .panel-body {
    padding-top: 0;
}

.emall-table td.product {
    padding: 10px 20px;
    text-align: left;
    vertical-align: middle;
}

.product img {
    height: 70px;
    width: 70px;
    vertical-align: middle;
}

.product a {
    vertical-align: middle;
    display: inline-block;
    width: 250px;
    margin-left: 10px;
}

.info-panel .panel-head {
    background-color: white;
    padding: 0;
}

.info-panel .panel-head .info-title {
    text-align: center;
    background-color: #D1ECF9;
}

.info-panel .info-title {
    border-right: 1px solid white;
}

.info-panel .info-title:last-child {
    border-right: 0px;
}

.info-panel .panel-body {
    padding: 0;
}

.info-panel .info-content {
    border-right: 1px solid #D1ECF9;
    padding: 20px;
    min-height: 240px;
}

.info-panel .info-content:last-child {
    border-right: 0px;
}

.info-panel .panel-body .row {
    margin-bottom: 10px;
}

.info-panel .info-item-title {
    width: 70px;
    text-align: right;
    float: left;
}

.info-panel .info-item-content {
    margin-left: 70px;
} 

.refunds-panel .panel-head {
    background-color: white;
}

.refunds-panel .panel-body {
    padding-top: 0;
}

.delivery-row {
    line-height: 40px;
    font-size: 15px;
}

.delivery-row .text-label {
    text-align: right;
}

.express-info {
    line-height: 40px;
    font-size: 18px;
    margin-bottom: 20px;
}

.logistics-info-row {
    line-height: 35px;
    font-size: 15px;
}
</style>