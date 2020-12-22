<template>
  <div class="back-button-warp">
    <el-button @click="back" type="info" class="btn back" icon="el-icon-arrow-left" circle></el-button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.btn{
  z-index: 1000;
  background-color: #fff;
  font-size: 20px;
  color: #222;
  border: none;
  padding: 0;
  position: absolute;
  left: 5px;
  top: 5px;
}
</style>