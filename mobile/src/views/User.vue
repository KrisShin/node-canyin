<template>
  <div class="user-warp">
    <div class="content">
      <el-button size="mini" @click="click_signout" type="warning">退出登录</el-button>
    </div>
    <div class="content">
      <el-button size="mini" @click="click_order" type="primary">我的订单</el-button>
    </div>
    <div class="content">
      <el-button size="mini" @click="click_change" type="primary">修改密码</el-button>
    </div>
    <div class="change" v-if="showInput">
      <div class="item">
        <span>原密码:</span>
        <el-input placeholder="原密码" v-model="opwd" clearable></el-input>
      </div>
      <div class="item">
        <span>新密码:</span>
        <el-input placeholder="新密码" v-model="npwd" clearable></el-input>
      </div>
      <div class="item">
        <span>确认密码:</span>
        <el-input placeholder="确认密码" v-model="cpwd" clearable></el-input>
      </div>
      <div class="content">
        <el-button size="mini" @click="doChangePwd" type="warning">确认修改</el-button>
      </div>
    </div>
    <el-form>
      <el-form-item :label="txt">
        <el-switch @change="changeVip" v-model="isVip"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postVip, changePwd,log } from "@/api";
export default {
  name: "User",
  computed: {
    txt() {
      if (this.isVip) {
        return "取消vip";
      } else {
        return "开通vip";
      }
    },
    user: {
      get() {
        return this.$store.state.user;
      },
      set() {}
    },
    isVip: {
      get() {
        return this.$store.state.user.isVip;
      },
      set() {}
    }
  },
  data() {
    return {
      showInput: false,
      opwd: "",
      npwd: "",
      cpwd: ""
    };
  },
  methods: {
    doChangePwd() {
      if (this.opwd || this.npwd || this.cpwd) {
        if (this.npwd !== this.cpwd) {
          this.$message({
            message: "确认密码错误",
            type: "error"
          });
          return;
        }
        if (this.opwd===this.npwd){
          this.$message({
            message: "新密码与原密码不能相同",
            type: "error"
          });
          return;
        }
        changePwd({
          _id: this.user._id,
          opwd: this.opwd,
          npwd: this.npwd
        }).then(res => {
          if (res.data.success) {
            this.showInput = false;
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.click_signout()
          } else {
            this.$message({
              message: "原密码错误",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          message: "密码不能为空",
          type: "warning"
        });
        return;
      }
    },
    click_change() {
      this.showInput = !this.showInput;
      this.opwd = "";
      this.npwd = "";
      this.cpwd = "";
    },
    click_order() {
      this.$router.push("/user/order");
    },
    click_signout() {
      this.$store.commit("userSignout");
      this.$router.push("/");
    },
    changeVip(v) {
      this.$store.commit("changeVip", v);
      postVip({
        isVip: v,
        userId: this.$store.state.user._id
      }).then(res => {
        if (res.data.success) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        }
      });
    }
  }
};
</script>

<style scoped lang='scss'>
.content {
  position: relative;
  margin:20px 0;
}
.change {
  display: flex;
  flex-direction: column;
  padding: 20px;
  span {
    width: 80px;
  }
  .item {
    display: flex;
    margin: 5px;
  }
}
</style>
