<template>
    <div>
        <div class="container">
            <div class="title">翼商城运营管理后台</div>
            <div class="login-container">
                <input id="username" class="login-input" placeholder="用户名" type="text" autofocus v-model="username">
                <input id="password" class="login-input" placeholder="密码" type="password" v-model="password">
                <a class="login-button" @click="login">登录</a>
            </div>
        </div>
    </div>
</template>

<script>
import { resultCode, apiCallback } from '../utils/common'

export default {
    name: 'Login',
    data () {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            if (this.username.length == 0) {
                alert('请输入用户名');
                return;
            }
            if (this.password.length == 0) {
                alert('请输入密码');
                return;
            }
            var url = '/IPTVEMall/admin/user/login?user_name=' + this.username + '&password=' + this.password;
            this.$http.get(url)
            .then((response) => {
                if (response.data.resultCode === resultCode.SUCCESS) {
                    this.$router.push({ path: '/order' })
                } else {
                    apiCallback.success(response.data, this.$message);
                }
            },(response) => {
                apiCallback.error(response);
            })
        },
    }
}
</script>

<style scoped>
.container {
    width: 350px;
    position: fixed;
    left: 50%;
    margin-left: -175px;
    margin-top: 150px;
}

.title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 25px;
}

.login-container {
    border: 1px solid #ecf0f1;
    border-radius: 4px;
    padding: 15px;
}

.login-input {
    height: 45px;
    padding: 10px 15px;
    font-size: 15px;
    margin-bottom: 15px;
}

.login-button {
    font-size: 19px;
    line-height: 50px;
    display: inline-block;
    width: 100%;
    color: white;
    background-color: #1E70BB;
    border-radius: 6px;
    text-align: center;
}

.login-button:focus, .login-button:hover {
    background-color: #448ACA;
}

input.login-input {
    display: block;
    width: 100%;
    box-shadow: none;
    border: 2px solid #dce4ec;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

input.login-input:focus {
    border-color: #2c3e50;
    outline: 0;
}
</style>