<template>
  <div id="box">
    <p class="title">
      商品分类
      <el-button type="primary" @click="dialogFormVisible = true ">添加分类</el-button>
      <!-- 弹出框 添加分类 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addcls">确 定</el-button>
        </div>
      </el-dialog>
    </p>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column label="分类名称" width="180">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template scope="scope">
          <el-switch v-model="scope.row.state" :disabled="!scope.row.isedit"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="clickEdit(scope)">{{ scope.row.isedit ? '完成':'编辑'  }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { addclass, getclass, delclass, setclass } from "@/api/apis";
export default {
  data() {
    return {
      //添加分类弹出框数据
      dialogFormVisible: false,
      form: {
        name: "",
      },
      formLabelWidth: "120px",
      value: true,

      //当前页数
      currentPage4: 1,
      //每页条数
      pagesize: 10,
      //总共条数
      total: 0,
      tableData: [],
    };
  },

  created() {
    this.getclasslist();
  },

  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
      this.getclasslist();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.getclasslist();
      // console.log(`当前页: ${val}`);
    },

    //删除条数
    handleDelete(index, row) {
      //  console.log(index,row);
      delclass(row.id).then((res) => {
        if (res.data.code == 0) {
          this.getclasslist();
        }
      });
    },

    //添加分类
    addcls() {
      //弹出模态框
      this.dialogFormVisible = false;
      addclass(this.form.name, this.value).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，添加成功",
            type: "success",
          });
          this.getclasslist();
        }
      });
    },

    //封装  获取分类列表函数
    getclasslist() {
      getclass(this.currentPage4, this.pagesize).then((res) => {
        // console.log(res.data.data);
        let arr = res.data.data;
        //给每条数据添加新的属性
        for (let obj of arr) {
          obj.isedit = false;

          if (obj.state == 1) {
            obj.state = true;
          } else {
            obj.state = false;
          }
        }
        this.tableData = arr;
        // console.log(this.tableData);
        this.total = res.data.total;
      });
    },

    //编辑
    clickEdit(scope) {
      // console.log(scope.row);

      if (scope.row.isedit == true) {
        // console.log( scope.row );
        scope.row.isedit = false;

        setclass(scope.row).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你,修改成功",
              type: "success",
            });
          }
        });
      } else {
        //打开编辑状态
        scope.row.isedit = true;
      }
    },
  },
};
</script>

<style lang=less scoped>
#box {
  background-color: #fff;
}
.title {
  font-size: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}
</style>