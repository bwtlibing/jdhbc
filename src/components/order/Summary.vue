<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <el-row class="summary-panel">
            <el-col :span="6">
                <div class="item-title">7天下单笔数</div>
                <div class="item-content">{{weekData.totalOrderNumOneWeek}}</div>
            </el-col>
            <el-col :span="6">
                <div class="item-title">待付款</div>
                <div class="item-content">{{weekData.notPayTotalInOneWeek}}</div>
            </el-col>
            <el-col :span="6">
                <div class="item-title">待发货</div>
                <div class="item-content">{{weekData.notDeliveredTotalInOneWeek}}</div>
            </el-col>
            <el-col :span="6">
                <div class="item-title">7天收入</div>
                <div class="item-content">￥{{weekData.totalOrderAmountInOneWeek}}</div>
            </el-col>
        </el-row>
        <el-row class="yesterday-panel">
            <el-col :span="6" class="yesterday-items">
                <div class="item-title">昨日下单笔数</div>
                <div class="item-content">{{weekData.totalSubmitYesterday}}</div>
                <div class="separate-row"></div>
                <div class="item-title">昨日付款订单</div>
                <div class="item-content">{{weekData.totalPayYesterday}}</div>
            </el-col>
            <el-col :span="18" >
                <div id="myChart" style=" width: 800px; height:340px; margin-top: 15px ; margin-left: 15px ">

                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>

import echarts from 'echarts'
import 'echarts/src/chart/bar';
import BreadCrumbs from '../base/BreadCrumbs'
import { resultCode, apiCallback } from '../../utils/common'
export default {
    name: 'OrderSummary',
    components: {
        BreadCrumbs,
    },
    data () {
        return {
            dataForBreadCrumbs: [
                '订单系统', '订单汇总'
            ],
            weekData: {}
        }
    },
    created () {
        this.queryOrderDetail();
    },
    mounted () {
        let self=this;
        setTimeout(function () {
            self.drawLine ();
        },300)

    },
    methods : {
        queryOrderDetail () {
            const url = 'IPTVEMall/admin/order/order-analysis';
            this.$http.get(url)
                .then((response)=>{
                    if (response.data.resultCode === resultCode.SUCCESS) {

                        this.weekData=response.data.data;

                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response)=>{
                    apiCallback.error(response);
                })

        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'));
            // 绘制图表
            let dataList=this.weekData.dataList;
            let submitTotalList=this.weekData.submitTotalList;
            let payTotalList=this.weekData.payTotalList;
            let option = {
                title: {
                    text: '一周内订单量',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['每天提交的订单量','每天支付的订单量']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: dataList
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'每天提交的订单量',
                        type:'line',
                        data:submitTotalList,

                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'每天支付的订单量',
                        type:'line',
                        data:payTotalList,
                        markPoint: {
                            data: [
                                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
}
</script>

<style scoped>
.summary-panel {
    margin-top: 20px;
    background-color: white;
    padding: 50px 0;
    text-align: center;
}

.item-title {
    font-size: 20px;
    line-height: 40px;
}

.item-content {
    font-size: 30px;
    font-weight: bold;
    line-height: 50px;
    color: #448ACA;
}

.yesterday-panel {
    margin: 20px 0;
}

.yesterday-items {
    background-color: white;
    padding: 50px 0;
    text-align: center;
}

.separate-row {
    height: 50px;
}

</style>