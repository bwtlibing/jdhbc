<template>
    <div>
        <bread-crumbs :bread-crumbs="dataForBreadCrumbs"></bread-crumbs>
        <div class="content-container">
            <el-row :gutter="20">
                <el-col :span="3" class="text-label">手机号码：</el-col>
                <el-col :span="4">
                    <el-input
                        v-model="queryParams.phone">
                    </el-input>
                </el-col>
                <el-col :span="3" class="text-label">IPTV用户ID：</el-col>
                <el-col :span="4">
                    <el-input
                        v-model="queryParams.tvUserId">
                    </el-input>
                </el-col>
                <el-col :span="2" class="text-label">购次：</el-col>
                <el-col :span="4">
                    <el-select v-model="queryParams.buyCount" placeholder="全部" :clearable="true">
                        <el-option label="0" value="0"></el-option>
                        <el-option label="1+" value="1"></el-option>
                        <el-option label="2+" value="2"></el-option>
                        <el-option label="3+" value="3"></el-option>
                        <el-option label="4+" value="4"></el-option>
                        <el-option label="5+" value="5"></el-option>
                        <el-option label="10+" value="10"></el-option>
                        <el-option label="20+" value="20"></el-option>
                        <el-option label="50+" value="50"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" class="query-user">
                    <el-button class="button" type="primary" @click="queryUser(false)">筛选</el-button>
                </el-col>
            </el-row>
            <table class="emall-table" style="margin-top:20px;">
                <thead>
                    <tr class="head-row">
                        <th style="width:10%;">ID</th>
                        <th style="width:12%;">手机号码</th>
                        <th style="width:13%;">IPTV用户ID</th>
                        <th style="width:10%;">购次</th>
                        <th style="width:12%;">消费金额</th>
                        <th style="width:10%;">收藏商品数</th>
                        <th style="width:18%;">最近下单时间</th>
                        <th style="width:15%;">操作</th>
                    </tr>
                </thead>
                <tbody v-for="uitem in userList">
                    <tr class="content-row" >
                        <td>{{uitem.id}}</td>
                        <td>{{uitem.phone}}</td>
                        <td>{{uitem.tvUserId}}</td>
                        <td>{{uitem.buyCount}}</td>
                        <td>{{uitem.totalOrderAmount}}</td>
                        <td>{{uitem.collectCount}}</td>
                        <td>{{uitem.lastSubmitOrderTime}}</td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
            <a class="btn-link more" v-show="hasMoreUser" @click="queryUser(true)">更多</a>
        </div>
    </div>
</template>

<script>
import BreadCrumbs from '../base/BreadCrumbs'
import { resultCode, apiCallback } from '../../utils/common'

export default {
    name: 'CrmUsers',
    components: {
        BreadCrumbs,
    },
    data () {
        return {
            dataForBreadCrumbs: [
                '商户系统', '用户管理'
            ],
            queryParams: {
                phone: '',
                tvUserId: '',
                buyCount: '',
                pageNum: 1,
                pageSize: 20,
            },
            hasMoreUser: true,
            userList: [],
        }
    },
    created(){
        this.routeChange();
    },
    watch: {
        '$route': 'routeChange',
        'queryParams.phone': 'routeChange',
        'queryParams.tvUserId': 'routeChange',
        'queryParams.buyCount': 'routeChange',
    },
    methods: {
        routeChange() {
             this.queryUser();
          },
        queryUser(more) {
            //alert("hhh");
            if(more){
                this.queryParams.pageNum = this.queryParams.pageNum*1+1;
            }
            var url = "/IPTVEMall/admin/order/user-manager?page_num="+this.queryParams.pageNum+"&page_size="+this.queryParams.pageSize;
            if(this.queryParams.phone!=null && this.queryParams.phone != ''){
                url += "&phone="+this.queryParams.phone;
            }
            if(this.queryParams.tvUserId != null && this.queryParams.tvUserId != ''){
                url += "&tvid="+this.queryParams.tvUserId;
            }
            if(this.queryParams.buyCount!= null && this.queryParams.buyCount != ''){
                url+= "&buy_count="+this.queryParams.buyCount;
            }

            //var url = "/IPTVEMall/admin/order/user-manager?"+"page_num="+ this.queryParams.pageNum +"&page_size="+ this.queryParams.pageSize +"&phone="+1+"&buy_count=-1";
             this.$http.get(url)
                .then((response) => {
                    
                    if (response.data.resultCode === resultCode.SUCCESS) {
                        this.userList = response.data.data.pageData;
                        
                        if(this.queryParams.pageNum == response.data.data.totalPage){
                            this.hasMoreUser = false;
                        }
                    } else {
                        apiCallback.success(response.data, this.$message);
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

.text-label {
    line-height: 40px;
    text-align: right;
}

.query-user .button {
    float: right;
}

.more {
    display: inline-block;
    margin: 10px 0;
}
</style>