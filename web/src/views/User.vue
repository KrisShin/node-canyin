<template>
  <div class="user-warp">
    <div class="content">
      <el-button size="mini" @click="click_signout" type="warning">退出登录</el-button>
    </div>
    <div class="content">
      <el-button size="mini" @click="click_order" type="primary">我的订单</el-button>
    </div>
    <el-form>
      <el-form-item :label="txt">
        <el-switch @change="changeVip" v-model="isVip"></el-switch>
      </el-form-item>
    </el-form>
    
    
  </div>
</template>

<script>
import { postVip } from '@/api'
export default {
  name: 'User',
  computed: {
    txt() {
      if(this.isVip) {
        return '取消vip'
      } else {
        return '开通vip'
      }
    },
    isVip: {
      get() {
        return this.$store.state.user.isVip
      },
      set() {}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    click_order() {
      this.$router.push('/user/order')
    },
    click_signout() {
      console.log(88)
      this.$store.commit('userSignout')
      this.$router.push('/')
    },
    changeVip(v) {
      this.$store.commit('changeVip', v)
      postVip({
        isVip: v,
        userId: this.$store.state.user._id
      }).then(res => {
        if(res.data.success) {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.content{
  position: relative;
}
</style>
