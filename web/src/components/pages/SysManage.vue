<template>
  <div class="content-warp">
    <h1 class="top-title">系统管理</h1>
    
    <div class="table-box">
      <el-button
        type="text"
        size="small"
        class="my-btn base add"
        @click="click_add"
      >添加管理员</el-button>
      <el-table
        v-loading='loading'
        empty-text="暂无管理员"
        height="530px"
        :data="list"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
        >
        <el-table-column prop="nickName" label="用户名" min-width="120" />
        <el-table-column prop="pwd" label="密码" min-width="120" />
        <!-- <el-table-column prop="auth" label="权限" min-width="120" /> -->
        <el-table-column label="最近登录时间" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.login_time?scope.row.login_time:'暂无记录'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  min-width="150">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="my-btn edit"
              @click="click_edit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              class="my-btn delete"
              @click="click_delete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑 -->
    <el-dialog
      title="编辑管理员"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="showEdit"
      :before-close="handleEditClose"
      >
      <el-form :model="detail" size='small' label-width="80px">
        <el-form-item label="用户名:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.nickName" />
          </el-col>
         </el-form-item>
         <el-form-item label="密码:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.pwd" />
          </el-col>
         </el-form-item>
         <!-- <el-form-item label="权限:">
          <el-col :span="12">
            <el-input clearable v-model.trim="detail.auth" />
          </el-col>
         </el-form-item> -->
        <div class="save-btn" style="cursor:pointer" @click="saveEdit">提交修改</div>
      </el-form>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog
      title="添加管理员"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="showAdd"
      :before-close="handleAddClose"
      >
      <el-form :model="detail" size='small' label-width="80px">
        <el-form-item label="用户名:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="add.nickName" />
          </el-col>
         </el-form-item>
         <el-form-item label="密码:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="add.pwd" />
          </el-col>
         </el-form-item>
         <!-- <el-form-item label="权限:">
          <el-col :span="12">
            <el-input clearable v-model.trim="add.auth" />
          </el-col>
         </el-form-item> -->
        <div class="save-btn" style="cursor:pointer" @click="saveAdd">确认添加</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployee, addEmployee, editEmployee, deleteEmployee } from '@/api'
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  data() {
    return {
      loading: false,
      list: [],
      showEdit: false,
      detail: {},
      showAdd: false,
      add: {}

    }
  },
  created() {
    this.api_getDate()
  },
  methods: {
    api_getDate(type='all') {
      this.loading = true
      getEmployee({
        type: 'manager'
      }).then(res => {
        this.loading = false
        if(res.data.success) {
          this.list = res.data.res
        }
      })
    },
    click_delete(v) {
      const _id = v._id
      deleteEmployee({
        _id
      }).then(res => {
        if(res.data.success) {
          this.api_getDate()
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      })
    },
    click_add() {
      this.showAdd = true
      this.add = {}
    },
    saveAdd() {
      const {nickName, pwd} = this.add
      addEmployee({
        nickName, pwd, auth: 'manager'
      }).then(res => {
        if(res.data.success) {
          this.api_getDate()
          this.showAdd = false
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      })
    },
    click_edit(v) {  // 点击编辑
      console.log(v)
      this.detail = Object.assign({}, v)
      this.showEdit = true
    },
    saveEdit() {  // 保存编辑
      const {_id, nickName, pwd} = this.detail
      editEmployee({
        _id, nickName, pwd, auth: 'manager'
      }).then(res => {
        if(res.data.success) {
          this.api_getDate()
          this.showEdit = false
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        }
      })
    },
    handleEditClose() {
      this.showEdit = false
    },
    handleAddClose() {
      this.showAdd = false
    }
  }
}
</script>

<style lang='scss' scoped>
.table-box{
  padding-left: 100px;
  position: relative;
  .add{
    position: absolute;
    right: 300px;
    top:-28px;
    z-index: 999;
  }
  /deep/.el-table{
    padding-top: 20px;
    height: 850px !important;
    overflow-y: auto;
  }
  
}
</style>