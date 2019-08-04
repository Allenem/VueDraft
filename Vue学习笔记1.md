# Vue 学习笔记1（01-39）

>学习地址：[https://ke.qq.com/course/279700](https://ke.qq.com/course/279700)

## 目录：

- [01-01 git下载代码](#download)
- [02-27 Vue2.x](#vue2)
- [28-39 路由精讲](#router)
- 40-49 Vue-Cli3.0
- 50-64 Vue2.x-实战项目(个人博客)
- 65-76 Vue2.x-实战项目(用户管理)
- 77-87 Vuex

## download
## 01 第1课到25课代码下载

```bash
git clone https://github.com/hemiahwu/vue-basic.git
cd vue-basic
git checkout lesson-*  # *为 1~25
```

## vue2
## 02 Vue2.x-初识Vue及引入CDN

### vue的引入
```html
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
或者
```html
<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```

## 03 Vue2.x-实例化Vue对象

### app.js
```js
// 实例化Vue对象
new Vue({
  el: '#vue-app',
  data: {
    name: 'Allenem',
    job: 'student'
  }
});

/*
* el:element 只能挂载到根容器上
* data:用于数据存储
*/
```

### html中引入数据
```html
<script src="app.js"></script>
{{ name }}
{{ job }}
```

## 04 Vue2.x-数据和方法

### （1）无参函数
#### app.js
```js
// methods 用于存储各种方法
methods: {
  greet: function(){
    return 'Good Morning!'
  }
}
```

#### index.html中使用方法
```html
<!-- 正确 -->
{{greet()}}
<!-- 显示如下 -->
<!-- Good Morning! -->

<!-- 错误 -->
{{greet}}
<!-- 显示如下 -->
<!-- function () { [native code] } -->
```

### （2）有参函数
#### app.js
```js
methods: {
  greet: function(time){
    return 'Good '+time+' !';
  }
}
```

#### index.html中使用方法
```html
<!-- 正确 -->
{{ greet('Night') }}
<!-- 显示如下 -->
<!-- Good Night ! -->

<!-- 错误 -->
{{ greet(Night) }}
<!-- 显示如下 -->
<!-- Good undefined ! -->
```

### （3）方法中用data中的属性
直接使用` this.*`，不用`this.data.*`
#### app.js
```js
methods: {
  greet: function(time){
    return 'Good '+ time + this.name+' !';
  }
}
```

## 05 Vue2.x-属性绑定

### 绑定属性
#### app.js
data中添加
```js
website: 'https://github.com/'
```

#### index.html
```html
<a v-bind:href="website">websit</a>
```
或者简写
```html
<a :href="website">websit</a>
```

### 绑定标签
#### app.js
data中添加
```js
websiteTag: "<a href='https://github.com/'>websit</a>"
```

#### index.html
```html
<!-- 正确 -->
<p v-html="websiteTag">websit</a>

<!-- 错误 -->
{{ websiteTag }}
<!-- 显示如下 -->
<!-- <a href='https://github.com/'>websit</a> -->
```

## 06 Vue2.x-事件(点击:双击:鼠标事件)

### 不传参单击双击
**注意：**绑定事件里方法不传参可以不加括号仍然识别为方法，但在{{}}里一定要写括号才会识别为方法
#### app.js
```js
data: {
  age: 20,
},
methods: {
  add: function(){
    this.age++;
  },
  dec: function(){
    this.age--;
  },

}
```

#### index.html
```html
<!-- 单击 -->
<button v-on:click='add'>加一岁</button>
<button @click='dec'>减一岁</button>
<!-- 双击 -->
<button v-on:dblclick='add'>加一岁</button>
<button @dblclick='dec'>减一岁</button>
<p>My age is {{ age }}</p>
```

### 传参单击双击

#### app.js
```js
methods: {
  add: function(val){
    this.age += val;
  },
  dec: function(val){
    this.age -= val;
  },
}
```

#### index.html
```html
<button v-on:click='add(1)'>加一岁</button>
<button @click='dec(1)'>减一岁</button>
<button v-on:dblclick='add(10)'>加十岁</button>
<button @dblclick='dec(10)'>减十岁</button>
```

### 鼠标滚动获取当前位置事件

#### app.js
```js
methods: {
		updateXY: function(event){
			this.x = event.offsetX;
			this.y = event.offsetY;
		},
}
```

#### index.html
```html
<div id="canvas" @mousemove='updateXY'>
	{{x}},{{y}}
</div>
```

## 07 Vue2.x-事件修饰符(once:prev:stop)

### app.js
```js
// 无变化
```
### index.html
```html
<div id="canvas" @mousemove='updateXY'>
  {{x}},{{y}} --
  <span @mousemove.stop=''>stop moving</span>
</div>
```
<=>
```js
methods:{
  stopMove: function(event){
    event.stopPropagation();
  },
}
```
### index.html
```html
<div id="canvas" @mousemove='updateXY'>
  {{x}},{{y}} --
  <span @mousemove='stopMove'>stop moving</span>
</div>
```

## 08 Vue2.x-键盘事件及键值修饰符(alt:enter)

### app.js
```js
data: {
  name: 'Allenem',
  age: 20,
},
methods: {
  logName: function(){
    console.log('typing name');
  },
  logAge: function(){
    console.log('typing age');
  }
},
```

### index.html
```html
  <label>name:</label>
  <input type="text" @keyup.enter='logName'>
  <label>age:</label>
  <input type="text" @keyup.alt.enter='logAge'>
```

## 09 Vue2.x-双向数据绑定

### app.js
```js
methods: {
  logName: function(){
    // console.log('typing name');
    this.name = this.$refs.name.value;
  },
  logAge: function(){
    // console.log('typing age');
    this.age = this.$refs.age.value;
  }
},
```

### index.html
```html
<!-- 方法1 -->
<input ref='name' type="text" @keyup='logName'>
<!-- 方法2 -->
<input v-model='age' type="text">
```

## 10 Vue2.x-计算属性Computed

### methods 属性
#### app.js
```js
methods: {
  addA: function(){
    console.log('aaa');
    return this.a + this.age;
  },
  addB: function(){
    console.log('bbb');
    return this.b + this.age;
  },
},
```

#### index.html
```html
  <h1>computed 计算属性</h1>
  <button @click='a++'>Add A</button>
  <button @click='b++'>Add B</button>
  <p>A: {{a}}</p>
  <p>B {{b}}</p>
  <p>Age + A {{addA()}}</p>
  <p>Age + B {{addB()}}</p>
```
### computed 属性
#### app.js
```js
computed: {
  addA: function(){
    console.log('aaa');
    return this.a + this.age;
  },
  addB: function(){
    console.log('bbb');
    return this.b + this.age;
  },
},
```

#### index.html
```html
  <h1>computed 计算属性</h1>
  <button @click='a++'>Add A</button>
  <button @click='b++'>Add B</button>
  <p>A: {{a}}</p>
  <p>B {{b}}</p>
  <p>Age + A {{addA}}</p>
  <p>Age + B {{addB}}</p>
```

## 11 Vue2.x-动态绑定CSS样式

### style.css
```css
span{
  background: #f00;
  display: inline-block;
  padding: 10px;
  color: #fff;
  margin: 10px 0;
}
.changeColor span{
  background: #0f0;
}
.changeLength span:after{
  content: "length";
  margin-left: 10px;
}
```

### app.js
```js
  data: {
    changeColor:false,
    changeLength:false
  },
  computed: {
    compClasses: function(){
      return{
        changeColor:this.changeColor,
        changeLength:this.changeLength
      }
    }
  },
```

### index.html
```html
  <h2>eg2</h2>
  <button @click='changeColor = !changeColor'>changeColor</button>
  <button @click='changeLength = !changeLength'>changeLength</button>
  <div :class='compClasses'>
    <span>lucy</span>
  </div>
```

## 12 Vue2.x-指令v-if

### app.js
```js
  data: {
    err:false,
    success:false
  },
```

### index.html
```html
  <button @click='err=!err'>err</button>
  <button @click='success=!success'>success</button>
  <p v-if='err'>err</p>
  <p v-else-if='success'>200</p>
  <p v-show='err'>err</p>
  <p v-show='success'>200</p>
```

## 13 Vue2.x-指令v-for

### app.js
```js
  data: {
    characters:['allen','janny','mike'],
    users:[
      {name:'hurry',age:20},
      {name:'luccy',age:25},
      {name:'zero',age:18},
    ]
  },
```

### index.html
```html
  <ul v-for='(item,index) in users' :key='index'>
    <li>{{index+1}} - {{item.name}} - {{item.age}}</li>
  </ul>
  <!-- 会多出3个div -->
  <div v-for='(item,index) in users' :key='index'>
    <h2>{{item.name}}</h2>
    <p>{{index+1}} - {{item.age}}</p>
  </div>
  <!-- 不会多出3个template -->
  <template v-for='(item,index) in users' :key='index'>
    <h2>{{item.name}}</h2>
    <p>{{index+1}} - {{item.age}}</p>
  </template>
```

## 14 Vue2.x-实战DEMO

### app.js
```js
  data: {
    health:100,
    ended:false
  },
  methods: {
    punch:function(){
      this.health -= 10;
      if(this.health <= 0){
        this.ended = true;
      }
    },
    restart:function(){
      this.health = 100;
      this.ended = false;
    }
  },
```

### index.html
```html
  <h1>Bag-Demo</h1>
  <!-- 图片 -->
  <div id="bag" :class="{burst: ended}"></div>

  <!-- 进度 -->
  <div id="bag-health">
    <div :style="{width: health + '%'}"></div>
  </div>

  <!-- 控制按钮 -->
  <div id="control">
    <button @click='punch' v-show='!ended'>使劲敲</button>
    <button v-on:click='restart'>重新开始</button>
  </div>
```

### style.css
```css
h1{
  width: 200px;
  margin: 0 auto;
  text-align: center;
}
#bag{
  width: 200px;
  height: 500px;
  margin: 0 auto;
  background: url(img/bag.png) center no-repeat;
  background-size: 80%;
}
#bag.burst{
  background-image: url(img/bag-burst.png)
}
#bag-health{
  width: 200px;
  border: 2px #000 solid;
  margin: 0 auto 20px auto;
}
#bag-health div{
  height: 20px;
  background: crimson;
}
#control{
  width: 200px;
  margin: 0 auto;
}
#control button{
  margin-left: 20px;
}
```

## 15 Vue2.x-实例化多个Vue对象

app.js

```js
// 实例化Vue对象
var one = new Vue({
  el: '#vue-app-one',
  data: {
    title: 'one 的内容'
  },
  methods: {
    
  },
  computed: {
    greet:function(){
      return 'hello app one';
    }
  },
});

var two = new Vue({
  el: '#vue-app-two',
  data: {
    title: 'two 的内容'
  },
  methods: {
    changeTitle:function(){
      one.title = 'changed';
    }
  },
  computed: {
    greet:function(){
      return 'hello app one';
    }
  },
});
```


## 16 Vue2.x-初识组件的应用

app.js
```js
Vue.component("greeting",{
  template:`
  <div>
    <p> {{name}}：大家好，给大家介绍一下我的朋友@关晓彤</p>
    <button @click='changeName'>点我</button> 
  </div>
  `,
  data:function(){
    return {
      name:'鹿晗'
    }
  },
  methods:{
    changeName:function(){
      this.name = this.name == '鹿晗'?'Hery':'鹿晗'
    }
  }
})
```

## 17 Vue2.x-搭建脚手架CLI

### 部分特点
- 脚手架是通过webpack搭建的开发环境
- 使用es6语法
- 打包和压缩js为一个文件
- 项目在环境中编译，而不是浏览器
- 实现页面自动刷新
- ...

### vue-cli的使用
- 安装 nodejs ，一般选择安装LTS（长期稳定版）版本。[官网：https://nodejs.org/en/](https://nodejs.org/en/)
  ```bash
  # 在terminal、cmd、powershell 中
  # 输入 `node -v` 查看 node 版本号
  node -v
  ```
  ```bash
  # 输入 `npm -v` 查看 npm 版本号
  npm -v
  ```
- 安装 cnpm
  ```bash
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  ```
- 安装 Vue CLI 3.x
  ```bash
  npm install -g @vue/cli
  # OR
  yarn global add @vue/cli
  ```
  ```bash
  # 输入 `vue --version` 查看 npm 版本号
  vue --version
  # OR
  vue -V
  ```
- 创建一个 Vue 项目
  ```bash
  vue create projectName
  ```
  ```bash
  # 创建项目相关帮助
  vue create --help
  ```
- 运行相关
  ```bash
  # Project setup
  npm install
  # Compiles and hot-reloads for development
  npm run serve
  # Compiles and minifies for production
  npm run build
  # Run your tests
  npm run test
  # Lints and fixes files
  npm run lint
  ```
- (PS)旧版本 Vue CLI 2.x
  ```bash
  npm install -g @vue/cli-init
  # `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
  vue init webpack my-project
  ```

## 18 Vue2.x-介绍SRC文件流程及根组件App

```bash
client
│  .gitignore
│  babel.config.js
│  package.json
│  README.md
│
├─public
│    favicon.ico
│    index.html
│
└─src
    │  App.vue
    │  main.js
    │  router.js
    │
    ├─assets
    │      bg.jpg
    │
    └─components
           Component1.vue
           Component2.vue
```

index.html -> main.js -> App.vue ()

```html
<!-- 模板 -->
<template></template>
<!-- 逻辑 -->
<script></script>
<!-- 样式 -->
<style></style>
```


## 19 Vue2.x-组件嵌套

### 可以在main.js中注册全局组件
```js
import Users from './component/Users'

Vue.component('users',Users);
```

### 也可以在某些组件中调用
```html
<template>
  <div id="app">
    <Users></Users>
  </div>
</template>

<script>
import Users from './components/Users'
export default {
  components:{
    'Users':Users
  }
}
</script>
```


## 20 Vue2.x-组件CSS作用域

```html
<style scoped>
/* `scoped`该组件作用域内有效 */
/* 否则子组件相同选项样式会覆盖根组件的 */
</style>
```

## 21 Vue2.x-实战Demo(组件嵌套)
略

## 22 Vue2.x-属性传值Props

### 父组件：
在调用子组件的位置，绑定自己的属性，第一个是子组件中的名称，第二个是父组件中的名称。

eg:
```html
<Users :usersSon='users'></Users>
```

### 子组件：
子组件属性 `props:['usersSon'],` 接收传值。或者用标准写法

```js
props:{
  users:{
    type:Array;
    requied:true;
  },
  position:{
    type:Array;
    requied:true;
  },
},
```

eg:
```html
<template>
  <div class="users">
    <ul>
      <li v-for="(user,index) in usersSon" :key="index" @click="user.show = !user.show">
        <h2>{{user.name}}</h2>
        <h3 v-show="user.show">{{user.position}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name:'users',
    props:['usersSon'],
  }
</script>
```

## 23 公益广告
略

## 24 Vue2.x-传值和传引用

>传值：string number boolean，一处变，全部变
>引用：array object，一处变，局部变

## 25 Vue2.x-事件传值(子to父)

### 子组件
```html
<h1 @click="tofather">{{title1}} {{title}}</h1>
<script>
export default {
  methods: {
    tofather: function(){
      this.$emit('changed','son to father') //第1个参数是事件名，第2个参数是传递的值
    }
  },
}
</script>
```

### 父组件
```html
<Header @changed='update($event)' :title="title"></Header>
<!-- $event不能改 -->

<script>
export default {
  methods: {
    update:function(title){
      this.title = title;
    }
  },
}
</script>
```

## 26 Vue2.x-生命周期(钩子函数)

8个钩子函数与 methods 并列。

### Header.vue
```html
<script>
export default {
  methods: {
    tofather: function(){
      this.$emit('changed','son to father')
    }
  },
  beforeCreate:function () {
    alert('组件实例化之前');
  },
  created:function () {
    alert('组件实例化之后，页面还未显示');
  },
  beforeMount:function () {
    alert('组件挂载之前，页面仍未显示，但虚拟Dom已经配置');
  },
  mounted:function () {
    alert('组件挂载之后，此方法执行后，页面显示');
  },
  beforeUpdate:function () {
    alert('组件更新之前，页面仍未更新，但虚拟Dom已经配置');
  },
  updated:function () {
    alert('组件更新之后，此方法执行后，页面改变');
  },
  beforeDestroy:function () {
    alert('组件销毁前');
  },
  distroyed:function () {
    alert('组件销毁');
  }
}
</script>
```

## 27 Vue2.x-路由和Http(快速入门)(知识点最后一课第25课)

### (1) 安装路由模块及引入
```bash
npm install vue-router --save
```
router.js中
```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import HelloWorld from './components/HelloWorld.vue'

Vue.use(Router);

export default new Router({
  mode: 'history', // 没有#符号
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/helloworld',
      name: '',
      component: HelloWorld
    }
  ]
})
```
main.js中
```js
import router from './router';

new Vue({
  router,
  ...
});
```

App.vue
```html
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/helloworld">Hello</a></li>
      <!-- 或者 -->
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/helloworld">Hello</router-link></li>
    </ul>
    <router-view></router-view>
```

### (2) HTTP
安装依赖:

```bash
npm i vue-resource --save
```
使用:

main.js中
```js
import VueResource from 'vue-resource';
Vue.use(VueResource);
```
Home.vue中
```js
  created(){
    this.$http.get('http://jsonplaceholder.typicode.com/users')
    .then((data)=>{
      // console.log(data);
      this.users = data.body;
    })
  },
```

## router
## 28 Vue2.x-路由精讲之新建项目

just create an Vue App

## 29 Vue2.x-路由精讲之制作导航

use bootstraps4 by BootstrapCDN (CSS only)
```html
<link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"
```

## 30 Vue2.x-路由精讲之配置路由跳转

router.js
```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import About from './components/about/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/',component:Home},
    {path:'/about',component:About},
  ]
})
```
Header.vue
```html
<router-link to="/about"></router-link>
```
App.vue
```html
<router-view></router-view>
```

## 31 Vue2.x-路由精讲之路由小细节(redirect和tag)

Header.vue
```html
<!-- 默认a标签 -->
<router-link to="/about"></router-link>

<!-- 修改为div标签 -->
<router-link tag='div' to="/about"></router-link>

<!-- 动态绑定属性路由 -->
<router-link tag='div' :to="router"></router-link>
<script>
  export default {
    data(){
      return{
        router:'/'
      }
    }
  }
</script>
```

router.js
```js
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path:'/',component:Home},
    {path:'/about',component:About},
    {path:'*',redirect:'/'}, //错误输入重定向
  ]
})
```

## 32 Vue2.x-路由精讲之路由name属性及跳转方法

### name
```js
{path:'/',name:'homelink',component:Home},
```

```html
<!-- 注意这几个符号 : {} " '' " -->
<li><router-link :to="{name:'homelink'}" class="nav-link">主页</router-link></li>
```

### 跳转
```html
  <button @click="goOlder" class='btn btn-success'>goOlder</button>
  <button @click="goMenu" class='btn btn-success'>goMenu</button>
  <button @click="goAdmin" class='btn btn-success'>goAdmin</button>

<script>
export default {
  methods:{
    goOlder(){
      this.$router.go(-1); // 到前一个页面
    },
    goMenu(){
      // this.$router.replace('/menu');  // 到指定路由页面
      this.$router.push('/menu');  // 到指定路由页面
    },
    goAdmin(){
      // this.$router.replace({name:'adminLink'});  // 到指定 name 页面
      this.$router.push({name:'adminLink'});  // 到指定 name 页面
    },
  }
}
</script>
```


## 33 Vue2.x-路由精讲之二级路由和三级路由

router.js
```js
    {path:'/about',name:'aboutLink',redirect:'/about/histoey',component:About,
    // 二级路由
    children:[
      {path:'/about/histoey',name:'historyLink',component:History},
      {path:'/about/contact',name:'contactLink',redirect:'/phone',component:Contact,children:[
        // 三级路由
        {path:'/phone',name:'phoneNum',component:Phone},
        {path:'/personname',name:'personName',component:Personname},
      ]},
      {path:'/about/orderingguide',name:'orderingGuideLink',component:OrderingGuide},
      {path:'/about/delivery',name:'deliveryLink',component:Delivery},
    ]},
```

about.vue
```html
<!-- 导航的内容 -->
<router-view></router-view>
```

## 34 Vue2.x-路由精讲之导航守卫(全局守卫)

学习地址(https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

main.js中
```js
// 全局守卫
router.beforeEach((to,from,next) => {
  if(to.path == '/login' || to.path == '/register'){
    next()
  }else{
    alert("还没有登录，请先登录！");
    next('/login');
  }
})
```

## 35 Vue2.x-导航守卫(路由独享-组件内守卫)

### 后置钩子(不常用)
```js
router.afterEach((to,from) => {
  alert("after each")
})
```

### 路由独享的守卫
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
### 组件内的守卫
- beforeRouteEnter
- beforeRouteUpdate (2.2 新增)
- beforeRouteLeave

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```
beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```
注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```
这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。

```js
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```
```js
beforeRouteLeave(to,from,next){
  if(confirm('确认离开吗？') == true){
    next()
  }else{
    next(false)
  }
}
```

## 36 Vue2.x-路由精讲之复用router-view

router。js修改
```js
{path:'/',name:'homeLink',component:Home,},
```
为
```js
// 注意 components 的 s
{path:'/',name:'homeLink',components:{
  default:Home,
  'history':History,
  'orderingGuide':OrderingGuide,
  'delivery':Delivery
}},
```
App.vue添加
```html
<div class="container">
  <div class="row">
    <div class="col-sm-12 col-md-4">
      <router-view name="history"></router-view>
    </div>
    <div class="col-sm-12 col-md-4">
      <router-view name="orderingGuide"></router-view>
    </div>
    <div class="col-sm-12 col-md-4">
      <router-view name="delivery"></router-view>
    </div>
  </div>
</div>
```

## 37 Vuv.2x-路由精讲之控制滚动行为
router.js中
```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```
eg:
```js

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
```

## 38 课程总结及引导

略

## 39 Vue2.x-实现跨域请求(fetch/axios/proxytable)

### （0）预设

通过vue-cli3.x版本构建的项目使用proxy和以前的项目不同，而且3.x版本构建的时候可以选用typescript了。下面记录一下如何使用proxy跨域。
首先在根目录创建vue.config.js文件，这个配置文件在运行项目的时候自动加载。
```js
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xxxx/device/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```
这个文件还可以配置其它信息，比如修改端口号，默认是8080等等。
最后在页面发送请求的时候：
```js
axios.get('/api/getDataPoint').then(res => {
  console.log(res)
})
```
示例如下：

### （1）预设
```js
proxyTable:{
  ' /apis': {
      //测试环境
      target:'http://www.thenewstep.cn/', //接口域名
      change0rigin:true, //是否跨域
      pathRewrite: {
        '^/apis':'' //需要rewrite重写的，
      }
  }
},
```

### （2）fetch
```js
created(){
  // fetch
  fetch("/apis/test/testToken. php", {
    method:"post",
    headers: {
      "Content-type" :"application/json",
      token : "f4c902c9ae5a2a9d8f84868ad064e706"
    },
    body: JSON.stringify({username: "henry" , password :"321321"})
  })
  . then( result =>{
    // console. log( result)
    return result. json()
  })
  . then(data => {
    console. log ( data)
  })
}
```

### (3)axios
main.js
```js
import axios from 'axios'

axios.defaults.headers.common[ 'token '] = "f4c902c9ae5a2a9d8f84868ad064e706"
axios.defaults.headers.post ["Content-type"] = "application/j son"

Vue. prototype.$axios = axios
```
App.vue
```js
this.$axios.post("/apis/test/testToken.php" , {username :"hello",password :"123456"})
  .then(data => {
    console. log(data)
  })
```