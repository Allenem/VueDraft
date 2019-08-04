<template>
  <div class=" row">
    <div id="home" class="col-sm-12 text-center">
      <div class="background">
        <h1>欢迎大家品尝pizza!</h1>
        <h2>这里有你非常喜欢的pizza!</h2>
        <button @click="goOlder" class='btn btn-success'>goOlder</button>
        <button @click="goMenu" class='btn btn-success'>goMenu</button>
        <button @click="goAdmin" class='btn btn-success'>goAdmin</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    goOlder(){
      this.$router.go(-1);
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
};
</script>

<style>
#home {
  background: url('../../src/assets/pizza.jpg');
  height: 85vh;
  padding: 10%;
}
h1, h2{
  margin: 6%; 
}
.background {
  background: #eee;
  opacity: 0.8;
  max-width: 70vw;
  margin: 0 auto;
  padding: 20px 0;
}
</style>