<template>
  <div class="navbar-warp">
    <div class="box" :class="path=='/dishList'?'active':''">
      <span class="icon el-icon-reading"></span>
      <span @click="navTo('/dishList')" class="txt">在线点餐</span>
    </div>
    <!-- <div class="box">
      <span class="icon el-icon-shopping-cart-1"></span>
      <span @click="navTo('/cart')"  class="txt">菜篮</span>
    </div> -->
    <div class="box" :class="path=='/user'?'active':''">
      <span class="icon el-icon-user-solid"></span>
      <span @click="navTo('/user')" class="txt">个人中心</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    path() {
      return this.$route.path
    }
  },
  methods: {
    navTo(url) {
      const currentPath = this.$route.path
      if(url !== currentPath) {
        this.$router.push(url)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.navbar-warp{
  .active{
    background-color: rgb(136, 133, 133) !important;
    color: #fff;
  }
  $h: 35px;
  position: fixed;
  width: 100%;
  bottom: 5px;
  height: $h;
  display: flex;
  justify-content: space-around;
  .box{
    padding: 0 5px;
    height: $h;
    line-height: $h;
    padding: 0 5px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .icon{
      font-size: 20px;
    }
    .txt{
      font-size: 13px;
      line-height: 15px;
    }
  }
}
</style>