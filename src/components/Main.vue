<template>
    <div>
        <div class="site-nav">
            <div class="logo-container">
                <img class="logo" src="../assets/logo.png">
            </div>
            <div class="site-name-container">
                <div class="site-name">
                    <div class="big-size">翼商城</div>
                    <div class="small-size">运营管理后台</div>
                </div>
            </div>
            <router-link to="/order" class="module-container" :class="{chosen: module == 'order'}">
                <span>订单系统</span>
                <img src="../assets/arrow_down.png">
            </router-link>
            <router-link to="/emall" class="module-container" :class="{chosen: module == 'emall'}">
                <span>翼商城管理</span>
                <img src="../assets/arrow_down.png">
            </router-link>
            <router-link to="/crm" class="module-container" :class="{chosen: module == 'crm'}">
                <span>商户系统</span>
                <img src="../assets/arrow_down.png">
            </router-link>
            <router-link to="/idc" class="module-container" :class="{chosen : module == 'idc'}">
                <span>数据中心</span>
                <img src="../assets/arrow_down.png">
            </router-link>
            <a class="log-out-container">
                <img src="../assets/log_out_icon.png" style="margin-right: 10px;">
                <span>登出</span>
            </a>
            <a class="user-container">
                <img src="../assets/user_icon.png" style="margin-right: 10px;">
                <span>管理员</span>
            </a>
        </div>
        <div class="nav-sidebar-container">
            <ul class="nav-sidebar">
                <li v-for="route in routeList">
                    <router-link :to="route.link">{{route.name}}</router-link>
                    <div class="chosen-flag"></div>
                </li>
            </ul>
        </div>
        <div class="page-container">
            <router-view
                class="main-container"
                transition
                transition-mode="out-in">
            </router-view>
        </div>
    </div>
</template>

<script>
import { routeMap } from '../utils/common'

export default {
    name: 'Main',
    data () {
        return {
            module: '',
        }
    },
    computed: {
        routeList() {
            if (routeMap[this.module]) {
                return routeMap[this.module];
            }
            return [];
        }
    },
    beforeRouteEnter (to, from, next) {
        var params = to.path.split('/');
        next(vm => {
            vm.module = params[1];
        });
    },
}
</script>

<style scoped>
.site-nav {
    position: fixed;
    left: 0;
    top: 0;
    height: 80px;
    width: 100%;
    background-color: #448ACA;
    z-index: 1000;
}

.logo-container {
    height: 100%;
    background-color: #0E4DAA;
    text-align: center;
    line-height: 80px;
    width: 150px;
    float: left;
}

.logo {
    width: 40px;
    height: 40px;
    vertical-align: middle;
}

.site-name-container {
    height: 100%;
    width: 180px;
    float: left;
}

.site-name {
    margin-left: 35px;
    height: 54px;
    position: relative;
    top: 50%;
    margin-top: -27px;
    color: white;
}

.site-name .big-size {
    font-size: 24px;
}

.site-name .small-size {
    font-size: 17px;
}

.module-container {
    height: 100%;
    float: left;
    line-height: 80px;
    padding: 0 35px;
    color: white;
    font-size: 18px;
}

.module-container.chosen, .module-container.chosen:hover {
    background-color: #1E70BB;
}

.module-container:hover {
    background-color: #1e7ebb;
}

.log-out-container {
    float: right;
    height: 100%;
    line-height: 80px;
    padding: 0 30px;
    color: white;
}

.log-out-container img {
    vertical-align: middle;
}

.log-out-container span {
    vertical-align: middle;
}

.log-out-container:hover {
    background-color: #1e7ebb;
}

.user-container {
    float: right;
    height: 100%;
    line-height: 80px;
    padding: 0 30px;
    color: white;
}

.user-container img {
    vertical-align: middle;
}

.user-container span {
    vertical-align: middle;
}

.user-container:hover {
    background-color: #1e7ebb;
}

.nav-sidebar-container {
    position: fixed;
    top: 80px;
    left: 0;
    bottom: 0;
    background-color: #35455F;
    width: 150px;
    padding-top: 20px;
    z-index: 1000;
}

.nav-sidebar {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-sidebar > li {
    position: relative;
    height: 45px;
}

.nav-sidebar > li > .chosen-flag {
    display: none;
}

.nav-sidebar > li > a {
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 100%;
    line-height: 45px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
}

.nav-sidebar > li > .router-link-active {
    background-color: #165ABB;
}

.nav-sidebar > li > .router-link-active + .chosen-flag {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #EE8552;
    display: block;
}

.nav-sidebar > li > a:hover, .nav-sidebar > li > a:focus {
    background-color: #0F4898;
}

.page-container {
    margin-left: 150px;
    margin-top: 80px;
    min-height: 700px;
    padding-bottom: 30px;
    background-color: #EDEEF2;
}

.main-container {
    margin: 0 auto;
    width: 1080px;
}
</style>