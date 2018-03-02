<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>

        <div class="SellerCheck-panel">
            <div class="panel-body">
                <div >
                    <el-tabs v-model="queryParams.status" type="card" @tab-click="tabClick">
                        <el-tab-pane label="待审核"   name="0" ></el-tab-pane>
                        <el-tab-pane label="审核通过" name="1" ></el-tab-pane>
                        <el-tab-pane label="审核失败" name="2" ></el-tab-pane>
                    </el-tabs>
                </div>

                <table class="emall-table">
                    <thead>
                    <tr class="head-row">
                        <th style="width:28%;">描述</th>
                        <th style="width:18%;">类别</th>
                        <th style="width:18%;">提交时间</th>
                        <th style="width:18%;">审核时间</th>
                        <th style="width:18%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr  class="content-row"  v-for=" (item , index) in productList">
                        <td style="text-align: left;padding-left: 20px">
                            <img class="seller-logo"  :src="item.mainImage" alt="">
                            <div class="sellerPro">
                                <router-link :to="'/emall/productedit/' + item.productId"  class="seller-name" target="_blank">{{item.name}}</router-link>
                                <span class="isEdit">编辑</span>
                            </div>
                        </td>
                        <td>{{item.category.name}}</td>
                        <td>{{item.createTime | timeFormat }}</td>

                        <td>{{item.firstReviewTime | timeFormat}}</td>
                        <td>
                            <span  class="checkWaiting" :class="{'success':item.firstReviewStatus=='1','error':item.firstReviewStatus=='2'}" ref="myStatus" @click.self="check(item,index)">{{item.firstReviewStatus | checkStatusFilter}}</span>
                        </td>
                    </tr>

                    <!-- <tr v-for="refundItem in refundList" class="content-row">
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
                     </tr>-->
                    </tbody>
                </table>
                <a class="btn-link more" v-show="hasMoreProduct" @click="queryProduct(true)">更多</a>

                <el-dialog :visible.sync="visible" title='商品审核'  width="800px" >
                    <ul class="dialog-ul" >
                        <li>
                            <span class="dialog-title">商品名称：</span>
                            <span class="dialog-detail">
                              <b class="leftB" style="font-size: 23px">{{currentProduct.name}}</b>
                              <span class="rightSpanContent" ><b class="rightB">商品类别：</b><b>{{currentProduct.category.name}}</b></span>
                          </span>
                        </li>
                        <li>
                            <span class="dialog-title" v-if="true">所属商家：</span>
                            <span class="dialog-detail" v-if="currentProduct.seller||currentProduct.ecologicalHallBrief">
                              <b class="leftB" v-if="currentProduct.seller">
                                  <img :src="currentProduct.seller.image" alt="">
                                  <span style=" display: inline-block;width: 170px;vertical-align: middle">{{currentProduct.seller.name}}</span>
                              </b>
                              <b class="leftB" v-if="!currentProduct.seller">
                                  暂无商家
                              </b>
                              <span class="rightSpanContent" v-if="currentProduct.ecologicalHallBrief!=null" >
                                  <b class="rightB">所属生态馆：</b>
                                  <b>
                                     <img :src="currentProduct.ecologicalHallBrief.ecoTopicImage" alt="">
                                     <span>{{currentProduct.ecologicalHallBrief.name}}</span>
                                  </b>
                              </span>
                          </span>
                        </li>
                        <li>
                            <span class="dialog-title">商品图：</span>
                            <span class="dialog-detail">
                              <img class="sellerImg" v-for="image in currentProduct.images"  :src="image" alt="">
                          </span>
                        </li>
                        <li>
                            <span class="dialog-title">商品主图：</span>
                            <span class="dialog-detail">
                              <img class="sellerImg"  :src="currentProduct.mainImage" alt="">
                          </span>
                        </li>
                        <li>
                            <span class="dialog-title">标清视频：</span>
                            <span class="dialog-detail">
                              <b class="leftB">{{currentProduct.videoCode}}</b>
                              <span class="rightSpanContent" ><b class="rightB">高清视频：</b><b>{{currentProduct.videoCodeHD}}</b></span>
                          </span>
                        </li>
                        <li>
                            <span class="dialog-title">商品简介：</span>
                            <span class="dialog-detail">
                              {{currentProduct.description}}
                          </span>
                        </li>
                        <li>
                            <span class="dialog-title">商品详情：</span>
                            <span class="dialog-detail" style="vertical-align: top">
                               商品介绍：<br/><span>{{currentProduct.detail}}</span><br/>
                                   <!--配送：<br/><span>的函数复合大师了开发商的开发商的电视费厚大司考福建省的福建省浪蝶狂蜂就是的</span><br/>-->
                          </span>
                        </li>
                    </ul>

                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="checkWay(currentProduct.id , 1 , '审核通过')">通过</el-button>
                        <el-button type="danger"  @click="checkWay(currentProduct.id , 0 , '审核失败')">不通过</el-button>
                    </div>

                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>

    import BreadCrumbs from '../base/BreadCrumbs'
    import { resultCode, apiCallback } from '../../utils/common'

    export default {
        name: 'ProductCheck',
        components: {
            BreadCrumbs,
        },
        data () {
            return {
                dataForBreadCrumbs: [
                    '翼商城管理','商品审核'
                ],
                productList:[],
                queryParams:{
                    status:0,
                    pageNum:1,
                    limit:'20'
                },
                hasMoreProduct: true,
                visible:false,
                currentProduct:{
                    id:'',
                    name:'',
                    category:{
                        name:''
                    },
                    seller:{
                        name:'',
                        image:''
                    },
                    ecologicalHallBrief:{
                        name:'',
                        ecoTopicImage:''
                    },
                    images:[],
                    mainImage:'',
                    videoCode:'',
                    videoCodeHD:'',
                    description:'',
                    detail:''
                },
                currentEle:'',
                index:''
//                selectType:''

            }
        },
        created () {
            this.queryProduct(false);
        },
        mounted () {

        },
        watch: {},
        methods: {
            queryProduct(more) {

                if (more) {
                    this.queryParams.pageNum++;
                } else {
                    this.queryParams.pageNum = 1;
                    this.hasMoreProduct = true;
                }
                let url = '/IPTVEMall/admin/first-review/product/list?status=' +this.queryParams.status + '&page=' + this.queryParams.pageNum+ '&limit=' + this.queryParams.limit;
                this.$http.get(url)
                    .then((response) => {
                        if (response.data.resultCode === resultCode.SUCCESS) {
                            if (response.data.data.length<20) {
                                this.hasMoreProduct = false;
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
                this.queryProduct(false);
                this.currentEle='';
                console.log(this.currentEle);
            },
            check (item,index) {
                if(item.firstReviewStatus==0){
                    this.visible=true;
                    this.currentProduct=item;
                    this.index=index;
//                   this.currentEle= this.$refs.myStatus[index];
                }
            },
            checkWay (id,isOk,msg){
                let url='/IPTVEMall/admin/first-review/product/review';
                let data={
                    'id': id,
                    'ok': isOk,
                    'msg': msg
                };
                this.$http.post(url,data)
                    .then((response)=>{
                         if(response.data.resultCode===resultCode.SUCCESS){

                            if(isOk){
//
                                this.productList[this.index].firstReviewStatus=1;
//                              this.currentEle.style.color='#4fffa7';
                            }else {
                                this.productList[this.index].firstReviewStatus=2;
//
//                              this.currentEle.style.color='red';
                            }
//                             this.currentEle.innerHTML=msg;
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
    /*对话框*/
    .dialog-ul{
        padding: 0;
        margin: 0
    }
    .dialog-ul li{
        margin-bottom: 20px;

    }
    .dialog-ul li img{
        vertical-align: middle;
        margin-right: 10px;
        height: 60px; width: 60px;
    }
    .dialog-ul  .dialog-title{
        text-align: right;
        display: inline-block;
        width: 80px;
    }
    .dialog-ul  .dialog-detail{
        margin-left: 15px;
        display: inline-block;
        width: 85%;
        vertical-align: middle;
    }
    .dialog-ul .sellerImg{
        height: 70px; width: 70px;
        margin-right: 20px;
    }
    .dialog-ul .rightSpanContent{
        margin-left: 60px;
    }
    .dialog-ul .leftB{
        display: inline-block;
        width: 250px;
    }
    .dialog-ul .rightB{
        display: inline-block;
        margin-right: 10px;
        width: 90px;
        text-align: right;
        font-weight: normal;
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