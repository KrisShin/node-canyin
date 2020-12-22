<template>
  <div class="login-warp">
    <div class="row">
      <el-input
        prefix-icon="el-icon-user-solid"
        suffix-icon=""
        @input="reSetTips"
        placeholder="用户名(昵称)"
        v-model="user.nickName"
        clearable>
      </el-input>
      <span v-show="verify.isUserEmpty" class="tip">请输入用户名</span>
    </div>
    <div class="row">
      <el-input prefix-icon="el-icon-lock" @input="reSetTips" placeholder="请输入密码" v-model="user.pwd" show-password></el-input>
      <span v-show="verify.isPwdEmpty" class="tip">密码不能为空</span>
      <span v-show="verify.isWrong" class="tip">用户名或密码错误</span>
    </div>
    <div class="row">
      <el-button @click="click_login" :loading="landing" type="primary" icon="el-icon-right" round></el-button>
    </div>
  </div>
</template>

<script>
import { postLogin } from '@/api'
export default {
  nickName: 'Login',
  data() {
    return {
      color: 'red',
      landing: false,  //登陆中
      verify: {
        isUserEmpty: false,
        isPwdEmpty: false,
        isWrong: false
      },
      user: {
        nickName: '',
        pwd: ''
      }
    }
  },
  created() {
  },
  methods: {
    reSetTips() {  // 取消错误提示
      this.verify = {
        isUserEmpty: false,
        isPwdEmpty: false,
        isWrong: false
      }
    },
    /**click */
    click_login() {
      const { nickName, pwd } = this.user
      if(nickName==='') {
        this.verify.isUserEmpty = true
      } else if(pwd==='') {
        this.verify.isUserEmpty = false
        this.verify.isPwdEmpty = true
      } else {
        this.verify.isPwdEmpty = false
        this.api_doLogin(nickName, pwd)
      }
    },

    /**api */
    api_doLogin(nickName, pwd) {
      this.landing = true
      postLogin({
        nickName,
        pwd
      }).then(res => {
        this.landing = false
        if(res.data.success) {
          const user = res.data.result.res[0]
          this.$store.commit('userSignin', user)
          this.$router.push('/dishList')
        } else {
          this.verify.isWrong = true
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login-warp{
  .row{
    position: relative;
    padding: 15px 30px;
    /deep/.el-input{
      .el-input__inner{
        text-align: center !important;
      }
    }
  }
  .red{
    color: #f44;
  }
  .tip{
      position: absolute;
      left: 8%;
      bottom: 0;
      color: #f44;
      font-size: 12px;
    }
}
</style>
