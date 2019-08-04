import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'

// 二级路由
import History from './components/about/History'
import Contact from './components/about/Contact'
import OrderingGuide from './components/about/OrderingGuide'
import Delivery from './components/about/Delivery'

// 三级路由
import Phone from './components/about/contact/Phone'
import Personname from './components/about/contact/Personname'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/',name:'homeLink',components:{
      default:Home,
      'history':History,
      'orderingGuide':OrderingGuide,
      'delivery':Delivery
    }},
    {path:'/menu',name:'menuLink',component:Menu},
    {path:'/admin',name:'adminLink',component:Admin},
    {path:'/about',name:'aboutLink',redirect:'/about/histoey',component:About,children:[
      {path:'/about/histoey',name:'historyLink',component:History},
      {path:'/about/contact',name:'contactLink',redirect:'/phone',component:Contact,children:[
        {path:'/phone',name:'phoneNum',component:Phone},
        {path:'/personname',name:'personName',component:Personname},
      ]},
      {path:'/about/orderingguide',name:'orderingGuideLink',component:OrderingGuide},
      {path:'/about/delivery',name:'deliveryLink',component:Delivery},
    ]},
    {path:'/login',name:'loginLink',component:Login},
    {path:'/register',name:'registerLink',component:Register},
    {path:'*',redirect:'/'},
  ],
  scrollBehavior (to, from, savedPosition) {
    // return {x:0,y:100};  // 滚动到（0,100）
    // return {selector:'.btn'}; // 滚动到 第一个.btn
    // 浏览器返回上一页面时，回到上次浏览的位置
    if(savedPosition){
      return savedPosition
    }else{
      return {x:0,y:0}
    }
  }

})
