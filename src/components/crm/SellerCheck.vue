<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="SellerCheck-panel">
            <div class="panel-body">
                <div >
                    <el-tabs  v-model="queryParams.status" type="card" @tab-click="tabClick">
                        <el-tab-pane label="待审核" name="0"></el-tab-pane>
                        <el-tab-pane label="审核通过" name="1"></el-tab-pane>
                        <el-tab-pane label="审核失败" name="2"></el-tab-pane>
                    </el-tabs>
                </div>

                <table class="emall-table">
                    <thead>
                    <tr class="head-row">
                        <th style="width:26%;">商家</th>
                        <th style="width:32%;">简介</th>
                        <th style="width:14%;">提交时间</th>
                        <th style="width:14%;">审核时间</th>
                        <th style="width:14%;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                     <tr  class="content-row" v-for=" (item , index) in sellerList">

                        <td style="text-align: left;padding-left: 20px">
                            <img class="seller-logo"  :src="item.logoImage" alt="">
                            <div class="sellerPro">

                                <router-link :to="'/crm/selleredit/' + item.sellerId"  class="seller-name" target="_blank">{{item.name}}</router-link>
                                <span class="isEdit">编辑</span>
                            </div>

                        </td>
                        <td>{{item.introduce}}</td>
                        <td>{{item.createTime | timeFormat}}</td>

                        <td>{{item.firstReviewTime | timeFormat}}</td>
                        <td>
                            <span  class="checkWaiting" :class="{'success':item.firstReviewStatus=='1','error':item.firstReviewStatus=='2'}" ref="myStatus" @click.self="check(item,index)">{{item.firstReviewStatus | checkStatusFilter}}</span>
                        </td>
                    </tr>

                    </tbody>
                </table>
                <a class="btn-link more" v-show="hasMoreSellers" @click="querySeller(true)">更多</a>

                <el-dialog :visible.sync="visible" title='商家审核' width="800px" >
                  <ul class="dialog-ul" >
                      <li>
                          <span class="dialog-title">商家名称：</span>
                          <span class="dialog-detail">
                              <img style="" :src="currentSeller.logoImage" alt="">
                              <b class="dialogSellerName" >{{currentSeller.name}}</b>
                              <span class="enterSeller" v-if="currentSeller.type==1">翼支付入驻商家</span>
                          </span>
                      </li>
                      <li>
                          <span class="dialog-title">商家简介：</span>
                          <span class="dialog-detail">
                              {{currentSeller.introduce}}
                          </span>
                      </li>
                      <li>
                          <span class="dialog-title">商家地址：</span>
                          <span class="dialog-detail">
                               {{currentSeller.address}}
                          </span>
                      </li>
                      <li>
                          <span class="dialog-title">商家图：</span>
                          <span class="dialog-detail">
                              <img class="sellerImg" v-for="image in currentSeller.images"  :src="image" alt="">
                          </span>
                      </li>
                      <li>
                          <span class="dialog-title">标清视频：</span>
                          <span class="dialog-detail">
                              <b>{{currentSeller.videoCode}}</b>
                              <span style="margin-left: 40px">高清视频：<b>{{currentSeller.videoCodeHd}}</b></span>
                          </span>
                      </li>
                  </ul>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="checkWay(currentSeller.id , 1 , '审核通过')">通过</el-button>
                        <el-button type="danger"  @click="checkWay(currentSeller.id , 0 , '审核失败')">不通过</el-button>
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
        name: 'SellerCheck',
        components: {
            BreadCrumbs,
        },
        data () {
            return {
                dataForBreadCrumbs: [
                    '商户系统','商家审核'
                ],
                hasMoreSellers: true,
                visible:false,
                sellerList:[],
                queryParams:{
                    status:0,
                    pageNum:1,
                    limit:'20'
                },
                currentSeller:{
                    id:'',
                    name:'',
                    type:'0',
                    introduce:'',
                    address:'',
                    images:[],
                    videoCode:'',
                    videoCodeHd:''
                },
                currentEle:'',
                index:''


            }
        },
        created () {
           this.querySeller(false);
        },
        mounted () {

        },
        watch: {},
        methods: {
            querySeller(more) {
                if (more) {
                    this.queryParams.pageNum++;
                } else {
                    this.queryParams.pageNum = 1;
                    this.hasMoreSellers = true;
                }

                let url = '/IPTVEMall/admin/first-review/seller/list?status=' +this.queryParams.status + '&page=' + this.queryParams.pageNum+ '&limit=' + this.queryParams.limit;
                this.$http.get(url)
                    .then((response) => {
                        if (response.data.resultCode === resultCode.SUCCESS) {
                            if (response.data.data.length<20) {
                                this.hasMoreSellers = false;
                            }
                            if (more) {
                                this.sellerList = this.sellerList.concat(response.data.data);
                            } else {
                                this.sellerList = response.data.data;
                            }
                        } else {
                            apiCallback.success(response.data, this.$message);
                        }
                    },(response) => {
                        apiCallback.error(response);
                    })
            },
            tabClick(){
                this.querySeller(false);
            },
            check (item,index) {
                if(item.firstReviewStatus==0){
                    this.visible=true;
                    this.currentSeller=item;
                    this.index=index;
//                    this.currentEle= this.$refs.myStatus[index];
                }


            },
            checkWay (id,isOk,msg){
                let url='/IPTVEMall/admin/first-review/seller/review';
                let data={
                    'id': id,
                    'ok': isOk,
                    'msg': msg
                };
                this.$http.post(url,data)
                    .then((response)=>{
                        if(response.data.resultCode===resultCode.SUCCESS){

                            if(isOk){
                                this.sellerList[this.index].firstReviewStatus=1;
//                                this.currentEle.style.color='#4fffa7';
                            }else {
                                this.sellerList[this.index].firstReviewStatus=2;
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
       width: 650px;
       vertical-align: middle;
   }
   .dialog-ul .dialogSellerName{
       font-size: 20px;
       font-weight: normal;
       vertical-align: text-top;
   }
   .dialog-ul .enterSeller{
       display: inline-block;
       padding: 0 6px;
       height: 26px;
       line-height: 29px;
       background-color:#ff9900;
       border-radius: 5px;
       margin-left: 10px;
       color: white;
       vertical-align: middle;
   }
   .dialog-ul .sellerImg{
       height: 70px; width: 70px;
       margin-right: 20px;
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