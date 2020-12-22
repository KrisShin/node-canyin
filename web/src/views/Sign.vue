<template>
  <div class="sign-warp">
    <BackButton />
    <div class="title">用户注册</div>
    
    <div class="row">
      <el-input
        prefix-icon="el-icon-user-solid"
        suffix-icon=""
        @input="resetTips"
        placeholder="*用户名(昵称)"
        v-model="user.nickName"
        clearable>
      </el-input>
      <span v-show="verify.isUserExist" class="tip">用户名已存在</span>
      <span v-show="verify.isUserEmpty" class="tip">用户名不能为空</span>
    </div>
    <div class="row">
      <el-input
        prefix-icon="el-icon-user-solid"
        suffix-icon=""
        @input="resetTips"
        placeholder="真实姓名"
        v-model="user.name"
        clearable>
      </el-input>
    </div>
    
    <div class="row">
      <el-input prefix-icon="el-icon-lock" @input="resetTips" placeholder="*请输入密码" v-model="user.pwd" show-password></el-input>
      <span v-show="verify.isPwdEmpty" class="tip">密码不能为空</span>
    </div>
    <el-form>
    <div class="row">
      <el-form-item
        v-for="(tel, index) in user.tel"
          :label="'联系方式_' + index"
          :key="tel.key"
          :prop="'tels.' + index + '.value'"
          :rules="{
            required: false, message: '电话号码不能为空', trigger: 'blur'
          }"
        >
        <el-input v-model="tel.value" placeholder="联系电话"></el-input><span class="delete" @click.prevent="removeTel(tel)">X</span>
      </el-form-item>
      <el-button @click="addTel">添加电话</el-button>
    </div>
    </el-form>
    
    <div class="row">
      <el-button @click="click_signin" :loading="landing" type="primary" icon="el-icon-right" round></el-button>
    </div>
    
  </div>
</template>

<script>
import { postRegister } from '@/api'
import BackButton from '@/components/buttons/Back.vue'
export default {
  nickName: 'Sign',
  components: {
    BackButton
  }, 
  data() {
    return {
      landing: false,
      verify: {
        isUserExist: false,
        isUserEmpty: false,
        isPwdEmpty: false
      },
      tel: [],
      user: {
        nickName: '',
        name: '',
        pwd: '',
        tel: [{
          value: ''
        }],
      }
    }
  },
  methods: {
    resetTips() {
      this.verify = {
        isUserExist: false,
        isUserEmpty: false,
        isPwdEmpty: false
      }
    },
    addTel(item) {
      const len = this.user.tel.length
      if(len < 2) {
        this.user.tel.push({
          value: '',
          key: Date.now()
        });
      } else {
        this.$message({
          type: 'warning',
          message: '最多添加两个联系电话'
        })
      }
      
    },
    removeTel(item) {
      var index = this.user.tel.indexOf(item)
        if (index !== -1) {
          this.user.tel.splice(index, 1)
        }
    },
    click_signin() {
      this.landing = true
      const { nickName, name, pwd, } = this.user
      const tel = this.tel
      if(nickName === '') {
        this.verify.isUserEmpty = true
      } else if(pwd === '') {
        this.verify.isPwdEmpty = true
        this.verify.isUserEmpty = false
      } else {
        this.user.tel.forEach(item => {
          if(item.value) {
            this.tel.push(item.value)
          }
        })
        postRegister({
          nickName,
          name,
          pwd,
          tel
        }).then(res => {
          console.log(res)
          this.landing = false
          if(res.data.success) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            setTimeout(() => {
              this.$router.push('/')
            },1500)
          } else {
            this.tel = []
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped lang='scss'>
.sign-warp{
  .row{
    position: relative;
    padding: 15px 30px;
    /deep/.el-input{
      .el-input__inner{
        text-align: center !important;
      }
    }
    .tip{
      position: absolute;
      left: 8%;
      bottom: 0;
      color: #f44;
      font-size: 12px;
    }
    .delete{
      color: #f44;
      position: absolute;
      right: -15px;
      font-size: 18px;
      font-weight: 600;
    }
  }
}

</style>