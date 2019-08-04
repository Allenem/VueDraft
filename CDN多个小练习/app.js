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

new Vue({
	el: '#vue-app-one'
});

new Vue({
	el: '#vue-app-two'
});

/*
* el: element 只能挂载到根容器上
* data: 用于数据存储
* methods: 存储各种方法
* data-binding: 绑定属性
*/