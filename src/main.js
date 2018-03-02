// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Resource from 'vue-resource'
import echarts from 'echarts'
import App from './App'
import router from './router'

import { checkLogin } from './utils/common'
import './assets/lib/jquery.cookie'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import { realPrice, dataPrice, priceFilter, orderStatusFilter, payTypeFilter, orderHistoryFilter, refundStatusFilter, refundTypeFilter, recommendationContentTypeFilter, dateFormat, areaTypeFilter,timeFormat,checkStatusFilter } from './utils/filters'

Vue.config.productionTip = false;

Vue.use(Resource);
Vue.use(ElementUI);

Vue.filter('realPrice', realPrice);
Vue.filter('dataPrice', dataPrice);
Vue.filter('priceFilter', priceFilter);
Vue.filter('orderStatusFilter', orderStatusFilter);
Vue.filter('payTypeFilter', payTypeFilter);
Vue.filter('orderHistoryFilter', orderHistoryFilter);
Vue.filter('refundStatusFilter', refundStatusFilter);
Vue.filter('refundTypeFilter', refundTypeFilter);
Vue.filter('recommendationContentTypeFilter', recommendationContentTypeFilter);
Vue.filter('dateFormat', dateFormat);
Vue.filter('areaTypeFilter', areaTypeFilter);
Vue.filter('timeFormat',timeFormat);
Vue.filter('checkStatusFilter',checkStatusFilter);

// Vue.prototype.$echarts = echarts;

router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && !checkLogin()) {
        next({ path: '/login' });
    } else {
        next();
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
