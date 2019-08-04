<template>
  <h1>
    Admin
  </h1>
</template>

<script>
export default {
  beforeRouteLeave(to,from,next){
    if(confirm('确认离开吗？') == true){
      next()
    }else{
      next(false)
    }
  }
};
</script>