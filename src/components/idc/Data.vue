<template>
      <div>
            <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
            <div  id="myChart" style="width: 1000px;height:600px; " ></div>
      </div>

</template>

<script>
//    // 引入基本模板
//    let echarts = require('echarts/lib/echarts');
//    // 引入柱状图组件
//    require('echarts/lib/chart/bar');
//    // 引入提示框和title组件
//    require('echarts/lib/component/tooltip');
//    require('echarts/lib/component/title');

    import echarts from 'echarts'
    import 'echarts/src/chart/bar';

    import BreadCrumbs from '../base/BreadCrumbs'
    import { resultCode, apiCallback } from '../../utils/common'

    export default {
        name: 'IDC',
        components: {
            BreadCrumbs,
        },
        data () {
            return {
                dataForBreadCrumbs: [
                    '数据中心','数据分析'
                ],
                weekData: {
                    dataList: [],/*一周的日期*/
                    submitTotalList: [],/*一周内每天提交的订单量*/
                    payTotalList: [],/*一周内每天支付的订单量*/
                }
            }
        },
        created () {
            this.queryOrderAnalysis();
        },
        mounted () {
            let self=this;
            setTimeout(function () {
                self.drawLine ();
            },100)

        },
        watch: {},
        methods: {
            //线性图
            queryOrderAnalysis() {
                const url = 'IPTVEMall/admin/order/order-analysis';
                this.$http.get(url)
                    .then((response) => {
                        if (response.data.resultCode === resultCode.SUCCESS) {
                            this.weekData.dataList=response.data.data.dataList;
                            this.weekData.submitTotalList=response.data.data.submitTotalList;
                            this.weekData.payTotalList=response.data.data.payTotalList;
                        } else {
                            apiCallback.success(response.data, this.$message);
                        }
                    },(response) => {
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
    .content-container {
        background-color: white;
        margin-top: 20px;
        padding: 20px;
    }
      #myChart{
            margin-top: 20px;
            background-color: white;

      }

</style>