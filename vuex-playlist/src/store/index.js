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
  },
  mutations:{
    reducePriceM:(state,payload)=>{
      state.products.forEach(product =>{
        product.price -= payload;
      })
    }
  },
  actions:{
    reducePriceA:(context,payload)=>{
      setTimeout(function(){
        context.commit('reducePriceM',payload)
      },2000)
    }
  }
}) 