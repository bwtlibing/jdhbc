<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="content-container">
            <div style="margin-bottom:20px">
                <span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';font-weight:bold;font-style:normal;font-size:32px">商品详情</span>

                <el-button type="" @click="toDelete()" style="float:right;margin-left:30px;height:45px; width:90px">删 除</el-button>

                <router-link :to="'/emall/productedit/'+ this.pid" class="btn-link" target="_blank">
                    <el-button type="primary"  style="float:right;height:45px;width:90px">编辑</el-button>
                </router-link>
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
                                <td style="border: 0 none" class="product-name-hd">商品名称：</td>
                                <td style="border: 0 none" class="product-name"> {{ProductInfo.name}}</td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品类别：</td>
                                <td style="border: 0 none">{{ProductInfo.category.name}}</td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">所属商家：</td>
                                <td style="border: 0 none" >
                                    <img v-bind:src="ProductInfo.seller.image" class="store_img" v-if="ProductInfo.seller!=null">
                                    <div v-if="ProductInfo.seller!=null">
                                        {{ProductInfo.seller.name}}
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">所属生态馆：</td>
                                <td style="border: 0 none" >
                                    <img v-bind:src="ProductInfo.ecologicalHallBrief.ecoTopicImage" class="store_img" v-if="ProductInfo.ecologicalHallBrief!=null">
                                    <div v-if="ProductInfo.seller!=null">
                                        {{ProductInfo.ecologicalHallBrief.name}}
                                    </div>

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none;vertical-align: middle">销售状态：</td>
                                <td style="border: 0 none">
                                    <span class="state_notation" v-if="ProductInfo.onSale==true">上架中</span>
                                    <el-button type="primary" v-if="ProductInfo.onSale==true" @click="setOffSale(ProductInfo)">下架</el-button>
                                    <span class="state_notation1" v-if="ProductInfo.onSale==false">仓库中</span>
                                    <el-button type="primary" v-if="ProductInfo.onSale==false" @click="setOnSale(ProductInfo)">上架</el-button>


                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">创建时间：</td>
                                <td style="border: 0 none">{{ProductInfo.createTime|formatDate}}</td>
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
                            <tr>
                                <td style="border: 0 none; vertical-align: middle;">价格：</td>

                                <td style="border: 0 none">
                                    <span style="margin-right: 30px" >商城价：<b>{{ProductInfo.realPrice}}</b></span>
                                    <span style="margin-right: 30px">市场参考价：<b>{{ProductInfo.marketPrice}}</b></span>

                                    <el-button type="primary" @click="openPrice">设置</el-button>

                                    <el-dialog title="编辑价格" :visible.sync="dialogFormVisiblePrice" width="700px;" style="margin-top: 5vh" >
                                        <el-form style="width:700px">
                                            商城价:<el-input v-model="realPrice" placeholder="商城价" style="width:210px;  margin-right:50px"></el-input>
                                            市场参考价:<el-input v-model="marketPrice" placeholder="市场参考价" style="width:210px; "></el-input>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer" >
                                            <!--
                                            dialogFormVisibleBond = false
                                            -->
                                            <el-button @click="dialogFormVisiblePrice=false">取 消</el-button>
                                            <el-button type="primary" @click="setPrice()">确 定</el-button>
                                        </div>
                                    </el-dialog>

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品图：</td>
                                <td style="border: 0 none; text-align:left" >
                                    <img v-bind:src="imageItem" class="store_img"  v-for="imageItem in ProductInfo.images">

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品主图：</td>
                                <td style="border: 0 none; text-align:left">
                                    <img v-bind:src="ProductInfo.mainImage" class="store_img">

                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品视频：</td>
                                <td style="border: 0 none;  text-align:left">{{ProductInfo.videoCode}}</td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品视频(高清)：</td>
                                <td style="border: 0 none;  text-align:left">{{ProductInfo.videoCodeHd}}</td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品简介：</td>
                                <td style="border: 0 none; text-align:left"> {{ProductInfo.description}}</td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商品详情：</td>
                                <td style="border: 0 none; text-align:left">

                                    {{ProductInfo.detail}}


                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="content-row">
                    <td class="image-and-description denotation">
                        优惠折扣活动

                    </td>

                    <td>
                        <table class="basic-info-tb" style="border:0 none">
                            <tr>
                                <td style="border: 0 none" valign="top">单品优惠：</td>
                                <td style="border: 0 none; text-align: left" align="left" >
                                    <div style="float:left">
                                        <el-button type="danger" plain v-if=" ProductInfo.discount!= null && ProductInfo.discount.open==true"
                                        >{{ProductInfo.discount.discountName}}</el-button>

                                    </div>
                                    <div v-if="ProductInfo.discount!= null && ProductInfo.discount.open==true">
                                        <br/> <br/><br/>
                                    </div>
                                    <div>
                                        <el-button type="primary" @click="openDiscount">设置</el-button>
                                    </div>

                                    <el-dialog title="编辑优惠" :visible.sync="dialogFormVisibleBond" width="40%" :before-close="cancelBond">
                                        <el-form style="width:500px">
                                            <span>商品价格：￥{{(ProductInfo.realPrice/100).toFixed(2)}}</span>
                                            <br/> <br/>
                                            <span>优惠类型：</span>
                                            <el-radio-group v-model="radio2" @change="changeRadio2">
                                                <el-radio :label="-1">无优惠</el-radio>
                                                <el-radio :label="0">减免优惠</el-radio>
                                                <el-radio :label="1">折扣优惠</el-radio>
                                            </el-radio-group>
                                            <br/> <br/>
                                            <span v-if="this.radio2 >= 0">优惠名称：</span>
                                            <el-input v-if="this.radio2 >= 0" style="width:300px" placeholder="不超过10个字" v-model="dName" id="dn"></el-input>
                                            <br/><br/>
                                            <span v-if="this.radio2 == 0">减免金额：</span>
                                            <span v-else-if="this.radio2 == 1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 折扣：</span>
                                            <el-input v-if="this.radio2 == 0" style="width:300px"  placeholder="减免金额（以元为单位）不小于0" v-model="dAmount" id="dA0"></el-input>
                                            <el-input  v-if="this.radio2 == 1" style="width:300px"  placeholder="折扣取值1-99" v-model="dAmount" id="dA1"></el-input>
                                            <br/>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <!--
                                            dialogFormVisibleBond = false
                                            -->
                                            <el-button @click="cancelBond()">取 消</el-button>
                                            <el-button type="primary" @click="setDiscount()">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none" valign="top">支付补贴：</td>
                                <td style="border: 0 none; text-align: left" align="left" class="last-td">
                                    <div  style="float:left;  display:block" v-for="pitem in ProductInfo.payAllowances">

                                        <el-button type="danger" plain  v-if="pitem.open == true" style="margin-right:20px">
                                            <div v-if="pitem.payment==0" >
                                                微信支付减免￥{{(pitem.allowance/100).toFixed(2)}}元
                                            </div>
                                            <div v-else-if="pitem.payment==1">
                                                支付宝减免￥{{(pitem.allowance/100).toFixed(2)}}元
                                            </div>
                                            <div v-else-if="pitem.payment==2" >
                                                翼支付减免￥{{(pitem.allowance/100).toFixed(2)}}元
                                            </div>

                                        </el-button>

                                    </div>
                                    <div v-if="ProductInfo.payAllowances.length!=0 && (ProductInfo.payAllowances[0].open==true || ProductInfo.payAllowances[1].open==true || ProductInfo.payAllowances[2].open==true)">
                                        <br/> <br/><br/>
                                    </div>

                                    <div style="display:block; width:200px">
                                        <el-button type="primary" @click="dialogFormVisibleAllowance=true">设置</el-button>
                                    </div>

                                </td>


                            </tr>

                        </table>
                    </td>
                </tr>
                <tr class="content-row">
                    <td class="image-and-description denotation">
                        商品数据

                    </td>

                    <td>
                        <table class="basic-info-tb" style="border:0 none">
                            <tr>
                                <td style="border: 0 none">访问量：</td>
                                <td style="border: 0 none; text-align: left" align="left" >
                                    {{ProductInfo.pageView}}
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none; vertical-align: middle">总销量：</td>
                                <td style="border: 0 none; text-align: left" align="left" >
                                    <span id="svolu">{{ProductInfo.salesVolumn}}</span>

                                    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>

                                    <span id="sfvolu">{{ProductInfo.salesVolumnPseudo}}</span>
                                    <span> (显示销量) </span>
                                    <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                                    <el-button type="primary" @click="dialogFormVisibleRealVol=true" id="set_btn">设置</el-button>

                                </td>
                            </tr>

                            <el-dialog title="编辑显示销量" :visible.sync="dialogFormVisibleRealVol" width="40%">
                                <el-form style="width:500px">
                                    <span>显示销量：</span>

                                    <el-input  style="width:300px" placeholder="显示销量" v-model="salesVolumnPseudo"> {{ProductInfo.salesVolumnPseudo}} </el-input>



                                </el-form>
                                <div slot="footer" class="dialog-footer">

                                    <el-button @click="dialogFormVisibleRealVol = false">取 消</el-button>
                                    <el-button type="primary" @click="saveSalesVolumnPseudo()">确 定</el-button>
                                </div>
                            </el-dialog>

                            <tr>
                                <td style="border: 0 none">收藏量：</td>
                                <td style="border: 0 none; text-align: left" align="left" >
                                    {{ProductInfo.collectionAmount}}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <el-dialog title="编辑支付补贴" :visible.sync="dialogFormVisibleAllowance" width="40%" :before-close="cancelAllowance">

            <table class="zf-allow-tb">
                <tr>
                    <td>
                        微信支付：
                    </td>
                    <td>
                        <el-radio-group v-model="radio_allow_wx">
                            <el-radio  :label="0">关闭补贴</el-radio>
                            <el-radio  :label="1">开启补贴</el-radio>
                        </el-radio-group >
                    </td>
                </tr>
                <tr v-if="this.radio_allow_wx == 1">
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        <el-input  style="width:200px" placeholder="补贴金额为正数（元）" v-model="allow_wx"></el-input>
                    </td>

                </tr>

                <tr>
                    <td>
                        支付宝支付：
                    </td>
                    <td>
                        <el-radio-group v-model="radio_allow_zfb">
                            <el-radio  :label="0">关闭补贴</el-radio>
                            <el-radio  :label="1">开启补贴</el-radio>
                        </el-radio-group>
                    </td>
                </tr>
                <tr v-if="this.radio_allow_zfb == 1" >
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        <el-input style="width:200px" placeholder="补贴金额为正数（元）" v-model="allow_zfb" ></el-input>
                    </td>

                </tr>
                <tr>
                    <td>
                        翼支付：
                    </td>
                    <td>
                        <el-radio-group v-model="radio_allow_yzf">
                            <el-radio  :label="0">关闭补贴</el-radio>
                            <el-radio  :label="1">开启补贴</el-radio>
                        </el-radio-group>
                    </td>
                </tr>
                <tr v-if="this.radio_allow_yzf == 1">
                    <td>
                        &nbsp;
                    </td>
                    <td>
                        <el-input  style="width:200px" placeholder="补贴金额为正数（元）" v-model="allow_yzf"></el-input>

                    </td>

                </tr>
            </table>
            <div slot="footer" class="dialog-footer">
                <!--

                 dialogFormVisibleAllowance = false
                -->
                <el-button @click="cancelAllowance()">取 消</el-button>
                <el-button type="primary" @click="setAllowance()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import BreadCrumbs from '../base/BreadCrumbs'
import { orderValidator } from '../../utils/dataValidator.js'
import { resultCode, apiCallback, formatDate} from '../../utils/common'


export default {
    name: 'EMallProductInfo',
    components: {
        BreadCrumbs,
    },
    data () {return {
            pid:'',
            dialogVisible: false,
            dialogFormVisiblePrice:false,
            dialogFormVisibleBond:false,
            dialogFormVisibleAllowance:false,
            dialogFormVisibleRealVol: false,
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
            realPrice:'0',
            marketPrice:'0',
            dataForBreadCrumbs: [
                '翼商城管理', '商品详情'
            ],
            queryParams: {
                page: '',
                area: '',
                type: '',
                status: '',
            },
            options: [{
                value: '选项1',
                label: '所有类别'
            }, {
                value: '选项2',
                label: '精品推荐'
            }, {
                value: '选项3',
                label: '本地特产'
            }, {
                value: '选项4',
                label: '日常用品'
            }, {
                value: '选项5',
                label: '粮油食品'
            }],

            dataForRecommendationDialog: {
                visible: false,
                page: '',
                area: '',
                type: 'image',
                videoCode: '',
                videoCodeHd: '',
                contentType: '',
                contentIdOrUrl: '',
                position: '',
                description: '',
                imgUrl: '',
            },
            back_allow_wx: '',
            back_allow_zfb: '',
            back_allow_yzf: '',
            back_dAmount: '',
            back_dName:'',
            ProductInfo: {
              name: "",
              category: {

              },
              seller: {

              },
              onSale: '',
              createTime: '',
              realPrice: '',
              marketPrice: '',
              images: [
              ],
              mainImage: "",
              videoCode: "",
              videoCodeHd: "",
              description: "",
              detail: "",
              discount: {

              },
              payAllowances: [

              ],
              pageView: '',
              salesVolumn: '',
              salesVolumnPseudo: '',
              collectionAmount: '',
              ecologicalHallBrief:{}

            },
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    created(){
        //alert("create");
        this.pid =  this.$route.params.pid;
        
        this.routeChange();
    },
    watch: {
        '$route': 'routeChange',
        
    },
    methods:{

          routeChange() {
            
            //this.pid = this.$route.query.pid;
            this.pid = this.$route.params.pid;
            //alert(this.pid);
            this.dataForBreadCrumbs=['翼商城管理', '商品详情: '+this.pid];
            this.getProductInfo();
          },
          changeRadio2(){
            //alert("radio2");
            if(this.radio2 == 0){
              $('#dn').val('');
              $('#dA0').val('');
              $('#dA1').val('');
            }else if(this.radio2 == 1){
              $('#dn').val('');
              $('#dA0').val('');
              $('#dA1').val('');
            }
          },
          getProductInfo(){
             //this.pid = sessionStorage.getItem("pid");
             //this.pid =41;

             var url = "/IPTVEMall/admin/product/detail?product_id="+this.pid;
             this.$http.get(url)
                .then((response) => {
                    
                    if (response.data.resultCode === resultCode.SUCCESS) {

                        this.ProductInfo = response.data.data;
                        this.salesVolumnPseudo = this.ProductInfo.salesVolumnPseudo;
                        this.realPrice=this.ProductInfo.realPrice;
                        this.marketPrice=this.ProductInfo.marketPrice;
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
                           this.back_dName = this.dName;
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
                        
                       
                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
          },
          
          saveSalesVolumnPseudo(){
              //var salesvolume = document.getElementById("volu").value;
              //var fsalesvolume = document.getElementById("fvolu").value;
              //event.currentTarget.style = "display:none";
                       
              var url = "/IPTVEMall/admin/product/set-sales-volumn?product_id="+this.pid+"&sales_volumn="+this.salesVolumnPseudo;
             this.$http.post(url)
                .then((response) => {
                    
                    if (response.data.resultCode === resultCode.SUCCESS) {
                       
                        ///
                        this.$message.success("成功修改显示销量");
                        this.ProductInfo.salesVolumnPseudo = this.salesVolumnPseudo;
                        this.dialogFormVisibleRealVol = false;

                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })

              
          },
          openPrice (){

              this.dialogFormVisiblePrice=true;
          },
          setPrice (){/*设置价格*/

              let url="/IPTVEMall/admin/product/edit-price?product_id="+this.pid+'&real_price='+this.realPrice+'&market_price='+this.marketPrice;

              this.$http.post(url)
                  .then((response)=>{
                   if(response.data.resultCode===resultCode.SUCCESS){

                       this.dialogFormVisiblePrice=false;
                       this.routeChange();
                   }else {
                       apiCallback.success(response.data,this.$message);
                   }
                  },(response)=>{
                      console.log(response);
                    apiCallback.error(response);
                  });


          },
          setOnSale(pitem){


             var url = "/IPTVEMall/admin/product/set-on-sale?product_id="+this.pid+"&on_sale=true";
             //alert(url);
             this.$confirm('此操作将上架该商品, 是否继续?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                                    this.$http.post(url)
                                      .then((response) => {
                                         if (response.data.resultCode === resultCode.SUCCESS) {
                                            //this.routeChange();
                                            pitem.onSale = true;

                                         }else{
                                            apiCallback.success(response.data, this.$message);
                                         }
                                      },(response) =>{
                                          apiCallback.error(response);
                                      });

                            }).catch(() => {
                                      
                            });

          },
          setOffSale(pitem){

             var url = "/IPTVEMall/admin/product/set-on-sale?product_id="+this.pid+"&on_sale=false";
             this.$confirm('此操作将下架该商品, 是否继续?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                                    this.$http.post(url)
                                      .then((response) => {
                                         if (response.data.resultCode === resultCode.SUCCESS) {
                                            //this.routeChange();
                                            pitem.onSale = false;
                                         }else{
                                            apiCallback.success(response.data, this.$message);
                                         }
                                      },(response) =>{
                                          apiCallback.error(response);
                                      });

                            }).catch(() => {
                                      
                            });

          },
          setDiscount(){
              var url = "/IPTVEMall/admin/product/edit-discount";
              if(this.radio2 <0){
                  this.$http.post(url, {
                      productId: this.pid,
                      open: false,

                  })
                  .then((response) => {
                     if (response.data.resultCode === resultCode.SUCCESS) {
                        this.dialogFormVisibleBond = false;
                        this.routeChange();

                     }else{
                        apiCallback.success(response.data, this.$message);
                     }
                  },(response) =>{
                      apiCallback.error(response);
                  });
                  return;
              }
              var dvalue = this.dAmount;
              if(this.radio2 == 1){
                 if(this.dName.length > 10){
                    this.$message.error("优惠名称长度不能大于10");
                    //this.dName = this.back_dName;
                    return;
                  }
                  if(!(this.dAmount>=1 && this.dAmount <=99)){
                    this.$message.error("折扣取值为1~99");
                    //this.dAmount = this.back_dAmount;
                    
                    return;
                  }
                  //if(this.dAmount/100* this.ProductInfo.realPrice - this.)
                  var back_dAmount = this.dAmount;
                  if(this.radio_allow_wx == 1  &&  this.dAmount/100 * this.ProductInfo.realPrice - this.allow_wx*100.0 < 0 ){

                      this.$message.error("折扣和微信补贴累加后商品价格不能为负");
                      //this.dAmount = this.back_dAmount;
                      return;
                  }
                  if(this.radio_allow_zfb == 1  &&  this.dAmount/100 * this.ProductInfo.realPrice - this.allow_zfb*100.0 < 0 ){
                      this.$message.error("折扣和支付宝补贴累加后商品价格不能为负");
                      //this.dAmount = this.back_dAmount;
                      return;
                  }
                  if(this.radio_allow_yzf == 1  &&  this.dAmount/100 * this.ProductInfo.realPrice - this.allow_yzf*100.0 < 0 ){
                      this.$message.error("折扣和翼支付补贴累加后商品价格不能为负");
                      //this.dAmount = this.back_dAmount;
                      return;
                  }
              }else if(this.radio2 == 0){
                  if(this.dName.length > 10){
                    this.$message.error("优惠名称长度不能大于10");
                    return;
                  }
                  if(this.dAmount*100 >= this.ProductInfo.realPrice){
                      this.$message.error("减免优惠金额过大，商品价格为正数");
                      //this.dAmount = this.back_dAmount;
                      return;
                  }

                  if(this.radio_allow_wx == 1  &&  this.ProductInfo.realPrice -this.dAmount*100 - this.allow_wx*100.0 < 0 ){
                          this.$message.error("减免优惠和微信补贴累加后商品价格不能为负");
                          //this.dAmount = this.back_dAmount;
                          return;
                      }
                  if(this.radio_allow_zfb == 1  &&   this.ProductInfo.realPrice -this.dAmount*100 - this.allow_zfb*100.0 < 0 ){
                      this.$message.error("减免优惠和支付宝补贴累加后商品价格不能为负");
                      //this.dAmount = this.back_dAmount;
                      return;
                  }
                  if(this.radio_allow_yzf == 1  &&   this.ProductInfo.realPrice -this.dAmount*100 - this.allow_yzf*100.0 < 0 ){
                      this.$message.error("减免优惠和翼支付补贴累加后商品价格不能为负");
                      //this.dAmount = this.back_dAmount;
                      return;
                  }
                  dvalue = this.dAmount * 100.0;
              }
              
              this.$http.post(url, {
                  productId: this.pid,
                  open: true,
                  type: this.radio2,
                  name: this.dName,
                  value: dvalue,

              })
              .then((response) => {
                 if (response.data.resultCode === resultCode.SUCCESS) {
                    this.dialogFormVisibleBond = false;
                    this.routeChange();
                 }else{
                    apiCallback.success(response.data, this.$message);
                 }
              },(response) =>{
                  apiCallback.error(response);
              });
          },
          cancelBond(){
              this.dName = this.back_dName;
              this.dAmount = this.back_dAmount; 
              //alert(this.dAmount);
              this.dialogFormVisibleBond = false;
          },
          openDiscount(){
             //alert(this.dName);
             if(this.radio2 == 0){
              $('#dn').val(this.dName);
              $('#dA0').val(this.dAmount);
              $('#dA1').val('');
            }else if(this.radio2 == 1){
              $('#dn').val(this.dName);
              $('#dA0').val('');
              $('#dA1').val(this.dAmount);
            }
            this.dialogFormVisibleBond = true;
          },
          cancelAllowance(){
              this.allow_wx = this.back_allow_wx;
              this.allow_zfb = this.back_allow_zfb;
              this.allow_yzf = this.back_allow_yzf;
              this.dialogFormVisibleAllowance = false;
          },
          setAllowance(){
              var url = "/IPTVEMall/admin/product/edit-pay-allowance";
              var jdata = {
                productId: this.pid,
                payAllowances: [
                          {
                            payment: 0,
                            open: (this.radio_allow_wx == 1),
                            allowance: this.allow_wx*100.0,
                          },
                          {
                            payment: 1,
                            open: (this.radio_allow_zfb == 1),
                            allowance: this.allow_zfb*100.0,
                          },
                          {
                            payment: 2,
                            open: (this.radio_allow_yzf == 1),
                            allowance: this.allow_yzf*100.0,
                          },
                      ],
              };
              
              if(  this.radio_allow_wx == 1  &&  (this.allow_wx.length == 0 || isNaN(this.allow_wx) || this.allow_wx<=0 )){
                  this.$message.error("微信补贴应为正数");
                  //this.allow_wx = this.back_allow_wx;
                  return;
              }
              if(  this.radio_allow_zfb == 1  &&  (this.allow_zfb.length == 0 || isNaN(this.allow_zfb) || this.allow_zfb<=0 )){
                  this.$message.error("支付宝补贴应为正数");
                  //this.allow_zfb = this.back_allow_zfb;
                  return;
              }
              if(  this.radio_allow_yzf == 1  &&  (this.allow_yzf.length == 0 || isNaN(this.allow_yzf) || this.allow_wx<=0 )){
                  this.$message.error("翼支付补贴应为正数");
                  //this.allow_yzf = this.back_allow_yzf;
                  return;
              }

              if( this.radio_allow_wx == 1  && this.ProductInfo.realPrice <= this.allow_wx*100){
                 this.$message.error("微信补贴不应大于商品价格");
                 //this.allow_wx = this.back_allow_wx;
                  return;
              }
              if(this.radio_allow_zfb == 1  && this.ProductInfo.realPrice <= this.allow_zfb*100){
                 this.$message.error("支付宝补贴不应大于商品价格");
                 //this.allow_zfb = this.back_allow_zfb;
                  return;
              }
              if(this.radio_allow_yzf == 1  &&  this.ProductInfo.realPrice <= this.allow_yzf*100){
                 this.$message.error("翼支付补贴不应大于商品价格");
                  //this.allow_yzf = this.back_allow_yzf;
                  return;
              }
              
              if(this.radio_allow_wx == 1  && this.radio2 == 1 && this.dAmount/100 * this.ProductInfo.realPrice - this.allow_wx*100.0 < 0 ){
                      this.$message.error("折扣和微信补贴累加后商品价格不能为负");
                      //this.allow_wx = this.back_allow_wx;
                      return;
                  }
              if(this.radio_allow_zfb == 1  && this.radio2 == 1 &&  this.dAmount/100 * this.ProductInfo.realPrice - this.allow_zfb*100.0 < 0 ){
                  this.$message.error("折扣和支付宝补贴累加后商品价格不能为负");
                  //this.allow_zfb = this.back_allow_zfb;
                  return;
              }
              if(this.radio_allow_yzf == 1  && this.radio2 == 1 &&  this.dAmount/100 * this.ProductInfo.realPrice - this.allow_yzf*100.0 < 0 ){
                  this.$message.error("折扣和翼支付补贴累加后商品价格不能为负");
                  //this.allow_yzf = this.back_allow_yzf;
                  return;
              }
              if(this.radio_allow_wx == 1  && this.radio2 == 0 &&  this.ProductInfo.realPrice -this.dAmount*100 - this.allow_wx*100.0 < 0 ){
                          this.$message.error("减免优惠和微信补贴累加后商品价格不能为负");
                          //this.allow_wx = this.back_allow_wx;
                          return;
                      }
              if(this.radio_allow_zfb == 1  && this.radio2 == 0 &&   this.ProductInfo.realPrice -this.dAmount*100 - this.allow_zfb*100.0 < 0 ){
                  this.$message.error("减免优惠和支付宝补贴累加后商品价格不能为负");
                  //this.allow_zfb = this.back_allow_zfb;
                  return;
              }
              if(this.radio_allow_yzf == 1  && this.radio2 == 0 &&   this.ProductInfo.realPrice -this.dAmount*100 - this.allow_yzf*100.0 < 0 ){
                  this.$message.error("减免优惠和翼支付补贴累加后商品价格不能为负");
                  //this.allow_yzf = this.back_allow_yzf;
                  return;
              }
              //alert(jdata);
              this.$http.post(url, jdata)
              .then((response) => {
                 if (response.data.resultCode === resultCode.SUCCESS) {
                    this.dialogFormVisibleAllowance = false;
                    this.routeChange();
                 }else{
                    apiCallback.success(response.data, this.$message);
                 }
              },(response) =>{
                  apiCallback.error(response);
              });
          },
          toEdit(){
            this.$router.push("/emall/productedit/"+this.pid);
          },
          toDelete(){


                  var url = "/IPTVEMall/admin/product/delete?product_id="+this.pid;
                  this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                                    this.$http.post(url)
                                        .then((response) => {
                                           if (response.data.resultCode === resultCode.SUCCESS) {
                                              this.$message.success("删除成功");
                                              this.$router.push("/emall/products");
                                           }else{
                                              apiCallback.success(response.data, this.$message);
                                           }
                                        },(response) =>{
                                            apiCallback.error(response);
                                        });

                            }).catch(() => {
                                      
                            });


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
.product-name-hd{
  padding-top: 20px;
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
.basic-info-tb .last-td{
  text-align: left;
  padding-left: 20px;
}
.basic-info-tb tr td:first-child{
    width: 20%;
    text-align: right;
    vertical-align: top;
    //padding-top: 25px;
}

.basic-info-tb tr td:last-child{
    text-align: left;
    padding-left: 20px;
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
.zf-allow-tb tr td{
  border: 0 none;
}
.zf-allow-tb tr td:first-child{
  width: 30%;
  text-align: right;
  border-collapse: collapse;
}
.zf-allow-tb tr td:last-child{
  width: 70%;
}
.zf-allow-tb {
  margin-left: 20%;
}
.more {
    display: inline-block;
    margin: 10px 0;
}
.store_img{
    height: 80px;
    width: 80px;
    margin-right: 20px;
}
.state_notation{
    margin-right: 20px;
    color: #00FF00;
}
.state_notation1{
    margin-right: 20px;
    color: red;
}
</style>