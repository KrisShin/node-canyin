<template>
  <div class="content-warp">
    <h1 class="top-title">采购管理</h1>

    <div class="table-box">
      <div class="tools-box">
        <span class="label">购买日期查询：</span>
        <el-date-picker
          v-model="period"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
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
          style="margin-left:50%;"
          @click="click_add"
        >+ 添加原材料</el-button>
      </div>

      <el-table
        v-loading="loading"
        empty-text="暂无采购"
        height="530px"
        :data="list"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
      >
        <el-table-column prop="name" label="原料名" min-width="120" />
        <el-table-column prop="number" label="数量" min-width="120" />
        <el-table-column prop="buyTime" label="购买时间" min-width="120" />
        <el-table-column prop="operateTime" label="操作时间" min-width="120" />
        <el-table-column prop="operator" label="操作人员" min-width="120" />
        <el-table-column prop="price" label="单价" min-width="120" />
        <el-table-column prop="total" label="总价" min-width="120" />
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="my-btn edit"
              @click="click_edit(scope.row)"
            >编辑</el-button>
            <el-button type="danger" size="mini" class="delete" @click="click_delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑 -->
    <el-dialog
      title="编辑原料"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="showEdit"
      :before-close="handleEditClose"
    >
      <el-form :model="detail" size="small" label-width="80px">
        <el-form-item label="原料名:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.name" />
          </el-col>
        </el-form-item>
        <el-form-item label="数量:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.number" />
          </el-col>
        </el-form-item>
        <el-form-item label="单价:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.price" />
          </el-col>
        </el-form-item>
        <div class="save-btn" style="cursor:pointer" @click="saveEdit">提交修改</div>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加原料"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="showAdd"
      :before-close="handleAddClose"
    >
      <el-form :model="detail" size="small" label-width="80px">
        <el-form-item label="原料名:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="add.name" />
          </el-col>
        </el-form-item>
        <el-form-item label="数量:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="add.number" />
          </el-col>
        </el-form-item>
        <el-form-item label="单价:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="add.price" />
          </el-col>
        </el-form-item>
        <div class="save-btn" style="cursor:pointer" @click="saveAdd">确认添加</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMaterialList,
  editMaterial,
  addMaterialList,
  deleteMaterial,
  getMaterialDayList
} from "@/api";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      period: null,
      loading: false,
      list: [],
      showEdit: false,
      detail: {},
      showAdd: false,
      add: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now(); // 只取今天之前的日期
        }
      }
    };
  },
  created() {
    this.api_getDate();
  },
  methods: {
    handleSearch() {
      if (!this.period) {
        this.api_getDate();
        return;
      }
      this.api_getBuyOfDay(this.period);
    },
    api_getBuyOfDay(date) {
      this.loading = true;
      getMaterialDayList({ date }).then(res => {
        this.loading = false;
        if (res.data.success) {
          this.list = res.data.res;
        }
      });
    },
    api_getDate() {
      this.loading = true;
      getMaterialList({}).then(res => {
        this.loading = false;
        if (res.data.success) {
          this.list = res.data.res;
        }
      });
    },
    click_delete(v) {
      const _id = v._id;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "警告", {
        confirmButtonText: "取消",
        cancelButtonText: "确定",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        })
        .catch(() => {
          deleteMaterial({
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
        });
    },
    click_add() {
      this.showAdd = true;
      this.add = {};
    },
    saveAdd() {
      const { name, number, price } = this.add;
      addMaterialList({
        name,
        number,
        price,
        operator: this.user.nickName
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
      this.detail = Object.assign({}, v);
      this.showEdit = true;
    },
    saveEdit() {
      // 保存编辑
      const { _id, name, number, price } = this.detail;
      editMaterial({
        _id,
        name,
        number,
        price,
        operator: this.user.nickName
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
.label {
  padding-right: 4px;
  padding-left: 8px;
  color: #666;
  position: relative;
  top: 8px;
}
.table-box {
  padding-left: 100px;
  position: relative;
  .tools-box {
    display: flex;
  }
  /deep/.el-table {
    // padding-top: 20px;
    // height: 530px !important;
    // overflow-y: auto;
  }
}
</style>