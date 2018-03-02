<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
}

a {
    cursor: pointer;
    text-decoration: none;
}

ul{
  list-style: none;

}

a.btn-link {
    color: #1E70BB;
}

.emall-table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
}

.emall-table thead {
    background-color: #D1ECF9;
    color: #1E70BB;
}

.emall-table thead .head-row {
    height: 40px;
}

.emall-table thead th, .emall-table tbody td {
    padding: 15px 8px;
    text-align: center;
    word-wrap: break-word;
}

.emall-table tbody .separation-row {
    height: 20px;
}

.emall-table tbody .content-row td {
    border: 1px solid #D1ECF9;
}
</style>
