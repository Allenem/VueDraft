# Vue 学习笔记4（77-87）

>学习地址：[https://ke.qq.com/course/279700](https://ke.qq.com/course/279700)

## 目录：

- 01-01 git下载代码
- 02-27 Vue2.x
- 28-39 路由精讲
- 40-49 Vue-Cli3.0
- 50-64 Vue2.x-实战项目(个人博客)
- 65-76 Vue2.x-实战项目(用户管理)
- [77-87 Vuex](#vuex) 核心概念如下
  - [State](#State)
  - [Getter](#Getter)
  - [Mutation](#Mutation)
  - [Action](#Action)
  - [Module](#Module)

## vuex
## 01 Vuex-成果展示及项目搭建
略

## 02 Vuex-一个简单的Vue APP
父子传值
```html
<product-list-one :products='products'></product-list-one>
```
```js
props: ['products'],
```

## State
## 03 Vuex-搭建Vuex中央状态管理, 04 Vuex-使用computed获取store数据
Vuex
> Centralized State Management for Vue.js.

`src` 目录下新建 `store` 文件夹，下面新建 `index.js` 文件
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    products:[
      {name:'马云',price:'200'},
      {name:'马化腾',price:'140'},
      {name:'马冬梅',price:'20'},
      {name:'马蓉',price:'10'},
    ]
  }
}) 
```

`main.js` 中引入
```js
import {store} from './store'
new Vue({
  store,
  ...
}
```

组建中使用，`computed` 属性获取 `store` 中数据
```html
<li v-for="product in products" :key='product'>
  <span class="name">{{product.name}}</span>
  <span class="price">${{product.price}}</span>
</li>

<script>
export default{
  computed: {
    products(){
      return this.$store.state.products
    }
  },
}
</script>
```

## Getter
## 05 Vuex-Getters
`index.js` 文件中，新增 `getters` 属性，里面放其他组件可以调用的方法
```js
export const store = new Vuex.Store({
  state:{
    products:[
      {name:'马云',price:'200'},
      {name:'马化腾',price:'140'},
      {name:'马冬梅',price:'20'},
      {name:'马蓉',price:'10'},
    ]
  },
  getters:{
    saleProducts:(state)=>{
      var saleProducts = state.products.map(product =>{
        return{
          name: "**" + product.name + "**" ,
          price: product.price / 2
        }
      });
      return saleProducts;
    }
  }
}) 
```
组件对 `store` 中方法的调用
```html
<li v-for="product in saleProducts" :key='product'>
  <span class="name">{{product.name}}</span>
  <span class="price">${{product.price}}</span>
</li>

<script>
export default{
  computed: {
    saleProducts(){
      return this.$store.getters.saleProducts;
    }
  },
}
</script>
```

## Mutation
## 06 Vuex-Mutations
谷歌浏览器添加插件[Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)，**可以跟踪vuex状态**

>更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。

`store/index.js` 中添加 `mutations` 属性
```js
  mutations:{
    reducePriceV:state=>{
      state.products.forEach(product =>{
        product.price -= 1;
      })
    }
  }
```

组建中调用方法 `reducePriceV`
```html
<button @click="reducePrice">降价</button>
<script>
export default {
  methods: {
    reducePrice(){
      this.$store.commit('reducePriceM') // mutations中的方法
    }
  },
}
</script>
```

## Action
## 07 Vuex-Actions
Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。(vuex调试器中方法和变化同时出来)

### 注册action
Action 函数接受一个与 store 实例具有相同方法和属性的 `context` 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。

### 组件触发action
Action 通过 `store.dispatch` 方法触发

### 接收第二个参数 payload

### eg:

`store/index.js` 中添加 `actions` 属性
```js
  actions:{
    reducePriceA:context=>{
      setTimeout(function(){
        context.commit('reducePriceM')
      },2000)
    }
  }
```
组建中调用方法 `reducePriceM`
```html
<button @click="reducePrice">降价</button>
<script>
export default {
  methods: {
    reducePrice(){
      this.$store.dispatch('reducePriceA') // actions中的方法
    }
  },
}
</script>
```

## 08 Vuex-mapMutations & mapActions
### 在组件中提交 Mutation
你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```
### 在组件中分发 Action
你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

## Module
## 09 Vuex-Module
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```