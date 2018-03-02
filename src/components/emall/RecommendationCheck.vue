<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>

        <div class="SellerCheck-panel">
            <div class="panel-body">
                <div >
                    <el-tabs type="card" v-model="queryParams.status" @tab-click="tabClick">
                        <el-tab-pane label="待审核"   name="0"></el-tab-pane>
                        <el-tab-pane label="审核通过" name="1"></el-tab-pane>
                        <el-tab-pane label="审核失败" name="2"></el-tab-pane>
                    </el-tabs>
                </div>
                <table class="emall-table">
                    <thead>
                    <tr class="head-row">
                        <th style="width:20%;">描述</th>
                        <th style="width:15%;">推荐位</th>
                        <th style="width:13%;">推荐类型</th>
                        <th style="width:13%;">排序值</th>
                        <th style="width:13%;">提交时间</th>
                        <th style="width:13%;">审核时间</th>
                        <th style="width:13%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr  class="content-row" v-for="(item , index) in productList">
                        <td style="text-align: left;padding-left: 20px">
                            <img class="seller-logo"  :src="item.imageUrl" alt="">
                            <div class="sellerPro">
                                <span  class="seller-name" >{{item.description}}</span>
                                <!--<router-link :to="'/order/detail/' + 151565104210"  class="seller-name" target="_blank">{{item.description}}</router-link>-->
                                <span class="isEdit">编辑</span>
                            </div>

                        </td>
                        <td>{{item.recommendationArea}}</td>
                        <td>{{item.contentType | checkType}}</td>
                        <td>{{item.position}}</td>
                        <td>{{item.createTime | timeFormat}}</td>

                        <td>{{item.firstReviewTime | timeFormat}}</td>
                        <td>
                            <span class="checkWaiting" :class="{'success':item.firstReviewStatus=='1','error':item.firstReviewStatus=='2'}" ref="myStatus" @click.self="check(item,index)">{{item.firstReviewStatus | checkStatusFilter}}</span>
                        </td>
                    </tr>


                    </tbody>
                </table>
                <el-dialog :visible.sync="visible" title='推荐审核'>

                    <div class="RecCheckDialog">
                        推荐审核是否确认通过
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="checkWay(currentProduct.id , 1 , '审核通过')">通过</el-button>
                        <el-button type="danger"  @click="checkWay(currentProduct.id , 0 , '审核失败')">不通过</el-button>
                    </div>
                </el-dialog>
                <a class="btn-link more" v-show="hasMoreRecommends" @click="queryRecProduct(true)">更多</a>
            </div>
        </div>


    </div>
</template>

<script>
    import BreadCrumbs from '../base/BreadCrumbs'
    import { resultCode, apiCallback } from '../../utils/common'

    export default {
        name: 'RecommendationCheck',
        components: {
            BreadCrumbs,
        },
        data () {
            return {
                dataForBreadCrumbs: [
                    '翼商城管理','推荐审核'
                ],
                hasMoreRecommends: true,
                visible:false,

                productList:[],
                queryParams:{
                    status:0,
                    pageNum:1,
                    limit:'20'
                },

                currentProduct:{},
                currentEle:'',
                index:''
            }
        },
        created () {
            this.queryRecProduct(false)
        },
        filters :{
            checkType(typeCode){
                let result='';
                switch  ( typeCode) {
                    case 0 :
                        result = '商品';
                        break;
                    case 1 :
                        result = '商家';
                        break;
                    case 2 :
                        result = '活动';
                        break;
                }
                return result;
            }
        },
        mounted () {

        },
        watch: {},
        methods: {
            queryRecProduct(more) {
                if (more) {
                    this.queryParams.pageNum++;
                } else {
                    this.queryParams.pageNum = 1;
                    this.hasMoreRecommends = true;
                }

                let url = 'IPTVEMall/admin/first-review/recommendation/list?status=' +this.queryParams.status + '&page=' + this.queryParams.pageNum+ '&limit=' + this.queryParams.limit;
                this.$http.get(url)
                    .then((response) => {
                        if (response.data.resultCode === resultCode.SUCCESS) {
                            if (response.data.data.length<20) {
                                this.hasMoreRecommends = false;
                            }
                            if (more) {
                                this.productList = this.productList.concat(response.data.data);
                            } else {
                                this.productList = response.data.data;
                            }
                        } else {
                            apiCallback.success(response.data, this.$message);
                        }
                    },(response) => {
                        apiCallback.error(response);
                    })
            },
            tabClick(){
                this.queryRecProduct(false)
            },
            check (item,index) {
                if(item.firstReviewStatus==0){
                    this.visible=true;
                    this.currentProduct=item;
                    this.index=index;
//                    this.currentEle= this.$refs.myStatus[index];
                }


            },
            checkWay (id,isOk,msg){

                let url='/IPTVEMall/admin/first-review/recommendation/review';
                let data={
                    'id': id,
                    'ok': isOk,
                    'msg': msg
                };
                this.$http.post(url,data)
                    .then((response)=>{
                        if(response.data.resultCode===resultCode.SUCCESS){

                            if(isOk){
                                this.productList[this.index].firstReviewStatus=1;
//                                this.currentEle.style.color='#4fffa7';
                            }else {
                                this.productList[this.index].firstReviewStatus=2;
//                                this.currentEle.style.color='red';
                            }
//                            this.currentEle.innerHTML=msg;
                        }else {
                            apiCallback.success(response.data,this.$message)
                        }
                    },(response)=>{
                        apiCallback.error(response)
                    });
                this.visible=false;
            },

        }
    }
</script>

<style scoped>
    .checkBtns{
        margin-top: 20px;
    }

    .SellerCheck-panel {
        margin-top: 20px;
    }

    .panel-body {
        padding: 20px;
        background-color: white;
    }

    .panel-body td {
        text-align: center;
    }
    .sellerPro{
        display: inline-block;

        vertical-align: top;
        margin-top: 5px;
        margin-left: 5px;
    }
    .seller-logo{
        height: 70px;
        width: 70px;
    }
    .seller-name{
        color: #1e7ebb;
        display: block;
    }
    .isEdit{
        background-color: #ff9900;
        border-radius: 5px;
        display: inline-block;
        padding: 4px 7px;
        color: white;
        margin-top: 15px;
    }

    .more {
        display: inline-block;
        margin: 10px 0;
    }

    .RecCheckDialog{
        font-size: 20px;
    }

    /*审核是否通过状态类*/
    .checkWaiting{
        color:#169bd5;
        cursor: pointer;
    }
    .success{
        color:#00ff00
    }
    .error{
        color:#ff0000
    }
</style>