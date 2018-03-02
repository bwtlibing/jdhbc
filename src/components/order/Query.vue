<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="content-container">
            <el-row :gutter="20">
                <el-col :span="3" class="text-label">订单号：</el-col>
                <el-col :span="6">
                    <el-input
                        v-model="queryParams.orderNum">
                    </el-input>
                </el-col>
                <el-col :span="3" class="text-label">收货人手机：</el-col>
                <el-col :span="6">
                    <el-input
                        v-model="queryParams.phone">
                    </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:20px;">
                <el-col :span="3" class="text-label">下单时间：</el-col>
                <el-col :span="9">
                    <el-date-picker
                        v-model="queryParams.date"
                        type="daterange"
                        align="right"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" @click="queryOrder(false)">筛选</el-button>
                </el-col>
            </el-row>
            <div style="margin-top:20px;">
                <el-tabs v-model="queryParams.status" type="card" @tab-click="tabClick">
                    <el-tab-pane label="待发货" name="2"></el-tab-pane>
                    <el-tab-pane label="待付款" name="0"></el-tab-pane>
                    <el-tab-pane label="待收货" name="3"></el-tab-pane>
                    <el-tab-pane label="已完成" name="4"></el-tab-pane>
                    <el-tab-pane label="全部订单" name="0,1,2,3,4"></el-tab-pane>
                </el-tabs>
            </div>
            <table class="emall-table">
                <thead>
                    <tr class="head-row">
                        <th style="width:18%;">订单号</th>
                        <th style="width:12%;">下单时间</th>
                        <th style="width:35%;">商品内容</th>
                        <th style="width:15%;">订单金额</th>
                        <th style="width:20%;">订单状态</th>
                    </tr>
                </thead>
                <tbody v-for="orderItem in orderList">
                    <tr class="separation-row"><tr>
                    <tr class="content-row">
                        <td><router-link :to="'/order/detail/' + orderItem.orderNum" class="btn-link" target="_blank">{{orderItem.orderNum}}</router-link></td>
                        <td>{{orderItem.createTime.split(' ')[0]}}<br>{{orderItem.createTime.split(' ')[1]}}</td>
                        <td>{{orderItem.orderProductName}}*{{orderItem.quantity}}</td>
                        <td>{{orderItem.realPayAmount | realPrice}}元</td>
                        <td>
                            <span class="order-status" v-bind:class="{ red: orderItem.orderStatus == 2, green: orderItem.orderStatus == 4 }">{{orderItem.orderStatus | orderStatusFilter}}</span>
                            <router-link :to="'/order/detail/' + orderItem.orderNum" class="btn-link" target="_blank">查看详情</router-link>
                        </td>
                    </tr>
                    <tr class="content-row delivered-row">
                        <td colspan="5"><span v-if="orderItem.expressCompany && orderItem.expressTrackingNum" class="express">快递公司：{{orderItem.expressCompany}}&nbsp;&nbsp;物流编号：{{orderItem.expressTrackingNum}}</span><span>收货信息：{{orderItem.consigneeName}}&nbsp;&nbsp;{{orderItem.consigneePhone}}&nbsp;&nbsp;{{orderItem.consigneeAddress}}</span></td>
                    </tr>
                </tbody>
            </table>
            <a class="btn-link more" v-show="hasMoreOrder" @click="queryOrder(true)">更多订单</a>
            </div>
        </div>
</template>

<script>
import BreadCrumbs from '../base/BreadCrumbs'
import { orderValidator } from '../../utils/dataValidator.js'
import { resultCode, apiCallback } from '../../utils/common'

export default {
    name: 'OrderQuery',
    components: {
        BreadCrumbs,
    },
    data () {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                    }
                }]
            },
            dataForBreadCrumbs: [
                '订单系统', '订单查询'
            ],
            queryParams: {
                orderNum: '',
                phone: '',
                date: '',
                status: '2',
                pageNum: 1,
                pageSize: 20,
            },
            hasMoreOrder: true,
            orderList: []
        }
    },
    created () {
        this.queryOrder(false);
    },
    watch: {
        '$route': 'queryOrder(false)'
    },
    methods: {
        validateQueryParams() {
            var result = orderValidator.validateOrderNum(this.queryParams.orderNum, true);
            if (!result.ok) {
                return result.errorMsg;
            }
            result = orderValidator.validatePhone(this.queryParams.phone, true);
            if (!result.ok) {
                return result.errorMsg;
            }
            result = orderValidator.validateOrderDate(this.queryParams.date, true);
            if (!result.ok) {
                return result.errorMsg;
            }
            return;
        },
        queryOrder(more) {
            var result = this.validateQueryParams();
            if (result) {
                this.$message.error(result);
                return;
            }
            if (more) {
                this.queryParams.pageNum++;
            } else {
                this.queryParams.pageNum = 1;
                this.hasMoreOrder = true;
            }
            var url = '/IPTVEMall/admin/order/query-order-list?page_num=' + this.queryParams.pageNum + '&page_size=' + this.queryParams.pageSize + '&order_status=' + this.queryParams.status;
            if (this.queryParams.orderNum) {
                url += '&order_num=' + this.queryParams.orderNum;
            }
            if (this.queryParams.phone) {
                url += '&phone=' + this.queryParams.phone;
            }
            if (this.queryParams.date) {
                url += '&start_time=' + this.queryParams.date[0] + '&end_time=' + this.queryParams.date[1];
            }
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    if (response.data.data.totalPage <= this.queryParams.pageNum) {
                        this.hasMoreOrder = false;
                    }
                    if (more) {
                        this.orderList = this.orderList.concat(response.data.data.pageData);
                    } else {
                        this.orderList = response.data.data.pageData;
                    }
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
        tabClick(tab, event) {
            this.queryOrder(false);
        }
    }
}
</script>

<style scoped>
.content-container {
    background-color: white;
    margin-top: 20px;
    padding: 20px;
}

.text-label {
    line-height: 40px;
    text-align: right;
}

.emall-table .delivered-row td {
    padding: 8px;
    font-size: 13px;
    text-align: left;
}

.order-status {
    line-height: 25px;
    display: block;
}

.order-status.red {
    color: red;
}

.order-status.green {
    color: green;
}

.express {
    margin-right: 30px;
}

.more {
    display: inline-block;
    margin: 10px 0;
}
</style>