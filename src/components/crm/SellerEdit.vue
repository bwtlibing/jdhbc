
<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="content-container">
            <div style="margin-bottom:20px">
                <span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';font-weight:bold;font-style:normal;font-size:32px">商品新建/编辑</span>
            </div>

            <!--
            mark
            -->
            <table class="emall-table">

                <tbody>
                <tr class="content-row">
                    <td class="image-and-description denotation">
                        基本信息

                    </td>

                    <td>


                        <table class="basic-info-tb" style="border:0 none">
                            <tr>
                                <td style="border: 0 none" class="product-name-hd">商家名称<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none" class="product-name">
                                    <el-input v-model="SellerInfo.name" placeholder="请输入内容（1~20字）"></el-input>
                                </td>
                            </tr>

                            <tr>
                                <td style="border: 0 none">商家LOGO<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none">

                                    <image-uploader class="image-uploader" uploader-id="7" :width="80" :height="80" :image-src.sync="SellerInfo.logoImage"></image-uploader>

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">翼支付入驻商家<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none" >
                                    <el-radio-group v-model="SellerInfo.type" style="float:left">

                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家简介<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none">
                                    <el-input v-model="SellerInfo.introduce" placeholder="请输入内容（1~90字）"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家地址<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none">
                                    <el-input v-model="SellerInfo.address" placeholder="请输入内容（1~45字）"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家图<span style="color:red; font-size:20px">*</span>：</td>
                                <td style="border: 0 none">
                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="0" :width="70" :height="70" :image-src.sync="SellerInfo.images[0]"></image-uploader>
                                    </div>

                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="1" :width="70" :height="70" :image-src.sync="SellerInfo.images[1]"></image-uploader>
                                    </div>

                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="2" :width="70" :height="70" :image-src.sync="SellerInfo.images[2]"></image-uploader>
                                    </div>
                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="3" :width="70" :height="70" :image-src.sync="SellerInfo.images[3]"></image-uploader>
                                    </div>
                                    <div style="float:left; margin-right:20px">
                                        <image-uploader class="image-uploader" uploader-id="4" :width="70" :height="70" :image-src.sync="SellerInfo.images[4]"></image-uploader>
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家视频（标清）：</td>
                                <td style="border: 0 none">
                                    <el-input v-model="SellerInfo.videoCode" placeholder="请输入内容（1~100字）"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家视频（高清）：</td>
                                <td style="border: 0 none">
                                    <el-input v-model="SellerInfo.videoCodeHd" placeholder="请输入内容（1~100字）"></el-input>
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
            sid: '-1',
            dataForBreadCrumbs: [
                '商户系统', '商家管理','',
            ],
            SellerInfo: {
               name:'',
               logoImage:'',
               type:'',
               createTime:'',
               introduce:'',
               address:'',
               images:[],
               videoCode:'',
               videoCodeHd:'',
               pageView:'',
               sellNum:''
            },
            
        }
    },
    created () {
        this.sid = this.$route.params.sid;
        this.routeChange();
    },
    watch: {
        '$route': 'routeChange'
    },
    methods:{
          routeChange() {
              this.sid = this.$route.params.sid;
        
              if(this.sid < 0){
                this.SellerInfo={
                   name:'',
                   logoImage:'',
                   type:'-1',
                   createTime:'',
                   introduce:'',
                   address:'',
                   images:[],
                   videoCode:'',
                   videoCodeHd:'',
                   pageView:'',
                   sellNum:''
                },
                this.dataForBreadCrumbs=['商户系统', '商家管理', "新建商家"];
              }else{
                //this.dataForBreadCrumbs[2] = "编辑商家："+this.sid;
                //alert(this.dataForBreadCrumbs[2]);
                this.dataForBreadCrumbs=['商户系统', '商家管理', "编辑商家："+this.sid];
              }
              this.getSellerDetail();
              
            
          },
          
          
          getSellerDetail(){
                 if(this.sid < 0){

                    return;
                 }
                 var url = "/IPTVEMall/admin/seller/query-seller-detail?seller_id="+this.sid;
                 this.$http.get(url)
                  .then((response) => {

                      if (response.data.resultCode === resultCode.SUCCESS) {

                          this.SellerInfo = response.data.data;


                      } else {
                          apiCallback.success(response.data, this.$message);
                      }
                  },(response) => {
                      apiCallback.error(response);
                  });
             
          },
          ValidateCheck(){
             
              if(this.SellerInfo.name== null || this.SellerInfo.name.length == 0){
                  this.$message.error("商家名称不可以为空");
                  return false;
              }
              if(this.SellerInfo.name.length> 20){
                 this.$message.error("商家名称不可以超过20字");
                  return false;
              }
              if(this.SellerInfo.logoImage.length == null || this.SellerInfo.logoImage.length <= 0){
                 this.$message.error("商家LOGO未上传");
                  return false;
              }
              //alert(this.SellerInfo.type);
              if(this.SellerInfo.type!= 0 && this.SellerInfo.type !=1 ){
                 this.$message.error("未选择翼支付是否入驻商家");
                  return false;
              }
              if(this.SellerInfo.introduce == null && this.SellerInfo.introduce.length <= 0 ){
                 this.$message.error("商家简介未填写");
                  return false;
              }
              if(this.SellerInfo.introduce.length >90 ){
                 this.$message.error("商家简介不能超过90字");
                  return false;
              }
              if(this.SellerInfo.address == null || this.SellerInfo.address.length <= 0){
                 this.$message.error("商家地址未填写");
                  return false;
              }
              if(this.SellerInfo.address != null && this.SellerInfo.address.length > 45){
                 this.$message.error("商家地址不能超过45字");
                  return false;
              }
              //image数组 得多检查一下，空的要清空掉
              var temp = this.SellerInfo.images;
              this.SellerInfo.images = [];
              for(var i = 0; i < temp.length; i++){
                 //alert(i+" "+temp[i].length)
                 if(temp[i].length > 0){
                    this.SellerInfo.images.push(temp[i]);
                 }
              }

              if(this.SellerInfo.images.length<= 0 || this.SellerInfo.images.length >5){
                
                    this.$message.error('商品图片应为1~5张');
                    return false;
              }
              if( ( (this.SellerInfo.videoCode == null) && (this.SellerInfo.videoCodeHd != null) ) ||   ( (this.SellerInfo.videoCode != null) && (this.SellerInfo.videoCodeHd == null) )  ){
                
                this.$message.error('标清和高清视频应该同时存在或者同时不存在');
                return false;
              }
              if( this.SellerInfo.videoCode != null && this.SellerInfo.videoCode.length >100  ){
                 this.$message.error('标清视频不能超过100字符');
                return false;
              }
              if( this.SellerInfo.videoCodeHd != null && this.SellerInfo.videoCodeHd.length >100  ){
                 this.$message.error('高清视频不能超过100字符');
                return false;
              }
              if( (this.SellerInfo.videoCode ==null || this.SellerInfo.videoCode.length <= 0) && this.SellerInfo.images.length !=5){
                  this.$message.error('如果没有上传商家视频，商家图必须为5张');
                  return false;
              }
              if(this.SellerInfo.videoCode!=null && this.SellerInfo.videoCode.length > 0 && this.SellerInfo.images.length !=4){
                  this.$message.error('如果上传了商家视频，商家图必须为4张');
                  return false;
              }
            return true;
          },
          saveDetail(){
              
              if(!this.ValidateCheck()){
                  return false;
              }
              var jsonImg = [];
              for(var i = 0; i < this.SellerInfo.images.length; i++){
                  var imgItem={
                     url: this.SellerInfo.images[i],
                     position: i
                  };
                  jsonImg.push(imgItem);
              }
              if(this.sid < 0){
                  
                  var data ={
                      name:this.SellerInfo.name,
                      logoImageUrl:this.SellerInfo.logoImage,
                      introduce:this.SellerInfo.introduce,
                      type:this.SellerInfo.type,
                      address:this.SellerInfo.address,
                      images:jsonImg,
                      videoCode: this.SellerInfo.videoCode,
                      videoCodeHd: this.SellerInfo.videoCodeHd

                  };
                  var url = "/IPTVEMall/admin/seller/add-seller";     
                  var denotation = "创建成功";             
              }else{
                
                  var data ={
                      id:this.sid,
                      name:this.SellerInfo.name,
                      logoImageUrl:this.SellerInfo.logoImage,
                      introduce:this.SellerInfo.introduce,
                      type:this.SellerInfo.type,
                      address:this.SellerInfo.address,
                      images:jsonImg,
                      videoCode: this.SellerInfo.videoCode,
                      videoCodeHd: this.SellerInfo.videoCodeHd

                  };
                  var url = "/IPTVEMall/admin/seller/edit-seller";   
                  var denotation = "保存成功";             
              }

              this.$http.post(url,data)
                .then((response) => {
                    if (response.data.resultCode === resultCode.SUCCESS) {
                        //商品新建完成后，提示并跳回列表页，商品编辑完成后，只提示
                         if(this.sid < 0 ){
                            this.$message.success(denotation);
                            this.$router.push("/crm/sellers");
                         }else{
                            this.$message.success(denotation);
                            this.$router.push("/crm/sellers");
                         }
                         
                    }else{
                        apiCallback.success(response, this.$message);
                        //this.$message.error('操作失败：'+response.data.resultMsg);
                    }
                },(response) => {
                    apiCallback.error(response);
                })

          },
          
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