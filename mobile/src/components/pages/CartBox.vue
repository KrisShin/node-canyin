<template>
  <div ref="box" @click="toggleList" class="cart-box-warp">
    <div v-show="isShowList" class="cart-list">
      <div class="list">
        <div class="row" v-for="(item,index) in orderList" :key="index">
          <p class="name">
            {{item.dishName}} x <span class="num">{{item.num}}</span> <span class="pay"><span class="label">金额: </span><span class="num">{{(item.num*item.price).toFixed(2)}}</span>元</span>
            <!-- <div class="btn">
            <span @click="subCart(item)" class="icon el-icon-minus"></span>
            <span @click="addCart(item)" class="icon el-icon-plus"></span>
            </div> -->
          </p>
        </div>
      </div>
    </div>
    <p class="txt" v-if="Number(payMoney)"><span class="label">合计: </span><span class="num">{{payMoney}}</span> 元</p>
    <p v-else style="line-height:40px;">未选购商品</p>
    <el-button v-if="orderList.length" class="btn" @click="click_goCart" type="warning" size="mini">去结算</el-button>

  </div>
</template>

<script>
export default {
  computed: {
    orderList() {
      return this.$store.state.cart
    },
    isVip() {
      return this.$store.state.user.isVip
    },
    payMoney() {
      let sum = 0
      if(this.isVip) {
        this.orderList.forEach(item => {
          sum += item.price*item.num*item.discount
        })
      } else {
        this.orderList.forEach(item => {
          sum += item.price*item.num
        })
      }
      
      return sum.toFixed(2)
    },
  },
  data () {
      return {
        isShowList: true
      }
    },
  methods: {
    toggleList(e) {
      // console.log()
      // console.log(this.$refs.box)
      if(e.srcElement === this.$refs.box) {
        this.isShowList = !this.isShowList  
      }
      
    },
    addCart(item) {
      this.$store.commit('addToCart', item)
    },
    subCart(item) {
      console.log(item.num)
      this.$store.commit('subToCart', item)
    },
    click_goCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang='scss' scoped>
.cart-box-warp{
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  bottom: 0;
  background-color: rgb(165, 165, 165);
  .btn{
    position: absolute;
    right: 0;
    bottom: 20px;
    right: 5px;
  }
  .txt{
    height: 40px;
    line-height: 40px;
    color: #dfdfdf;
    .label{
      color: #dfdfdf;
    }
    .num{
      color: rgb(252, 190, 76);
      font-size: 20px;
    }
  }
  .cart-list{
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    background-color: rgb(118, 178, 202);
    max-height: 300px;
    overflow-y: auto;
    .btn{
    width: 60px;
    margin: 0 auto;
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
}
</style>