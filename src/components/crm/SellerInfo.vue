
<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="content-container">
            <div style="margin-bottom:20px">
                <span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';font-weight:bold;font-style:normal;font-size:32px">商家详情</span>
                <!--
                <el-button type="" @click="toDelete()" style="float:right;margin-left:30px;height:45px; width:90px">删 除</el-button>
                -->
                <router-link class="btn-link" :to="'/crm/selleredit/'+sid" target="_blank">
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
                                <td style="border: 0 none" class="product-name-hd">商家名称：</td>
                                <td style="border: 0 none" class="product-name"> {{SellerInfo.name}}</td>
                            </tr>

                            <tr>
                                <td style="border: 0 none">商家LOGO：</td>
                                <td style="border: 0 none">
                                    <img :src="SellerInfo.logoImage" class="store_img" />
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">创建时间：</td>
                                <td style="border: 0 none" >
                                    {{SellerInfo.createTime}}
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家简介：</td>
                                <td style="border: 0 none">{{SellerInfo.introduce}}</td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家地址：</td>
                                <td style="border: 0 none">{{SellerInfo.address}}</td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家图：</td>
                                <td style="border: 0 none">
                                    <img :src="imgitem" class="store_img" v-for="imgitem in SellerInfo.images">
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家视频（标清）：</td>
                                <td style="border: 0 none">{{SellerInfo.videoCode}}</td>
                            </tr>
                            <tr>
                                <td style="border: 0 none">商家视频（高清）：</td>
                                <td style="border: 0 none">{{SellerInfo.videoCodeHd}}</td>
                            </tr>


                        </table>
                    </td>
                </tr>

                <tr class="content-row">
                    <td class="image-and-description denotation">
                        商家数据

                    </td>

                    <td>
                        <table class="basic-info-tb" style="border:0 none">
                            <tr>
                                <td style="border: 0 none">访问量：</td>
                                <td style="border: 0 none; text-align: left" align="left" >
                                    {{SellerInfo.pageView}}
                                </td>
                            </tr>
                            <tr>
                                <td style="border: 0 none; vertical-align: middle">总销量：</td>
                                <td style="border: 0 none; text-align: left" align="left" >
                                    {{SellerInfo.sellNum}}

                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>



        <div class="content-container">
            <div style="margin-bottom:20px">
                <span style="font-family:'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';font-weight:bold;font-style:normal;font-size:32px">商家商品</span>
                <!--
                <el-button type="" @click="toDelete()" style="float:right;margin-left:30px;height:45px; width:90px">删 除</el-button>
                <el-button type="primary" @click="toEdit()" style="float:right;height:45px;width:90px">编辑</el-button>
                -->
            </div>
            <el-row :span="20">
                <el-col :span="4">
                    <el-select>
                        <el-option>出售中</el-option>
                        <el-option>仓库中</el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    &nbsp;
                </el-col>
                <el-col :span="4">
                    <el-select v-model="ProductQueryParams.category_id"  filterable clearable >
                        <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    &nbsp;
                </el-col>

                <el-col :span="5" >
                    <el-input v-model="keyword" placeholder="搜索" size= "medium"></el-input>
                </el-col>

                <el-col :span="6" style="float:right">

                    <router-link :to="'/emall/productedit/-1'" class="btn-link" target="_blank"  >
                        <el-button  :to="'/emall/productedit/-1'" style="float:right" class="button" type="primary"  size="medium" >发布商品</el-button>
                    </router-link>
                </el-col>
            </el-row>

            <table class="emall-table" style="margin-top: 20px">
                <thead>
                <tr class="head-row">
                    <th style="width:30%;">商品&nbsp价格</th>
                    <th style="width:12%;">访问量</th>
                    <th style="width:10%;">总销量</th>
                    <th style="width:10%;">类别</th>
                    <th style="width:13%;">创建时间</th>
                    <th style="width:15%;">操作</th>
                </tr>
                </thead>
                <tbody v-for="productItem in ProductList">
                <tr class="content-row">
                    <td class="image-and-description">
                        <div style="float:left">
                            <img  v-bind:src="productItem.productImage">
                        </div>
                        <div style="float:left; width:50%; height:70px">
                            <!--
                                <a class="pro_name" @click="toInfo($event)" :pid="productItem.id"> {{productItem.productName}} </a>
                                -->
                            <router-link :to="'/emall/productinfo/'+productItem.id" class="btn-link" target="_blank">{{productItem.productName}}</router-link>

                            <a class="pro_price"> ￥{{(productItem.price/100).toFixed(2) }} </a>

                            <a class="pro_state" v-if="productItem.onTop == true" :pid="productItem.id"> 置顶 </a>
                        </div>


                        <!--
                        <router-link to="productinfo">
                            <a class="pro_name" @click="toInfo($event)" :pid="productItem.id"> {{productItem.productName}} </a>
                            <a class="pro_price"> ￥{{(productItem.price/100).toFixed(2) }} </a>
                            <a class="pro_state" v-if="productItem.onTop == true" :pid="productItem.id"> 置顶 </a>


                        </router-link>
                        -->
                    </td>
                    <td>{{productItem.pageView}}</td>
                    <td>{{productItem.salesVolumn}}</td>

                    <td>{{productItem.category}}</td>
                    <td>{{
                        productItem.createTime |formatDate
                        }}</td>
                    <td align="center" style="text-align:center">
                        <!--
                         <a class="btn-link" @click="toInfo($event)" v-bind:pid="productItem.id">
                             查看
                         </a>
                         -->
                        <router-link :to="'/emall/productinfo/'+productItem.id" class="btn-link" target="_blank">查看</router-link>
                        <!--
                        <a class="btn-link" @click="toEdit($event)" v-bind:pid="productItem.id" style="margin-left:15px">
                            编辑
                        </a>
                        -->
                        <router-link :to="'/emall/productedit/'+productItem.id" class="btn-link" target="_blank"  style="margin-left:15px" >编辑</router-link>
                        <br/>

                    </td>
                </tr>
                </tbody>
            </table>
            <a class="btn-link more" @click="queryMore()" id="more" >更多</a>




        </div>



    </div>



</template>
<script>
import BreadCrumbs from '../base/BreadCrumbs'
import { orderValidator } from '../../utils/dataValidator.js'
import { resultCode, apiCallback, formatDate} from '../../utils/common'


export default {
    name: 'SellerInfo',
    components: {
        BreadCrumbs,
    },
    data () {return {
            sid:'',
            
            dataForBreadCrumbs: [
                '翼商城管理', '商家详情'
            ],
            queryParams: {
                page: '',
                area: '',
                type: '',
                status: '',
            },


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
            ProductQueryParams: {
                page: 1,
                limit: 10,
                category_id: '',
            },
            ProductList:[],
            productMore: false,
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    created(){
        this.sid =  this.$route.params.sid;
        this.routeChange();
    },
    watch: {
        '$route': 'routeChange',
        
    },
    methods:{

          routeChange() {
            this.sid = this.$route.params.sid;
            //alert(this.pid);
            this.dataForBreadCrumbs=['翼商城管理', '商家: '+this.sid];
            this.getSellerInfo();
            this.getCategory();
            this.getProductList();
          },

          getSellerInfo(){

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
                })
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
          getProductList(){
              var url = "/IPTVEMall/admin/product/list-by-seller?seller_id="+this.sid+"&page="+this.ProductQueryParams.page+"&limit="+this.ProductQueryParams.limit;
              this.$http.get(url)
                .then((response) => {
                    
                    if (response.data.resultCode === resultCode.SUCCESS) {
                       
                        this.ProductList = response.data.data.pageData;
                        if(response.data.data.totalPage == this.ProductQueryParams.page){
                           $('#more').hide();
                        }
                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
          },
          queryMore(){
             this.ProductQueryParams.page = this.ProductQueryParams.page*1.0 + 1;
             this.getProductList();
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