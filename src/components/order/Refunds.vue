<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="refunds-panel">
            <div class="panel-body">
                <table class="emall-table">
                    <thead>
                        <tr class="head-row">
                            <th style="width:12%;">ID</th>
                            <th style="width:12%;">订单单号</th>
                            <th style="width:8%;">退款金额</th>
                            <th style="width:8%;">状态</th>
                            <th style="width:8%;">退款类型</th>
                            <th style="width:20%;">退款信息</th>
                            <th style="width:16%;">退款原因</th>
                            <th style="width:16%;">操作时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="refundItem in refundList" class="content-row">
                            <td>{{refundItem.refundTradeNum}}</td>
                            <td><router-link :to="'/order/detail/' + refundItem.orderNum" class="btn-link" target="_blank">{{refundItem.orderNum}}</router-link></td>
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
                <a class="btn-link more" v-show="hasMoreRefunds" @click="queryRefund(true)">更多</a>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumbs from '../base/BreadCrumbs'
import { resultCode, apiCallback } from '../../utils/common'

export default {
    name: 'OrderRefunds',
    components: {
        BreadCrumbs,
    },
    data () {
        return {
            dataForBreadCrumbs: [
                '订单系统', '订单退款'
            ],
            queryParams: {
                pageNum: 1,
                pageSize: 20,
            },
            hasMoreRefunds: true,
            refundList: [],
        }
    },
    created () {
        this.queryRefund(false);
    },
    watch: {
        '$route': 'queryRefund(false)'
    },
    methods: {
        queryRefund(more) {
            if (more) {
                this.queryParams.pageNum++;
            } else {
                this.queryParams.pageNum = 1;
                this.hasMoreRefunds = true;
            }
            var url = '/IPTVEMall/admin/order/query-refund-list?page_num=' + this.queryParams.pageNum + '&page_size=' + this.queryParams.pageSize;
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {

                    if (response.data.data.totalPage <= this.queryParams.pageNum) {

                        this.hasMoreRefunds = false;
                    }
                    if (more) {
                        this.refundList = this.refundList.concat(response.data.data.pageData);
                    } else {
                        this.refundList = response.data.data.pageData;
                    }
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
    }
}
</script>

<style scoped>
.refunds-panel {
    margin-top: 20px;
}

.panel-body {
    padding: 20px;
    background-color: white;
}

.more {
    display: inline-block;
    margin: 10px 0;
}
</style>