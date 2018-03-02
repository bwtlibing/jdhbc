<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="content-container">
            <div style="margin-bottom:20px">
                <span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';font-weight:bold;font-style:normal;font-size:32px">商品新建/编辑</span>


            </div>
            <table class="emall-table">

                <tbody>
                <tr class="content-row">
                    <td class="image-and-description denotation">
                        基本信息

                    </td>

                    <td>


                        <table class="basic-info-tb" style="border:0 none">
                            <tr>
                                <td style="border: 0 none">商品名称<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none" class="product-name">
                                    <el-input v-model="pname" placeholder="请输入内容（1~10字）"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品类别<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none; text-align:left">
                                    <el-select v-model="category_id"  placeholder="请选择"  filterable >
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">所属商家：</td>
                                <td style="border: 0 none; text-align:left">
                                    <el-select v-model="seller_id"  placeholder="请选择"  filterable clearable>
                                        <el-option
                                                v-for="item in optionsSellers"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </td>
                            </tr>

                            <tr>
                                <td style="border: 0 none">所属生态馆：</td>
                                <td style="border: 0 none; text-align:left">
                                    <el-select v-model="ecologicalHallId"  placeholder="请选择"  filterable clearable>
                                        <el-option
                                                v-for="item in optionsEcoHall"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                <tr class="content-row">
                    <td class="image-and-description denotation">
                        商品信息

                    </td>

                    <td>
                        <table class="basic-info-tb" style="border:0 none">
                           <!-- <tr>
                                <td style="border: 0 none">价格<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none" class="product-name">
                                    <el-input v-model="realPrice" placeholder="商城价" style="width:250px; float:left; margin-right:50px"></el-input>
                                    <el-input v-model="marketPrice" placeholder="市场参考价" style="width:250px; float:left"></el-input>
                                </td>
                            </tr>-->

                            <tr>
                                <td style="border: 0 none">商品图(1~5张)<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none" >
                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="0" :width="70" :height="70" :image-src.sync="images[0]"></image-uploader>
                                    </div>

                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="1" :width="70" :height="70" :image-src.sync="images[1]"></image-uploader>
                                    </div>

                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="2" :width="70" :height="70" :image-src.sync="images[2]"></image-uploader>
                                    </div>
                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="3" :width="70" :height="70" :image-src.sync="images[3]"></image-uploader>
                                    </div>
                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="4" :width="70" :height="70" :image-src.sync="images[4]"></image-uploader>
                                    </div>

                                    <br/> <br/> <br/><br/><br/>
                                    <div style="display:block; float:left">图片支持jpg，png格式，每张大小不超过400kb</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品主图<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none">
                                    <!--
                                        <img v-bind:src="mainImage" class="store_img">
                                     -->
                                    <image-uploader class="image-uploader" uploader-id="sss" :width="70" :height="70" :image-src.sync="mainImage"></image-uploader>
                                    <br/>
                                    <div style="display:block; float:left">图片支持jpg，png格式，每张大小不超过400kb</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品视频：</td>
                                <td style="border: 0 none">
                                    <el-input v-model="videoCode" placeholder="标清视频code（不超过100字符）" ></el-input>

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品视频(高清)：</td>
                                <td style="border: 0 none">

                                    <el-input v-model="videoCodeHd" placeholder="高清视频code（不超过100字符）" ></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品简介：</td>
                                <td style="border: 0 none">
                                    <el-input v-model="description" placeholder="促销、优惠等商品信息（不超过70字符）" ></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品详情：</td>
                                <td style="border: 0 none; text-align:left">
                                    <el-input type="textarea" v-model="detail"  placeholder="不超过100字符"></el-input>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                </tbody>
            </table>
            <br/>
            <div style="text-align:center">
                <el-button class="button" type="primary" size="large" style="width:300px" @click="saveDetail()">保存</el-button>
            </div>

        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import BreadCrumbs from '../base/BreadCrumbs'
import ImageUploader from '../base/ImageUploader'
import { orderValidator } from '../../utils/dataValidator.js'
import { resultCode, apiCallback } from '../../utils/common'

export default {
    name: 'EMallProducts',
    pid: "-1",
    components: {
        BreadCrumbs,
        ImageUploader,
    },
    data () {
        return {
            pid: '-1',
            pname:'',
            category_id: '',
            seller_id:'',
            realPrice:'',
            marketPrice:'',
            images:[],
            mainImage:'',
            videoCode:'',
            description:'',
            detail:'',
            videoCodeHd: '',
            dataForBreadCrumbs: [
                '翼商城管理', '商品新建'
            ],
            radio_allow_wx: 0,
            radio_allow_zfb: 0,
            radio_allow_yzf: 0,
            allow_wx:'',
            allow_zfb:'',
            allow_yzf:'',
            salesVolumnPseudo: '0',
            radio: '-1',
            radio2: '-1', //减免或者折扣
            dName: '',
            dAmount: '',
            back_allow_wx: '',
            back_allow_zfb: '',
            back_allow_yzf: '',
            back_dAmount: '',
            ProductInfo: [],
            options:[],
            optionsSellers:[],
            ecologicalHallId:'',
            ecologicalHallBrief: '',
            optionsEcoHall: [],
        }
    },
    created () {
        this.pid = this.$route.params.pid;
         console.log(this.$route.params);
         console.log(this.$route.params.pid);
        this.routeChange();
    },
    watch: {
        '$route': 'routeChange'
    },
    methods:{
          routeChange() {
              this.pid = this.$route.params.pid;

              if(this.pid < 0){
                //new

                  this.getCategory();
                  this.getSellers();
                  this.getEcoHall();
                  this.dataForBreadCrumbs=['翼商城管理', '商品新建：'+this.pid];
              }else{
                 this.dataForBreadCrumbs=['翼商城管理', '编辑商品：'+this.pid];
                 this.getCategory();
                 this.getSellers();
                 this.getEcoHall();
                 this.getDetail();
                 
              }
            
          },
          getCategory(){
              var url ="/IPTVEMall/admin/category/query-category-list?page_num=1&page_size=1000";
                this.$http.get(url)
                .then((response) => {
                    if (response.data.resultCode === resultCode.SUCCESS) {
                    
                       this.options= response.data.data.pageData;
                       
                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
          },
          getSellers(){
              var url ="/IPTVEMall/admin/seller/query-seller-list?page_num=1&page_size=1000";
                this.$http.get(url)
                .then((response) => {
                    if (response.data.resultCode === resultCode.SUCCESS) {
                    
                       this.optionsSellers= response.data.data.pageData;
                       
                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
          },
          getEcoHall(){
              var url ="/IPTVEMall/ecologicalHall/get-ecological-hall-list";
                this.$http.get(url)
                .then((response) => {
                    if (response.data.resultCode === resultCode.SUCCESS) {
                    
                       this.optionsEcoHall= response.data.data;
                       
                    } else {

                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
          },
          getDetail(){
             if(this.pid < 0){
                return;
             }
             var url = "/IPTVEMall/admin/product/detail?product_id="+this.pid;
             this.$http.get(url)
                .then((response) => {
                    if (response.data.resultCode === resultCode.SUCCESS) {
                        this.pname = response.data.data.name;
                        this.category_id = response.data.data.category.id;
                        if(response.data.data.seller != null){
                           this.seller_id = response.data.data.seller.id;
                        }
                        
                        this.realPrice = (response.data.data.realPrice/100).toFixed(2);
                        this.marketPrice = (response.data.data.marketPrice/100).toFixed(2);
                        this.images = response.data.data.images;
                        this.mainImage = response.data.data.mainImage;
                        this.videoCode = response.data.data.videoCode;
                        this.videoCodeHd = response.data.data.videoCodeHd;
                        this.description = response.data.data.description;
                        this.detail = response.data.data.detail;
                        this.ecologicalHallBrief = response.data.data.ecologicalHallBrief;

                        //复用一下，其实有重复
                        this.ProductInfo = response.data.data;
                        this.salesVolumnPseudo = this.ProductInfo.salesVolumnPseudo;
                        //alert(JSON.stringify(this.ProductInfo ));
                        if(this.ProductInfo.discount == null || this.ProductInfo.discount.open == false){
                           this.radio2 = -1;
                        }else{
                           this.radio2 = this.ProductInfo.discount.discountType;
                           this.dName =  this.ProductInfo.discount.discountName;
                           if(this.radio2 == 0){
                              this.dAmount = (this.ProductInfo.discount.discountValue/100.0).toFixed(2);
                           }else if(this.radio2 == 1){
                              this.dAmount = (this.ProductInfo.discount.discountValue);
                           }
                           this.back_dAmount = this.dAmount;
                        }
                        if(this.ProductInfo.payAllowances.length == 0){

                        }else{
                            if(this.ProductInfo.payAllowances[0].open == false){
                                this.radio_allow_wx = 0;
                                this.allow_wx = '';
                            }else{
                                this.radio_allow_wx = 1;
                                this.allow_wx = this.ProductInfo.payAllowances[0].allowance/100;
                            }
                            if(this.ProductInfo.payAllowances[1].open == false){
                                this.radio_allow_zfb = 0;
                                this.allow_zfb = '';
                            }else{
                                this.radio_allow_zfb = 1;
                                this.allow_zfb = this.ProductInfo.payAllowances[1].allowance/100;
                            }
                            if(this.ProductInfo.payAllowances[2].open == false){
                                this.radio_allow_yzf = 0;
                                this.allow_yzf = '';
                            }else{
                                this.radio_allow_yzf = 1;
                                this.allow_yzf = this.ProductInfo.payAllowances[2].allowance/100;
                            }
                            this.back_allow_wx = this.allow_wx;
                            this.back_allow_zfb = this.allow_zfb;
                            this.back_allow_yzf = this.allow_yzf;

                        }
                        if(this.ecologicalHallBrief!=null){
                          this.ecologicalHallId = this.ecologicalHallBrief.id;
                        }
                    }
                },(response) => {
                    apiCallback.error(response);
                })
          },
          saveDetail(){

              if(!this.ValidateCheck()){
                  return false;
              }
              if(this.seller_id=='' || isNaN(this.seller_id)){
                this.seller_id = 0;
              }
              if(this.pid < 0){

                  var data ={
                    name: this.pname,
                    categoryId: this.category_id,
                    realPrice: this.realPrice*100,
                    sellerId:this.seller_id,
                    marketPrice: this.marketPrice*100,
                    images:this.images,
                    mainImage: this.mainImage,
                    videoCode: this.videoCode,
                    videoCodeHd: this.videoCodeHd,
                    description: this.description,
                    detail: this.detail,
                    ecologicalHallId: this.ecologicalHallId
                  };
                  var url = "/IPTVEMall/admin/product/add";     
                  var denotation = "创建成功并上架";             
              }else{
                
                  var data = {
                    id: this.pid,
                    name: this.pname,
                    categoryId: this.category_id,
                    realPrice: this.realPrice*100,
                    sellerId:this.seller_id,
                    marketPrice: this.marketPrice*100,
                    images:this.images,
                    mainImage: this.mainImage,
                    videoCode: this.videoCode,
                    videoCodeHd: this.videoCodeHd,
                    description: this.description,
                    detail: this.detail,
                    ecologicalHallId: this.ecologicalHallId
                  };
                  var url = "/IPTVEMall/admin/product/edit";   
                  var denotation = "保存成功";             
              }

              this.$http.post(url,data)
                .then((response) => {
                    if (response.data.resultCode === resultCode.SUCCESS) {
                        //商品新建完成后，提示并跳回列表页，商品编辑完成后，只提示
                         if(this.pid < 0 ){
                            this.$message.success(denotation);
                            this.$router.push("/emall/products");
                         }else{
                            this.$message.success(denotation);
                            this.$router.push("/emall/products");
                         }
                         
                    }else{
                        //alert(response.resultCode);
                        //apiCallback.error(response);
                        apiCallback.success(response, this.$message);
                        //this.$message.error('操作失败：'+response.data.resultMsg);
                    }
                },(response) => {
                    apiCallback.error(response);
                })

          },
          ValidateCheck(){

            if(!(this.pname.length> 0 && this.pname.length <=10)){
                  this.$message.error('商品名称长度为1~10');
                  return false;
            }
            if(this.category_id.length == 0 || isNaN(this.category_id)){
               this.$message.error('请选择商品类别');
                  return false;
            }
            if(isNaN(this.realPrice) || this.realPrice.length <= 0){
                  this.$message.error('商城价未填写或填写不合法');
                  return false;
            }
            if(this.realPrice*1.0 <= 0){
                  
                  this.$message.error('商城价需为正数');
                  return false;
            }
            if(isNaN(this.marketPrice) || this.marketPrice.length <= 0){
                  this.$message.error('商品市场价格未填写或填写不合法');
                  return false;
            }
            if(this.marketPrice*1.0 <= 0){
                  
                  this.$message.error('商品市场参考价格需为正数');
                  return false;
            }
            if(this.realPrice*1.0 > this.marketPrice*1.0){
            

                  this.$message.error('商品的商城价不应高于市场参考价格');
                  return false;
            }
            //realPrice 在前面已经变成元了
            if(this.radio2 == 1){
                  if(this.radio_allow_wx == 1  &&  this.dAmount/100 * this.realPrice*100.0 - this.allow_wx*100.0 < 0 ){

                      this.$message.error("折扣和微信补贴累加后会超过当前所设的商品价格");
                      this.dAmount = this.back_dAmount;
                      return;
                  }
                  if(this.radio_allow_zfb == 1  &&  this.dAmount/100 * this.realPrice*100.0 - this.allow_zfb*100.0 < 0 ){
                      this.$message.error("折扣和支付宝补贴累加后会超过当前所设的商品价格");
                      this.dAmount = this.back_dAmount;
                      return;
                  }
                  if(this.radio_allow_yzf == 1  &&  this.dAmount/100 * this.realPrice*100.0 - this.allow_yzf*100.0 < 0 ){
                      this.$message.error("折扣和翼支付补贴累加后会超过当前所设的商品价格");
                      this.dAmount = this.back_dAmount;
                      return;
                  }
              }
              else if(this.radio2 == 0){
                  //alert(this.dAmount);
                  if(this.dAmount*100 >= this.realPrice*100.0){
                      this.$message.error("减免优惠金额会超过当前所设的商品价格");
                      this.dAmount = this.back_dAmount;
                      return;
                  }

                  if(this.radio_allow_wx == 1  &&  this.realPrice*100.0 -this.dAmount*100 - this.allow_wx*100.0 < 0 ){
                          this.$message.error("减免优惠和微信补贴累加后会超过当前所设的商品价格");
                          this.dAmount = this.back_dAmount;
                          return;
                      }
                  if(this.radio_allow_zfb == 1  &&   this.realPrice*100.0 -this.dAmount*100 - this.allow_zfb*100.0 < 0 ){
                      this.$message.error("减免优惠和支付宝补贴累加后会超过当前所设的商品价格");
                      this.dAmount = this.back_dAmount;
                      return;
                  }
                  if(this.radio_allow_yzf == 1  &&   this.realPrice*100.0 -this.dAmount*100 - this.allow_yzf*100.0 < 0 ){
                      this.$message.error("减免优惠和翼支付补贴累加后会超过当前所设的商品价格");
                      this.dAmount = this.back_dAmount;
                      return;
                  }
              }

              if( this.radio_allow_wx == 1  && this.realPrice*100.0 <= this.allow_wx*100){
                 this.$message.error("微信补贴后会超过当前所设的商品价格");
                 this.allow_wx = this.back_allow_wx;
                  return;
              }
              if(this.radio_allow_zfb == 1  && this.realPrice*100.0 <= this.allow_zfb*100){
                 this.$message.error("支付宝补贴后会超过当前所设的商品价格");
                 this.allow_zfb = this.back_allow_zfb;
                  return;
              }
              if(this.radio_allow_yzf == 1  &&  this.realPrice*100.0 <= this.allow_yzf*100){
                 this.$message.error("翼支付补贴后会超过当前所设的商品价格");
                 this.allow_yzf = this.back_allow_yzf;
                  return;
              }





            //image数组 得多检查一下，空的要清空掉
              var temp = this.images;
              this.images = [];
              for(var i = 0; i < temp.length; i++){
                 //alert(i+" "+temp[i].length)
                 if(temp[i].length > 0){
                    this.images.push(temp[i]);
                 }
                 
              }

            if(this.images.length<= 0 || this.images.length >5){
              
                  this.$message.error('商品图片为1~5张');
                  return false;
            }

            if(this.mainImage == 0){
               this.$message.error('商品主图未添加');
              return false;
            }
            if(this.mainImage <= 0 || this.mainImage > 100){
               
                 this.$message.error('商品主图url长度不合要求');
                  return false;
            }
            if(!(this.videoCode== null || this.videoCode.length>= 0 && this.videoCode.length <=100)){
                
                  this.$message.error('标清视频code长度不合要求');
                  return false;
            }
            if(!(this.videoCodeHd== null || this.videoCodeHd.length>= 0 && this.videoCodeHd.length <=100)){
                  
                  this.$message.error('高清视频code长度不合要求');
                  return false;
            }
            if( ( (this.videoCode == null) && (this.videoCodeHd != null) ) ||   ( (this.videoCode != null) && (this.videoCodeHd == null) )  ){
                
                this.$message.error('标清和高清视频应该同时存在或者同时不存在');
                return false;
            }
            if(this.description!= null && this.description.length > 70 ){
                  
                  this.$message.error('商品简介不超过70字');
                  return false;
            }
            //alert(this.detail.length);
            if(this.detail!= null && this.detail.length >100){
                  
                  this.$message.error('商品详情不超过100字');
                  return false;
            }
            return true;

      }
    },
   
}
</script>


<style scoped>
.content-container {
    background-color: white;
    margin-top: 20px;
    padding: 20px;
}


.add-recommendation .button {
    float: right;
}
.product-name{
  font-size: 18px;
  font-weight: bold;
}
.emall-table td.image-and-description {
    padding: 10px 20px;
    text-align: left;
    vertical-align: middle;
}
.emall-table td.no-border{
  border:0 none;
}
.emall-table td.denotation{
    width: 15%;
    font-weight: bold;
    font-size: 20px;
}
.image-and-description img {
    height: 70px;
    width: 70px;
    vertical-align: middle;
}

.image-and-description a {
    vertical-align: middle;
    display: inline-block;
    width: 220px;
    margin-left: 10px;
}
.image-and-description a .pro_name{
    color: #169BD5;
}
.image-and-description a .pro_price{
    color: #FF9900;
}
.image-and-description a .pro_state{
    color: #FF0000;
}
.basic-info-tb {
    width: 100%;
}
.basic-info-tb tr td{
    border:0 none;
}
.basic-info-tb tr td:first-child{
    width: 20%;
    text-align: right;
}
.emall-table .btn-link:last-child {
    margin-left: 20px;
}

.recommendation-row {
    margin-bottom: 20px;
}

.recommendation-row .text-label {
    text-align: right;
    line-height: 40px;
    font-size: 15px;
}

.area-info {
    margin-top: 10px;
}

.recommendation-type {
    margin-top: 20px;
}

.recommendation-type .radio {
    vertical-align: top;
}

.recommendation-type img {
    width: 70px;
    height: 70px;
    margin: -10px 0 0 10px;
}

.recommendation-type .video-code-input {
    width: 200px;
    margin: -10px 0 0 10px;
}

.more {
    display: inline-block;
    margin: 10px 0;
}
.store_img{
    height: 50px;
    margin-right: 20px;
}
.state_notation{
    margin-right: 20px;
    color: #00FF00;
}

.more {
    display: inline-block;
    margin: 10px 0;
}
</style>