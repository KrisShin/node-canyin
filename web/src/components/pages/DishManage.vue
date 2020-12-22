<template>
  <div class="content-warp">
    <h1 class="top-title">菜品管理</h1>
    <div class="box-search">
      <div>
        <span class="label">菜名:</span>
        <el-input type="text" placeholder="菜品名称" v-model="query.dishName"></el-input>
        <span class="label">菜系:</span>
        <el-select v-model="query.type" placeholder="请选择">
          <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
      <el-button type="text" size="small" class="my-btn base add" @click="click_add">添加菜品</el-button>
      <el-table
        v-loading="loading"
        empty-text="暂无菜品"
        :data="list"
        height="530px"
        row-class-name="myRow"
        cell-class-name="myCell"
        style="width: 100%;"
      >
        <el-table-column label="菜系" min-width="120">
          <template slot-scope="scope">
            <span>{{scope.row.type=='chuan'?'川菜':scope.row.type=='yue'?'粤菜':scope.row.type=='xiang'?'湘菜':scope.row.type=='min'?'闽菜':scope.row.type=='zhe'?'浙菜':scope.row.type=='hui'?'徽菜':scope.row.type=='lu'?'鲁菜':scope.row.type=='su'?'苏菜': ''}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dishName" label="菜名" min-width="120" />
        <el-table-column label="图片" min-width="120">
          <template slot-scope="scope">
            <div style="width:40px;height:40px;backgroung:#ccc">
              <img :src="scope.row.imgUrl" style="width:100%;height:100%" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" min-width="120" />
        <el-table-column prop="discount" label="会员折扣" min-width="120" />
        <el-table-column label="主要原料" min-width="120">
          <template slot-scope="scope">
            <p>{{scope.row.materials}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
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

    <!-- 编辑菜品 -->
    <el-dialog
      title="编辑菜品"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="showEdit"
      :before-close="handleEditClose"
    >
      <el-form :model="detail" size="small" label-width="80px">
        <el-form-item label="菜系:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.type" disabled />
          </el-col>
        </el-form-item>
        <el-form-item label="菜名:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.dishName" />
          </el-col>
        </el-form-item>
        <el-form-item label="单价:">
          <el-col :span="12">
            <el-input clearable v-model.trim="detail.price" />
          </el-col>
        </el-form-item>
        <el-form-item label="主要原料:">
          <el-col :span="12">
            <el-input clearable placeholder="用逗号分割" v-model.trim="detail.materials" />
          </el-col>
        </el-form-item>
        <el-form-item label="会员折扣:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail.discount" />
          </el-col>
        </el-form-item>
        <el-form-item
          label="上传图片:"
          id="myImg"
          class="my-img"
          style="height:40px !important;margin-top:10px;"
        >
          <!-- 图片列表box -->
          <div class="up-img">
            <img ref="oldPic" class="old-pic" :src="detail.imgUrl" alt />
            <el-upload
              ref="addUpload"
              :limit="1"
              action="#"
              :on-remove="handleRemove"
              :on-change="handleChange"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item style="display: none" label="id:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="detail._id" />
          </el-col>
        </el-form-item>
        <div class="save-btn" style="cursor:pointer" @click="saveEdit">提交修改</div>
      </el-form>
    </el-dialog>
    <!-- 添加菜品 -->
    <el-dialog
      title="添加菜品"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="showAdd"
      :before-close="handleAddClose"
    >
      <el-form :model="detail" size="small" label-width="80px">
        <el-form-item label="菜系:">
          <el-col :span="12">
            <el-select v-model="add.type" placeholder="请选择">
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="菜名:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="add.dishName" />
          </el-col>
        </el-form-item>
        <el-form-item label="单价:">
          <el-col :span="12">
            <el-input clearable v-model.trim="add.price" />
          </el-col>
        </el-form-item>
        <el-form-item label="主要原料:">
          <el-col :span="12">
            <el-input clearable placeholder="用逗号分割" v-model.trim="add.materials" />
          </el-col>
        </el-form-item>
        <el-form-item label="会员折扣:">
          <el-col :span="12">
            <el-input type="text" v-model.trim="add.discount" />
          </el-col>
        </el-form-item>
        <el-form-item
          label="上传图片:"
          id="myImg"
          class="my-img"
          style="height:40px !important;margin-top:10px;"
        >
          <!-- 图片列表box -->
          <div class="up-img">
            <img ref="oldPic" style="display: none" class="old-pic" :src="detail.headImg" alt />
            <el-upload
              ref="addUpload"
              :limit="1"
              action="#"
              :on-remove="handleRemove"
              :on-change="handleChange"
              list-type="picture-card"
              :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus" />
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                    <i class="el-icon-delete" />
                  </span>
                </span>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <div class="save-btn" style="cursor:pointer" @click="saveAdd">确认添加</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDishList,
  editDish,
  addDish,
  deleteDish,
  editSingleHeadImg
} from "@/api";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      loading: false,
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
        }
      ],
      fileLists: [],
      isHaveNic: false,
      isHaveImg: false,
      imgData: ""
    };
  },
  created() {
    this.api_getDate();
  },
  methods: {
    clearImgCach() {
      this.fileLists = [];
      this.$refs.addUpload.clearFiles();
    },
    //  图片相关
    handleRemove(file, fileList) {
      this.clearImgCach();
      this.$refs.oldPic.style.display = "block";
    },
    // 本地选中的图片变化
    handleChange(file, fileList) {
      this.$refs.oldPic.style.display = "none";
      const timeStamp = new Date() - 0;
      const copyFile = new File([file.raw], `${timeStamp}_${file.name}`);
      this.fileLists[0] = copyFile;
    },
    handleChangeImg(file) {
      this.isHaveImg = true;
      const timeStamp = new Date() - 0;
      const copyFile = new File([file.raw], `${timeStamp}_${file.name}`);
      this.fileListsImg[0] = copyFile;
    },
    handleReset() {
      this.query = {};
      this.api_getDate();
    },
    handleSearch() {
      const type = this.query.type;
      this.api_getDate(type);
    },
    api_getDate(type = "all") {
      this.loading = true;
      const dishName = this.query.dishName || "";
      getDishList({
        type,
        dishName
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
      this.clearImgCach();
    },
    saveAdd() {
      const { type, dishName, price, discount, materials } = this.add;
      let myFormData = new FormData();
      console.log(this.fileLists);
      if (this.fileLists.length > 0) {
        myFormData.append("file_name", this.fileLists[0].name);
        myFormData.append("file", this.fileLists[0]);
      }

      if (type && dishName && price && discount && materials) {
        myFormData.append("type", type);
        myFormData.append("price", price);
        myFormData.append("discount", discount);
        myFormData.append("materials", materials);
        myFormData.append("dishName", dishName);
        addDish(myFormData).then(res => {
          if (res.data.success) {
            this.api_getDate();
            this.showAdd = false;
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请完善菜品信息"
        });
      }
    },
    click_edit(v) {
      // 点击编辑
      console.log(v);
      this.detail = Object.assign({}, v);
      this.detail.materials = v.materials.join(",");
      this.showEdit = true;

      this.clearImgCach();
    },
    saveEdit() {
      // 保存编辑
      const { _id, type, dishName, price, discount, materials } = this.detail;
      let myFormData = new FormData();
      if (this.fileLists.length > 0) {
        myFormData.append("file_name", this.fileLists[0].name);
        myFormData.append("file", this.fileLists[0]);
      }
      if (type && dishName && price && discount && materials) {
        myFormData.append("_id", _id);
        myFormData.append("type", type);
        myFormData.append("price", price);
        myFormData.append("discount", discount);
        myFormData.append("materials", materials);
        myFormData.append("dishName", dishName);
        editDish(myFormData).then(res => {
          if (res.data.success) {
            this.api_getDate();
            this.showEdit = false;
            this.$message({
              type: "success",
              message: res.data.msg
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请完善菜品信息"
        });
      }
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
@import "@/assets/css/my-upload.scss";
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
/deep/.table-box {
  padding-left: 100px;
  position: relative;
  .el-table__body-wrapper {
    padding-bottom: 25px;
  }
  .add {
    position: absolute;
    right: 300px;
    top: -28px;
    z-index: 999;
  }
  // /deep/.el-table {
  // height: 800px !important;
  // }
}
</style>