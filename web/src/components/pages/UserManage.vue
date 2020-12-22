<template>
  <div class="content-warp">
    <h1 class="top-title">用户管理</h1>
    
    <div class="table-box">
      <el-table
        v-loading='loading'
        empty-text="暂无用户"
        height="530px"
        :data="list"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%; height:100%;"
        >
        <el-table-column prop="nickName" label="用户名" min-width="120" />
        <el-table-column prop="nickName" label="身份" min-width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.isVip">vip</span>
            <span v-else>普通用户</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" min-width="120" />
        <el-table-column label="联系电话" min-width="120" >
          <template slot-scope="scope">
             <p>{{scope.row.tel}}</p>
          </template>
        </el-table-column>
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
      title="编辑用户"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="showEdit"
      :before-close="handleEditClose"
      >
      <el-form :model="detail" size='small' label-width="80px">
        <el-form-item label="用户昵称:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.nickName" />
          </el-col>
         </el-form-item>
         <el-form-item label="姓名:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.name" />
          </el-col>
         </el-form-item>
         <el-form-item label="vip管理:">
          <el-col :span="12">
            <el-switch @change="changeVip" v-model="detail.isVip"></el-switch>
          </el-col>
         </el-form-item>
         
         <el-form-item label="密码:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.pwd" />
          </el-col>
         </el-form-item>
        <div class="save-btn" style="cursor:pointer" @click="saveEdit">提交修改</div>
      </el-form>
    </el-dialog>
    
  </div>
</template>

<script>
import { deleteUser, getUser, editUser } from '@/api'
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
    changeVip(v) {
      console.log(v)
      this.detail.isVip = v
    },
    api_getDate() {
      this.loading = true
      getUser({
      }).then(res => {
        this.loading = false
        if(res.data.success) {
          this.list = res.data.res
        }
      })
    },
    click_delete(v) {
      const _id = v._id
      deleteUser({
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
      const {type, dishName, price, discount} = this.add
      addDish({
        type, dishName, price, discount
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
      const {_id, nickName, name, pwd, isVip} = this.detail
      editUser({
        _id, nickName, name, pwd, isVip
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