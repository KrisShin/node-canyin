<template>
  <div class="navbar-warp">
    <div :class="path=='/dishManage'?'active':''" @click="navTo('/dishManage')" class="box">
      <span class="icon el-icon-reading"></span>
      <span class="txt">菜品管理</span>
    </div>
    <div :class="path=='/orderManage'?'active':''" @click="navTo('/orderManage')" class="box">
      <span class="icon el-icon-shopping-cart-1"></span>
      <span class="txt">订单管理</span>
    </div>
    <div v-if="auth=='boss' || auth=='manager'" :class="path=='/sellCalculate'?'active':''" @click="navTo('/sellCalculate')" class="box">
      <span class="icon el-icon-shopping-cart-1"></span>
      <span class="txt">销售统计</span>
    </div>
    <div :class="path=='/buyManage'?'active':''" @click="navTo('/buyManage')" class="box">
      <span class="icon el-icon-user-solid"></span>
      <span class="txt">采购管理</span>
    </div>
    <div :class="path=='/userManage'?'active':''" @click="navTo('/userManage')" class="box">
      <span class="icon el-icon-user-solid"></span>
      <span class="txt">用户管理</span>
    </div>
    <div v-if="auth=='boss' || auth=='manager'" :class="path=='/employeeManage'?'active':''" @click="navTo('/employeeManage')" class="box">
      <span class="icon el-icon-user-solid"></span>
      <span class="txt">员工管理</span>
    </div>
    <div v-if="auth=='boss'" :class="path=='/sysManage'?'active':''" @click="navTo('/sysManage')" class="box">
      <span class="icon el-icon-user-solid"></span>
      <span class="txt">系统管理</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    path() {
      return this.$route.path
    },
    auth() {
      return this.$store.state.user.auth
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
    background-color: #fff !important;
  }
  $w: 80px;
  $h: 50px;
  width: $w;
  position: fixed;
  top: 40px;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: rgb(240, 199, 199);
  .box{
    padding: 10px 5px;
    height: $h;
    line-height: $h;
    background-color: rgb(240, 199, 199);
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