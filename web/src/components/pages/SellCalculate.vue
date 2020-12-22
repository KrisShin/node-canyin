<template>
  <div class="content-warp">
    <h1 class="top-title">销售统计</h1>
    <div class="box-search">
      <div>
        <span class="label">菜系:</span>
        <el-select v-model="query.type" placeholder="请选择">
          <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <span class="label">菜名:</span>
        <el-input placeholder v-model.trim="query.dishName" clearable />
        <span class="label">日期:</span>
        <el-date-picker
          v-model="period"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
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
        empty-text="暂无记录"
        height="530px"
        :data="list"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column label="菜系" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.type=='chuan'?'川菜':scope.row.type=='yue'?'粤菜':scope.row.type=='xiang'?'湘菜':scope.row.type=='min'?'闽菜':scope.row.type=='zhe'?'浙菜':scope.row.type=='hui'?'徽菜':scope.row.type=='lu'?'鲁菜':scope.row.type=='su'?'苏菜': ''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dishName" label="菜名" min-width="120" />
        <el-table-column sortable prop="sellCount" label="销售数量" min-width="120" />
        <el-table-column sortable prop="sellMoney" label="销售额" min-width="120">
          <template slot-scope="scope">{{scope.row.sellMoney|fix2}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      共计
      <span>{{ totalMoney | fix2}}</span>元
    </div>
  </div>
</template>

<script>
import { getCaculate, getCaculateSort, getMonthSell, getDaySell } from "@/api";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      query: {},
      type: [
        {
          value: "chuan",
          label: "川菜"
        },
        {
          value: "yue",
          label: "粤菜"
        },
        {
          value: "xiang",
          label: "湘菜"
        },
        {
          value: "lu",
          label: "鲁菜"
        },
        {
          value: "su",
          label: "苏菜"
        },
        {
          value: "zhe",
          label: "浙菜"
        },
        {
          value: "hui",
          label: "徽菜"
        },
        {
          value: "min",
          label: "闽菜"
        },
        {
          value: undefined,
          label: "不限"
        }
      ],
      period: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now(); // 只取今天之前的日期
        },
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 8.64e7);
              picker.$emit("pick", date);
            }
          },
          {
            text: "本月",
            onClick(picker) {
              const date = new Date();
              const pickDate = new Date(
                date.getMonth() + 1 + "/1/" + date.getFullYear()
              );
              picker.$emit("pick", pickDate.toLocaleDateString());
            }
          },
          {
            text: "上月",
            onClick(picker) {
              const date = new Date();
              const pickDate = new Date(
                date.getMonth() + "/1/" + date.getFullYear()
              );
              picker.$emit("pick", pickDate.toLocaleDateString());
            }
          }
        ]
      },
      totalMoney: 0
    };
  },
  filters: {
    fix2(value) {
      return value.toFixed(2);
    }
  },
  created() {
    this.api_getDate();
  },
  methods: {
    handleSearch() {
      if (this.period) {
        if (typeof this.period === "object") {
          this.api_getDaySell(this.period.toLocaleDateString());
        } else if (typeof this.period === "string") {
          this.api_getMonthSell(this.period);
        }
      } else {
        this.api_sort();
      }
    },
    handleReset() {
      this.query = {};
      this.api_sort();
    },
    api_sort() {
      this.loading = true;
      const query = this.query;
      getCaculateSort({
        ...query
      }).then(res => {
        if (res.data.success) {
          this.list = res.data.res;
        }
        this.getTotalMoney();
        this.loading = false;
      });
    },
    api_getDate() {
      this.loading = true;
      getCaculate({}).then(res => {
        if (res.data.success) {
          this.list = res.data.res;
        }
        this.getTotalMoney();
        this.loading = false;
      });
    },
    api_getDaySell(day) {
      this.loading = true;
      getDaySell({ day }).then(res => {
        if (res.data.success) {
          this.list = res.data.accounts;
        } else {
          this.$message({
            type: "warning",
            message: "当日无销量"
          });
        }
        this.getTotalMoney();
        this.loading = false;
      });
    },
    api_getMonthSell(month) {
      this.loading = true;
      getMonthSell({ month }).then(res => {
        if (res.data.success) {
          this.list = res.data.accounts;
        } else {
          this.$message({
            type: "warning",
            message: "当月无销量"
          });
        }
        this.getTotalMoney();
        this.loading = false;
      });
    },
    getTotalMoney() {
      let total = 0;
      this.list.forEach(item => {
        total += parseFloat(item.sellMoney);
      });
      this.totalMoney = total;
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
.table-box {
  padding-left: 100px;
  position: relative;
  /deep/.el-table {
    // height: 530px !important;
    overflow-y: auto;
  }
}
</style>