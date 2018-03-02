<template>
    <div class="bread-crumbs">
        <img src="../../assets/bread_crumbs_icon.png">
        <template v-for="(item, index) in breadCrumbs">
            <span>{{item}}</span>
            <span v-if="index != breadCrumbs.length - 1" style="margin-right: 4px;">/</span>
        </template>
    </div>
</template>

<script>
export default {
    name: 'BreadCrumbs',
    props: ['breadCrumbs'],
    data () {
        return {
            
        }
    },
}
</script>

<style scoped>
.bread-crumbs {
    height: 32px;
    background-color: white;
    padding-left: 30px;
    color: #448ACA;
    font-size: 15px;
    line-height: 32px;
}

.bread-crumbs * {
    vertical-align: middle;
}

.bread-crumbs img {
    width: 50px;
    margin-right: 15px;
}
</style>