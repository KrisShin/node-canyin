<template>
  <div class="content-warp">
    <h1 class="top-title">订单管理</h1>
    <div class="box-search">
      <div>
        <span class="label">买家昵称:</span>
        <el-input type="text" placeholder="买家昵称" v-model="query.nickName"></el-input>
        <span class="label">订单状态:</span>
        <el-select v-model="query.status" placeholder="请选择">
          <el-option
            v-for="item in statu"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <el-button
        type="text"
        size="small"
        class="my-btn search"
        style="margin-left:20px;"
        @click="handleSearch"
      >查询</el-button>
      <el-button
        type="text"
        size="small"
        class="my-btn search"
        style="margin-left:20px;"
        @click="handleReset"
      >重置</el-button>
    </div>
    <div class="table-box">
      <el-table
        v-loading="loading"
        empty-text="暂无订单"
        :data="list"
        height="530px"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="nickName" label="买家昵称" min-width="120" />
        <el-table-column prop="dishNames" label="菜品" min-width="150" />
        <el-table-column prop="createTime" label="下单时间" min-width="120" />
        <el-table-column prop="orderTime" label="预定时间" min-width="120" />
        <el-table-column prop="numbers" label="用餐人数" min-width="120" />
        <el-table-column prop="table" label="桌号" min-width="120">
          <template slot-scope="scope">
            <span class="tableNum">{{scope.row.table}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cost" label="交易金额" min-width="120" />
        <el-table-column label="订单状态" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status=='1'">待确认</span>
            <span v-if="scope.row.status=='2'">已完成</span>
            <span v-if="scope.row.status=='3'">已取消</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status=='1'"
              type="text"
              size="small"
              :loading="btn_loading"
              class="my-btn edit"
              @click="click_confirm(scope.row)"
            >订单确认</el-button>
            <el-button
              v-if="scope.row.status=='2'"
              type="text"
              size="small"
              :loading="btn_loading"
              class="my-btn freeze"
              @click="click_cancel(scope.row)"
            >退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      总共
      <span>{{list.length}}</span>条
    </div>
  </div>
</template>

<script>
import { getUserOrder, orderJudge, orderSort } from "@/api";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      loading: false,
      btn_loading: false,
      list: [
        {
          type: "chuan",
          dishName: "豆腐",
          price: 10,
          discount: 0.8
        }
      ],
      showEdit: false,
      detail: {},
      showAdd: false,
      add: {},
      query: {},
      statu: [
        {
          label: "待确认",
          value: 1
        },
        {
          label: "已完成",
          value: 2
        },
        {
          label: "已取消",
          value: 3
        }
      ]
    };
  },
  created() {
    this.api_getDate();
  },
  methods: {
    handleReset() {
      this.query = {};
      this.api_getDate();
    },
    handleSearch() {
      this.aip_orderSort();
    },
    click_confirm(v) {
      // 审核订单
      const _id = v._id;
      const status = "2";
      this.api_orderJudge(_id, status);
    },
    click_cancel(v) {
      // 订单退款
      const _id = v._id;
      const status = "3";
      this.api_orderJudge(_id, status);
    },
    aip_orderSort() {
      this.loading = true;
      orderSort({
        ...this.query
      }).then(res => {
        this.loading = false;
        if (res.data.success) {
          this.list = res.data.res;
        }
      });
    },
    api_orderJudge(_id, status) {
      this.btn_loading = true;
      orderJudge({
        _id,
        status
      }).then(res => {
        this.btn_loading = false;
        if (res.data.success) {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.api_getDate();
        } else {
          this.$message({
            type: "error",
            message: "操作失败"
          });
        }
      });
    },
    api_getDate(status) {
      this.loading = true;
      getUserOrder({
        status
      }).then(res => {
        this.loading = false;
        if (res.data.success) {
          this.list = res.data.res;
        }
      });
    },
    click_delete(v) {
      const _id = v._id;
      deleteDish({
        _id
      }).then(res => {
        if (res.data.success) {
          this.api_getDate();
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    click_add() {
      this.showAdd = true;
      this.add = {};
    },
    saveAdd() {
      const { type, dishName, price, discount } = this.add;
      addDish({
        type,
        dishName,
        price,
        discount
      }).then(res => {
        if (res.data.success) {
          this.api_getDate();
          this.showAdd = false;
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    click_edit(v) {
      // 点击编辑
      console.log(v);
      this.detail = Object.assign({}, v);
      this.showEdit = true;
    },
    saveEdit() {
      // 保存编辑
      const { _id, type, dishName, price, discount } = this.detail;
      editDish({
        _id,
        type,
        dishName,
        price,
        discount
      }).then(res => {
        if (res.data.success) {
          this.api_getDate();
          this.showEdit = false;
          this.$message({
            type: "success",
            message: res.data.msg
          });
        }
      });
    },
    handleEditClose() {
      this.showEdit = false;
    },
    handleAddClose() {
      this.showAdd = false;
    }
  }
};
</script>

<style lang='scss' scoped>
.box-search {
  padding-left: 100px;
  display: flex;
  justify-content: flex-start;
  .label {
    padding-right: 4px;
    padding-left: 8px;
    color: #666;
    position: relative;
    top: -7px;
  }
}
.box-search {
  padding-left: 100px;
}
.table-box {
  padding-left: 100px;
  position: relative;
  .add {
    position: absolute;
    right: 300px;
    top: -20px;
    z-index: 999;
  }
  /deep/.el-table {
    // height: 530px !important;
    overflow-y: auto;
  }
}
</style>