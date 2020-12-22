<template>
  <div id="app" ref="app">
    <div class="main-title">点餐后台管理平台</div>
    <div v-if="userName" class="logout">
      当前登录:<span class="name"> {{userName}}</span>
      <el-button
        type="text"
        size="small"
        class="my-btn freeze"
        @click="logout('sellCount')"
      >退出登录</el-button>
    </div>
    <!-- 已登录 -->
    <div v-if="logState" class="content-warp">
      <router-view/>
      <NavBar />
    </div>
    <!-- 未登录 -->
    <router-view v-if="!logState" />
  </div>
</template>


<script>
import { deviceHeight } from '../util'
import NavBar from './components/pages/NavBar'
export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    logState() {   // 是否已登录
      return this.$store.state.logState
    },
    userName() {
      return this.$store.state.user.nickName
    }
  },
  mounted() {
    this.$refs.app.style.height = deviceHeight()
  },
  data() {
    return {
      title: '餐馆吧',
      type: 'box3',
      isHome: true
    }
  },
  methods: {
    logout() {
      this.$store.commit('userSignout')
      this.$router.push('/')
    }
  },
  // watch: {
  //   '$route'(n) {
  //     if(n.path === '/') {
  //       this.isHome = true 
  //     } else {
  //       this.isHome = false
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/my-btns.scss';
#app {
  $h: 35px;
  text-align: center;
  overflow: hidden;
  .logout{
    position: absolute;
    right: 10px;
    top: 10px;
    .name{
      padding: 0 4px;
      color: rgb(241, 191, 124);
    }
  }
  .content-warp{
    height: 100%;
    overflow: hidden;
    position: relative;
    padding: 0 0 10px 0;
    box-sizing: border-box;
  }
  .main-title{
    color: rgb(243, 181, 88);
    $icon_size: 20px;
    $bg:rgb(224, 250, 246);
    background-color: $bg;
    position: relative;
    height: $h;
    line-height: $h;
    font-size: 20px;
    overflow: hidden;
  }
  
  .bottom-nav{
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    a{
      font-size: 12px;
    }
    .split-line{
      display: inline-block;
      border: 1px solid;
      border-left: none;
      margin: 0 10px;
      height: 8px;
    }
  }
}
</style>
