<template>
  <div class="user-order-page">
    <BackButton />
    <div v-if="orders.length">
      <div class="order-list">
        <div class="row" v-for="(item, index) in orders" :key="index">
          <p>
            <span class="label">菜品:</span>
            <span class="name">{{item.dishNames}}</span>
          </p>
          <p>
            <span class="label">消费金额:</span>
            <span class="num">{{item.cost}}</span>
          </p>
          <p>
            <span class="label">订单状态:</span>
            <span class="status">{{item.status=='1'?'待用餐':item.status=='2'?'已完成':'已取消'}}</span>
          </p>
          <p>
            <span class="label">桌号:</span>
            <span class="table" style="line-break: anywhere">{{item.table.join(',')}}</span>
          </p>

          <P>
            <span class="label">下单时间:</span>
            <span class="time">{{item.createTime}}</span>
          </P>
          <P>
            <span class="label">用餐时间:</span>
            <span class="time" style="flex:1">{{item.orderTime}}</span>
            <el-button
              v-if="item.status=='1'"
              @click="showDialog(item._id)"
              type="danger"
              size="mini"
              round
            >取消订单</el-button>
          </P>
        </div>
      </div>
    </div>
    <div v-else>暂无订单</div>
    <el-dialog title="提示" :visible.sync="dialogConfirmVisible" width="80%">
      <span>确认取消该订单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="click_cancelOrder">确 定</el-button>
        <el-button type="primary" @click="dialogConfirmVisible = false">再考虑一下</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserOrder, cancelOrder } from "@/api";
import BackButton from "@/components/buttons/Back.vue";
export default {
  components: {
    BackButton
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      orders: [],
      cancle_id: null,
      dialogConfirmVisible: false
    };
  },
  created() {
    const userId = this.user._id;
    getUserOrder({
      userId
    }).then(res => {
      if (res.data.success) {
        this.orders = res.data.res;
      }
    });
  },
  methods: {
    click_cancelOrder() {
      this.dialogConfirmVisible = false;
      cancelOrder({ _id: this.cancle_id }).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          window.location.reload();
        }
      });
    },
    showDialog(_id) {
      this.dialogConfirmVisible = true;
      this.cancle_id = _id;
    }
  }
};
</script>

<style lang="scss" scoped>
.order-list {
  padding: 25px 25px;
  position: fixed;
  left: 0;
  right: 0;
  top: 35px;
  bottom: 40px;
  background-color: #e6e4e4;
  overflow-y: auto;
  .row {
    padding: 5px;
    margin-bottom: 25px;
    border: solid;
    border-width: thin;
    background-color: rgb(225, 226, 226);
    p {
      display: flex;
      justify-content: flex-start;
      .label {
        padding: 0 4px;
        background-color: rgb(225, 226, 226);
        min-width: fit-content;
      }
      .table {
        font-weight: 600;
        color: #8bbb87;
      }
      span {
        text-align: left;
      }
    }
  }
}
// .order-list :nth-child(1){
//   background-color: rgb(231, 187, 130);
//   color: 000;
// }
</style>