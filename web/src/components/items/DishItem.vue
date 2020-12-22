<template>
  <div class="item-warp">
    <p class="title">{{info.dishName}}</p>
    <p class="price">{{info.price}}(元/份)</p>
    <p class="discount">{{(info.discount*info.price).toFixed(2)}}(会员价)</p>
    <div class="btn">
      <span @click="subCart(info)" class="icon el-icon-minus"></span>
      <span class="num">{{info.num}}</span>
      <span @click="addCart(info)" class="icon el-icon-plus"></span>
    </div>
    
  </div>
</template>

<script>
export default {
  props: ['info'],
  created() {
  },
  methods: {
    addCart(item) {
      this.info.num ++
      this.$store.commit('addToCart', item)
    },
    subCart(item) {
      this.$store.commit('subToCart', item)
    }
  }
}
</script>

<style lang='scss' scoped>
.item-warp{
  height: 80px;
  width: 120px;
  box-sizing: border-box;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title{
    font-size: 15px;
    font-weight: 600;
  }
  .btn{
    display: flex;
    justify-content: space-between;
    padding: 2px 20px;
    .num{
      flex: 2;
    }
    .icon{
      color: rgb(236, 201, 46);
      background-color: rgb(76, 85, 82);
      border-radius: 4px;
      padding: 0 2px;
      flex: 1;
      line-height: 18px;
    }
  }
  
}
</style>