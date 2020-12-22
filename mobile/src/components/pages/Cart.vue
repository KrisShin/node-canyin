<template>
  <div class="cart-warp">
    <div v-if="orderList.length==0" class="empty">快去点餐吧!</div>
    <div v-else class="total">
      <el-form size="mini">
        <el-form-item label="用餐时间:">
          <el-col :span="8">
            <el-date-picker
              v-model="form.date"
              type="datetime"
              format="yyyy-MM-dd HH"
              default-time="12:00:00"
              placeholder="选择日期时间"
              :picker-options="pickerOptions0"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="用餐人数:">
          <el-col :span="8">
            <el-input type="numbers" placeholder v-model="form.numbers"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="账单合计:">
          <el-col :span="8">
            <span v-if="user.isVip" class="money">{{payMoney}}</span>
            <span v-if="!user.isVip" class="money">{{payMoney}}</span>元
          </el-col>
          <el-col :span="8">
            <el-button @click="click_pay" :loading="ording" type="primary" round>立即预定</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <div class="row" v-for="(item,index) in orderList" :key="index">
        <div class="name" v-if="item.num!=0">
          {{item.dishName}}
          <span class="pay">
            <span class="label">合计:</span>
            <span class="num">{{(item.num*item.price).toFixed(2)}}</span>元
          </span>
          <div class="btn">
            <span @click="subCart(item)" class="icon el-icon-minus"></span>
            <span class="num">{{item.num}}</span>
            <span @click="addCart(item)" class="icon el-icon-plus"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postOrder } from "@/api";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    orderList() {
      return this.$store.state.cart;
    },
    isVip() {
      return this.user.isVip;
    },

    payMoney() {
      let sum = 0;
      if (this.isVip) {
        this.orderList.forEach(item => {
          sum += item.price * item.num * item.discount;
        });
      } else {
        this.orderList.forEach(item => {
          sum += item.price * item.num;
        });
      }

      return sum.toFixed(2);
    },
    orderTime() {
      if (this.form.date) {
        let date = new Date(this.form.date);
        return date;
      }
    }
  },
  data() {
    return {
      ording: false,
      form: {
        date: "", // 时间
        numbers: "" // 人数
      },
      pickerOptions0: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let days7After = curDate + 7 * 8.64e7; // 7天后的时间
          return (
            time.getTime() < Date.now() - 8.64e7 || time.getTime() > days7After
          );
        }
      }
    };
  },
  methods: {
    addCart(item) {
      this.$store.commit("addToCart", item);
    },
    subCart(item) {
      if (item.num > 0) {
        item.num--;
        this.$store.commit("subToCart", item);
      }
    },
    click_pay() {
      let orderTime = this.orderTime;
      let now = new Date();
      if (orderTime.toLocaleDateString() === now.toLocaleDateString()) {
        if (orderTime.getHours() <= now.getHours()) {
          this.$message({
            type: "warning",
            message: "请选择今天" + now.getHours() + "点之后的时间"
          });
          return;
        }
      }
      const dishs = JSON.stringify(this.orderList);
      const numbers = this.form.numbers;
      const userId = this.user._id;
      const cost = this.payMoney;
      if (orderTime && dishs && numbers) {
        this.ording = true;
        this.api_addOrder(userId, orderTime, dishs, numbers, cost);
      } else {
        this.$message({
          type: "warning",
          message: "请完善订单信息!"
        });
      }
    },

    /**api */
    api_addOrder(userId, orderTime, dishs, numbers, cost) {
      console.log(userId, orderTime, dishs, numbers, cost);
      // return
      postOrder({
        userId,
        orderTime,
        dishs,
        numbers,
        cost
      }).then(res => {
        this.ording = false;
        if (res.data.success) {
          // 清除购物车
          this.$store.commit("clearCart");
          // 到我的订单
          this.$router.push("/user/order");
          this.$message({
            type: "success",
            message: res.data.msg
          });
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
        console.log(res);
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.cart-warp {
  height: 100%;
  .empty {
    color: #f44;
    margin-top: 30%;
    font-size: 20px;
  }
  .list {
    // position: fixed;
    background-color: rgb(214, 241, 248);
    left: 0;
    right: 0;
    top: 55px;
    bottom: 190px;
    .pay {
      font-size: 12px;
      .num {
        color: #f44;
      }
    }
    .btn {
      width: 60px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      padding: 2px 20px;
      .num {
        flex: 2;
      }
      .icon {
        color: rgb(236, 201, 46);
        background-color: rgb(76, 85, 82);
        border-radius: 4px;
        padding: 0 2px;
        flex: 1;
        line-height: 18px;
      }
    }
  }
  .total {
    position: fixed;
    width: 100%;
    height: 150px;
    bottom: 40px;
    background-color: rgb(209, 243, 210);
    .money {
      font-weight: 600;
      font-size: 20px;
      color: rgb(245, 45, 45);
    }
  }
}
</style>