import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueResource)

// 全局守卫
/*
router.beforeEach((to,from,next) => {
  if(to.path == '/login' || to.path == '/register'){
    next()
  }else{
    alert("还没有登录，请先登录！");
    next('/login');
  }
})*/

// 后置钩子(不常用)
/*
router.afterEach((to,from) => {
  alert("after each")
})*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
