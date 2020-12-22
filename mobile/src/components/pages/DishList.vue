<template>
  <div class="dish-list-warp">
    <div class="side-bar">
      <!-- <router-link active-class="all" to="/dishList">全部</router-link> -->
      <router-link :class="type=='chuan'?'active':''" active-class="chuan" to="/dishList/chuan">川菜</router-link>
      <router-link :class="type=='xiang'?'active':''" active-class="xiang" to="/dishList/xiang">湘菜</router-link>
      <router-link :class="type=='yue'?'active':''" active-class="yue" to="/dishList/yue">粤菜</router-link>
      <router-link :class="type=='su'?'active':''" active-class="yue" to="/dishList/su">苏菜</router-link>
      <router-link :class="type=='lu'?'active':''" active-class="yue" to="/dishList/lu">鲁菜</router-link>
      <router-link :class="type=='zhe'?'active':''" active-class="yue" to="/dishList/zhe">浙菜</router-link>
      <router-link :class="type=='min'?'active':''" active-class="yue" to="/dishList/min">闽菜</router-link>
      <router-link :class="type=='hui'?'active':''" active-class="yue" to="/dishList/hui">徽菜</router-link>
    </div>
    <div class="list" v-loading='loading'>
      <DishItem v-for="item in list" :key="item._id" :info='item' />  
    </div>
    <CartBox />
    
  </div>
</template>

<script>
import { getDishList } from '@/api'
import DishItem from '@/components/items/DishItem.vue'
import CartBox from '@/components/pages/CartBox.vue'
export default {
  components: {
    DishItem,
    CartBox
  },
  computed: {
    orderList() {
      return this.$store.state.cart
    },
    type() {
      return this.$route.params.type
    }
  },
  data() {
    return {
      loading: false,
      list: [{
        _id: 1,
        dishName: '茄子',
        price: 19.99,
        discount: 0.7,
        num: 0
      },{
        _id: 2,
        dishName: '豆腐鱼',
        price: 19.99,
        discount: 0.7,
        num: 0
      }],

    }
  },
  created() {
    this.api_getDishs('all')
  },
  methods: {
    api_getDishs(type) {
      this.loading = true
      getDishList({
        type
      }).then(res => {
        this.loading = false
        if(res.data.success) {
          this.orderList.forEach(item => {
            res.data.res.forEach(i => {
              if(i._id == item._id) {
                i.num = item.num
              }
            })
          })
          this.list = res.data.res
        }
      })
    }
  },
  watch: {
    '$route'(n) {
      const type = n.params.type || 'all'
      this.api_getDishs(type)
    }
  }
}
</script>

<style lang='scss' scoped>
.dish-list-warp{
  $h: 30px;
  position: relative;
  height: 100%;
  background: rgb(228, 228, 228);
  .side-bar{
    .active{
      color: #f44;
    }
    background-color: #fff;
    display: flex;
    height: $h;
    line-height: $h;;
    justify-content: space-around;
    a{
      padding: 0px 4px;
    }
  }
  .list{
    position: absolute;
    top: $h;
    bottom: 60px;
    left: 0;
    right: 0;
    padding: 4px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow-y: auto;
  }
}
</style>