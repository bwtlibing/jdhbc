<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>

        <div class="content-container">
            <!--
              <el-row>
                  <el-col :span="3">
                      <el-button class="button" type="primary" size="medium" v-if="on_sale == true">出售中</el-button>
                      <el-button class="button"  size="medium" v-else-if="on_sale == false" @click="on_sale=true">出售中</el-button>
                  </el-col>
                  <el-col :span="3">
                       <el-button class="button" type="primary" size="medium" v-if="on_sale == false" >仓库中</el-button>
                       <el-button class="button"  size="medium" v-else-if="on_sale == true" @click="on_sale=false">仓库中</el-button>
                  </el-col>
              </el-row>

              <el-row>
              &nbsp;
              </el-row>
               -->
            <el-row :span="20">
                <el-col :span="7">
                    <el-select v-model="category_id"  filterable clearable >
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

                <el-col :span="6">
                    <el-input v-model="keyword" placeholder="搜索" size= "medium"></el-input>
                </el-col>
                <el-col :span="2">
                    &nbsp;
                </el-col>
                <el-col :span="6">

                    <router-link :to="'/emall/productedit/-1'" class="btn-link" target="_blank"  >
                        <el-button  :to="'/emall/productedit/-1'" style="float:right" class="button" type="primary"  size="medium" >发布商品</el-button>
                    </router-link>
                </el-col>
            </el-row>

            <div style="margin-top:20px;">
                <el-tabs v-model="onSaleTab" type="card" @tab-click="tabOnSale">
                    <el-tab-pane label="出售中" name="ons"></el-tab-pane>
                    <el-tab-pane label="仓库中" name="offs"></el-tab-pane>
                </el-tabs>
            </div>
            <table class="emall-table">
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
                <tbody >
                <tr v-for="productItem in ProductList" class="content-row">
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

                        <a class="btn-link" style="margin-left:22px" v-if="productItem.onTop == true" @click="cancelTop($event,productItem)" v-bind:pid="productItem.id">取消置顶</a>
                        <a class="btn-link" style="margin-left:25px" v-if="productItem.onTop == false" @click="setTop($event, productItem)"  v-bind:pid="productItem.id">置顶</a>
                        <a class="btn-link"></a>
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
    name: 'EMallProducts',
    components: {
        BreadCrumbs,
    },
    data () {
        return {
            page_num: '1',
            page_size: '20',
            keyword: '',
            on_sale: true,
            onSaleTab: 'ons',
            category_id: '',
            dataForBreadCrumbs: [
                '翼商城管理', '商品管理'
            ],
            queryParams: {
                page: '',
                area: '',
                type: '',
                status: '',
            },
            options: [],

            dataForRecommendationDialog: {
                visible: false,
                page: '',
                area: '',
                type: 'image',
                videoCode: '',
                videoCodeBq: '',
                contentType: '',
                contentIdOrUrl: '',
                position: '',
                description: '',
                imgUrl: '',
            },

            ProductList: [],
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    created(){
        sessionStorage.clear();
        this.routeChange();
    },
    watch: {
        '$route': 'routeChange',
        'category_id': 'resetProductList',
        'keyword': 'resetProductList'
    },
    methods:{
          routeChange() {
              console.log('')
            this.getCategory();
            this.getProductList();
          },
          resetProductList(){
            this.page_num = 1;
            this.ProductList = [];
             $('#more').show();
            this.getProductList();
          },
          getProductList(){

                var url = "/IPTVEMall/admin/product/list?page="+this.page_num+"&on_sale="+this.on_sale+"&category_id="+this.category_id+"&keyword="+this.keyword+"&limit="+this.page_size;
                this.$http.get(url)
                .then((response) => {
                    
                    if (response.data.resultCode === resultCode.SUCCESS) {
                        if(response.data.data.length < this.page_size){
                                
                                $('#more').hide();
                        }
                        //this.ProductList = response.data.data;
                        this.ProductList = this.ProductList.concat(response.data.data);
                        /*
                        for(var i = 0; i < response.data.data.length; i++){
                            this.ProductList.push(response.data.data[i]);
                        }
                        **/
                        //this.ProductList.concat(response.data.data);
                        
                        //temp.concat(response.data.data);
                        //alert("tes"+temp.length);
                        //alert(JSON.stringify(this.ProductList ));
                        
                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
          },
          setTop(event,productItem){
                //alert("setontop");
                var pid = event.currentTarget.getAttribute("pid");
                var url ="/IPTVEMall/admin/product/set-on-top?product_id="+pid+"&on_top=true";
                
                        this.$confirm('此操作将置顶该商品, 是否继续?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                                    this.$http.post(url)
                                    .then((response) => {
                                        
                                        if (response.data.resultCode === resultCode.SUCCESS) {
                                            productItem.onTop = true; 
                                            
                                        } else {
                                            apiCallback.success(response.data, this.$message);
                                        }
                                    },(response) => {
                                        apiCallback.error(response);
                                    })    ; 

                            }).catch(() => {
                                      
                            });


          },
          cancelTop(event,productItem){
            //alert("canceltop");
                var pid = event.currentTarget.getAttribute("pid");
                var url ="/IPTVEMall/admin/product/set-on-top?product_id="+pid+"&on_top=false";
                this.$confirm('此操作将取消该商品置顶, 是否继续?', '提示', {
                              confirmButtonText: '确定',
                              cancelButtonText: '取消',
                              type: 'warning'
                            }).then(() => {
                                    this.$http.post(url)
                                    .then((response) => {
                                        
                                        if (response.data.resultCode === resultCode.SUCCESS) {
                                            productItem.onTop = false; 
                                            
                                        } else {
                                            apiCallback.success(response.data, this.$message);
                                        }
                                    },(response) => {
                                        apiCallback.error(response);
                                    })    ; 

                            }).catch(() => {
                                      
                            });
                
          },
          toCreate(){
             //sessionStorage.setItem("newItem", "true");
            
             this.$router.push('/emall/productedit/-1');//你定义的一个路由模块
          },
          toInfo(event){
            var pid = event.currentTarget.getAttribute("pid");
            //sessionStorage.setItem("pid", pid)
            this.$router.push('/emall/productinfo/'+pid);//你定义的一个路由模块
             //window.open('/emall/productinfo/'+pid, '_blank');
          },
          toEdit(event){
            var pid = event.currentTarget.getAttribute("pid");
            
            this.$router.push('/emall/productedit/'+pid);//你定义的一个路由模块
          },
          queryMore(){
             this.page_num = this.page_num*1 + 1;
             
             this.getProductList();
          },
          tabOnSale(tab, event){
            if(this.onSaleTab == "offs"){
                this.on_sale = false;
            }else{
                this.on_sale = true;
            }
            this.resetProductList();
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
          }


    },
}
</script>









<style scoped>
a.btn-link{
    color: #1E70BB;
}
.content-container {
    background-color: white;
    margin-top: 20px;
    padding: 20px;
}


.add-recommendation .button {
    float: right;
}

.emall-table td.image-and-description {
    padding: 10px 20px;
    text-align: left;
    vertical-align: middle;
}

.image-and-description img {
    height: 70px;
    width: 70px;
    vertical-align: middle;
}

.image-and-description a {
    vertical-align: middle;
    display: inline-block;
    width: 250px;
    margin-left: 10px;
}
.image-and-description a .pro_name{
    color: #169BD5;
    margin-top: 0;
}
.pro_name{
    color: #169BD5;
    margin-top: 0;

}
.image-and-description a .pro_price{
    color: #FF9900;
}
.pro_price{
    color: #FF9900;
    margin-top: 5px;
}
.image-and-description a .pro_state{
    color: #FF0000;
}
.pro_state{
    color: #FF0000;
    margin-top: 5px;
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
</style>