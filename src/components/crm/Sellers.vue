<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="content-container">
            <el-row>
                <el-col :span="6">
                    <el-input
                        v-model="queryParams.searchKeyWord" placeholder="搜索商家">
                         
                    </el-input>

                </el-col>
                <el-col :span="18" class="add-seller">
                <!--
                    <el-button class="button" type="primary" size="medium" @click="showAddSellerDialog()">新建商家</el-button>
                -->
                    <router-link class="btn-link" :to="'/crm/selleredit/-1'" target="_blank">
                        <el-button class="button" type="primary" size="medium" >新建商家</el-button>
                    </router-link>
                </el-col>
            </el-row>
            <table class="emall-table" style="margin-top:20px;">
                <thead>
                    <tr class="head-row">
                        <th style="width:48%;">商家</th>
                        <th style="width:8%;">访问量</th>
                        <th style="width:10%;">商品总销量</th>
                        <th style="width:18%;">创建时间</th>
                        <th style="width:16%;">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="content-row"  v-for="sellerItem in sellerList">
                        <td class="seller-description">
                            <div style="float:left">
                                <img class="seller-logo" :src="sellerItem.logoImage">
                            </div>
                            <div style="float:left; margin-left:20px" >
                                <router-link to="/" target="_blank">{{sellerItem.name}}</router-link>
                                <div class="bestpay-seller" v-if="sellerItem.type == 1">翼支付商家</div>
                            </div>
                        </td>
                        <td>{{sellerItem.pageView}}</td>
                        <td>{{sellerItem.sellNum}}</td>
                        <td>{{sellerItem.createTime}}</td>
                        <td>
                            <router-link class="btn-link" :to="'/crm/sellerinfo/'+sellerItem.id" target="_blank">查看</router-link>
                            <!--
                            <a class="btn-link" @click="showEditSellerDialog()">编辑</a>
                            -->
                            <router-link class="btn-link" :to="'/crm/selleredit/'+sellerItem.id" target="_blank">编辑</router-link>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            <a class="btn-link more" v-show="hasMoreSeller" @click="querySeller(true)">更多</a>
        </div>
    </div>
</template>

<script>
import BreadCrumbs from '../base/BreadCrumbs'
import { resultCode, apiCallback } from '../../utils/common'

export default {
    name: 'CrmSellers',
    components: {
        BreadCrumbs,
    },
    data () {
        return {
            dataForBreadCrumbs: [
                '商户系统', '商家管理'
            ],
            queryParams: {
                searchKeyWord: '',
                pageNum: 1,
                pageSize: 20,
            },
            hasMoreSeller: true,
            sellerList: [],
            searchKeyWord: '',
        }
    },
    created(){
        sessionStorage.clear();
        this.routeChange();
    },
    watch: {
        '$route': 'routeChange',
        'queryParams.searchKeyWord': 'querySeller1',
         
    },
    methods: {
        routeChange() {
            this.querySeller(false);
        },
        querySeller1(){
            this.sellerList = [];
            this.querySeller(false);
        },
        querySeller(more) {
            if(more){
                this.queryParams.pageNum =  this.queryParams.pageNum*1 +1;
            }else{
                this.queryParams.pageNum =  1;
            }
            var url ="/IPTVEMall/admin/seller/query-seller-list?page_num="+this.queryParams.pageNum+"&page_size="+this.queryParams.pageSize;
            if(this.queryParams.searchKeyWord != null && this.queryParams.searchKeyWord.length > 0 ){
                url += "&seller_name="+this.queryParams.searchKeyWord;
            }

            
            this.$http.get(url)
                .then((response) => {
                    
                    if (response.data.resultCode === resultCode.SUCCESS) {
                       
                        if(response.data.data.totalPage == this.queryParams.pageNum|| response.data.data.length < this.page_size){
                                //$('#more').hide();
                                
                                this.hasMoreSeller = false;
                        }
                        //this.ProductList = response.data.data;
                        this.sellerList = this.sellerList.concat(response.data.data.pageData);
                     
                        
                    } else {
                        apiCallback.success(response.data, this.$message);
                    }
                },(response) => {
                    apiCallback.error(response);
                })
        },
        showAddSellerDialog() {
        },
        showEditSellerDialog() {

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

.add-seller .button {
    float: right;
}

.emall-table td.seller-description {
    padding: 10px 20px;
    text-align: left;
}

.seller-logo {
    height: 70px;
    width: 70px;
    vertical-align: top;
}

.seller-logo + div {
    vertical-align: top;
    display: inline-block;
    padding: 5px 0;
    margin-left: 10px;
    width: 280px;
}

.bestpay-seller {
    color: white;
    background-color: #FF9900;
    border-radius: 5px;
    padding: 2px;
    text-align: center;
    width: 65px;
    font-size: 11px;
    margin-top: 5px;
}

.emall-table .btn-link:last-child {
    margin-left: 20px;
}

.more {
    display: inline-block;
    margin: 10px 0;
}

</style>