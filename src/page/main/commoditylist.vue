<template>
  <div>
    <p>商品列表</p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.imgUrl" alt />
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="180">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.name}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.name" />
        </template>
      </el-table-column>
      <el-table-column label="所属分类" width="180">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.category}}</span>
          <el-select v-model="value" placeholder="请选择" v-show="scope.row.isedit">
            <el-option v-for="item in options" :key="item.cateName" :value="item.cateName"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="商品价格">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.price}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.price" />
        </template>
      </el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img
            :src="getcompic+scope.row.imgUrl"
            v-show="!scope.row.isedit"
            alt
            style="width: 50px;height: 50px"
          />
          <!-- 编辑时重新上传图片 -->
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            v-show="scope.row.isedit"
          >
            <i v-show="imgurl == ''" class="el-icon-plus"></i>
            <img style="width: 100px" v-show="imgurl != ''" :src="getcompic+imgurl" />
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="商品描述">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.goodsDesc}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.goodsDesc" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="clickEdit(scope)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 200, 300, 400]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getcomlist,
  delcom,
  setcom,
  checkclass,
  compic,
  getcompic,
} from "@/api/apis";
import { getchinatime } from "@/utils/utils";
export default {
  data() {
    return {
      tableData: [],
      //每页条数
      pagesize: 10,
      //当前页数
      currentPage: 1,
      //总共条数
      total: 0,

      //图片上传地址
      action: "",
      //下载图片的地址
      getcompic: "",
      //编辑图片重新上传图片数据
      imageUrl: "",

      //商品图片
      imgurl: "",
      //修改分类数据
      value: "",
      options: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
      // console.log(`当前页: ${val}`);
    },

    //图片上传成功
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        //重新要上传的图片数据赋值
        this.imgurl = res.imgUrl;

      }
    },

    //封装获得商品列表函数
    getlist() {
      getcomlist(this.currentPage, this.pagesize).then((res) => {
        // console.log(res);
        for (let obj of res.data.data) {
          obj.ctime = getchinatime(obj.ctime);
          //添加属性
          obj.isedit = false;
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },

    //编辑修改数据
    clickEdit(scope) {
      //查询所有分类
      // console.log(scope.row);
      checkclass().then((res) => {
        // console.log(res);
        this.options = res.data.categories;
        this.value = scope.row.category;
      });
      if (scope.row.isedit) {
        scope.row.isedit = false;
        setcom(
          scope.row.name,
          scope.row.category,
          scope.row.price,
          scope.row.imgUrl,
          scope.row.goodsDesc,
          scope.row.id
        ).then((res) => {
          if (res.data.code == 0) {
            console.log(scope.row.imgUrl);
            this.$message({
              message: "恭喜你，修改成功",
              type: "success",
            });
            //重新加载商品列表、
            // this.getlist();
          }
        });
      } else {
        scope.row.isedit = true;
      }
    },

    //删除
    handleDelete(i, r) {
      this.$confirm("此操作将永久删除这个商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //删除商品函数
          delcom(r.id).then((res) => {
            console.log(res);
            if (res.data.code == 0) {
              this.getlist();
            }
          });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  created() {
    //图片下载地址获取
    this.getcompic = getcompic;
    //图片上传地址获取
    this.action = compic;
    //获取商品列表
    this.getlist();
  },
};
</script>

<style lang=less scoped>
div {
  background-color: #fff;
  p {
    padding: 15px;
    border-bottom: 1px solid #e4e4e4;
    margin-bottom: 15px;
  }
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>