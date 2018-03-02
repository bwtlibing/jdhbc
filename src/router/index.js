import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
        path: '/',
        redirect: '/order/summary',
        // redirect: '',
    }, {
        path: '/login',
        component: Login
    }, {
        path: '/order',
        component: Main,
        redirect: '/order/summary',
        children: [{
            path: 'summary',
            component: resolve => require(['../components/order/Summary.vue'], resolve)
        }, {
            path: 'query',
            component: resolve => require(['../components/order/Query.vue'], resolve)
        }, {
            path: 'refunds',
            component: resolve => require(['../components/order/Refunds.vue'], resolve)
        }, {
            path: 'detail/:orderNum',
            component: resolve => require(['../components/order/Detail.vue'], resolve)
        }]
    }, {
        path: '/emall',
        component: Main,
        redirect: '/emall/products',
        children: [{
            path: 'products',
            component: resolve => require(['../components/emall/Products.vue'], resolve)
        },
        {
            path: 'productCheck',
            component: resolve => require(['../components/emall/ProductCheck.vue'], resolve)
        },
        {
            path: 'productinfo/:pid',
            component: resolve => require(['../components/emall/ProductInfo.vue'], resolve)
        },
        {
            path: 'productedit/:pid',
            component: resolve => require(['../components/emall/ProductEdit.vue'], resolve)
        },
        {
            path: 'recommendations',
            component: resolve => require(['../components/emall/Recommendations.vue'], resolve)
        },
        {
            path: 'recommendationCheck',
            component: resolve => require(['../components/emall/RecommendationCheck.vue'], resolve)
        },
        ]
    }, {
        path: '/crm',
        component: Main,
        redirect: '/crm/sellers',
        children: [{
            path: 'sellers',
            component: resolve => require(['../components/crm/Sellers.vue'], resolve)
        },
        {
            path:'sellerCheck',
            component:resolve => require(['../components/crm/SellerCheck.vue'],resolve)
        },
        {
            path: 'sellerinfo/:sid',
            component: resolve => require(['../components/crm/SellerInfo.vue'], resolve)
        },
        {
            path: 'selleredit/:sid',
            component: resolve => require(['../components/crm/SellerEdit.vue'], resolve)
        },

        {
            path: 'users',
            component: resolve => require(['../components/crm/Users.vue'], resolve)
        }]
    }, {
        path: '/idc',
        component: Main,
        redirect: '/idc/data',
        children: [{
            path: 'data',
            component: resolve => require(['../components/idc/Data.vue'], resolve)
        }]
    },
        {
        path: '*',
        redirect: '/'
    }]
})