<template>
  <div>
    <p class="title">账号列表</p>

    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 复选框 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 账号 -->
      <el-table-column prop="account" label="账号" width="180"></el-table-column>

      <!-- 用户组 -->
      <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>

      <!-- 创建时间 -->
      <el-table-column prop="ctime" label="创建时间"></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑的页面 -->
    <el-dialog width="460px" title="编辑账号" :visible.sync="dialogFormVisible">
      <!-- 表单 -->
      <el-form style="width: 337px;" :model="editForm">
        <!-- 账号 -->
        <el-form-item label="账号" label-width="120px">
          <el-input v-model="editForm.account" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 用户组 -->
        <el-form-item item label="用户组" label-width="120px">
          <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <div class="btnbox">
      <el-button type="danger" @click="moredel">批量删除</el-button>
      <el-button type="primary">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { getlist, delnum, moredels, update } from "@/api/apis.js";
import {getchinatime} from '@/utils/utils'
export default {
  data() {
    return {
      //表格数据
      tableData: [
        {
          id: "",
          //数据
          account: "",
          userGroup: "",
          ctime: "",
        },
      ],
      //分页器数据 当前页码
      currentPage: 1,
      // 每页条数
      pagenum: 5,
      //总共页数
      total: 0,
      //所有数据的id
      ids: [],

      //编辑框数据
      editForm: {
        id: "",
        account: "",
        userGroup: "",
      },
      dialogFormVisible: false, // 控制编辑模态框的显示和隐藏
    };
  },
  created() {
    getlist(this.currentPage, this.pagenum).then((res) => {
      // console.log(res.data);
      for(let obj of res.data.data){
        obj.ctime=getchinatime(obj.ctime)
      }

      this.tableData = res.data.data;
      this.total = res.data.total;
    });
  },
  methods: {
    //编辑按钮
    handleEdit(row) {
      // console.log(row);
      this.editForm = { ...row }; // 赋值给编辑表单 回填数据
      // 显示模态框
      this.dialogFormVisible = true;
    },

    //确定编辑
    saveEdit() {
      // console.log(this.editForm.id,this.editForm.account,this.editForm.userGroup);
      this.dialogFormVisible = false;
      update(
        this.editForm.id,
        this.editForm.account,
        this.editForm.userGroup
      ).then((res) => {
        if (res.data.code === 0) {
          // alert('成功')
          getlist(this.currentPage, this.pagenum).then((res) => {
            // console.log(res.data);
            this.tableData = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },

    //删除按钮
    handleDelete(index, row) {
      // console.log(index, row);
      delnum(row.id).then((res) => {
        if (res.data.code === 0) {
          // this.tableData.splice(this.tableData[index], 1);
          getlist(this.currentPage, this.pagenum).then((res) => {
            // console.log(res.data);
            this.tableData = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },

    //选中的id
    handleSelectionChange(rows) {
      console.log(rows);
      this.ids = rows.map((item) => item.id);
      // console.log(this.ids);
    },

    //批量删除
    moredel() {
      moredels(JSON.stringify(this.ids)).then((res) => {
        if (res.data.code === 0) {
          // alert('成功')
          getlist(this.currentPage, this.pagenum).then((res) => {
            // console.log(res.data);
            this.tableData = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },

    //分页器按钮
    handleSizeChange(val) {
      //改变当前条数
      this.pagenum = val;
      getlist(this.currentPage, this.pagenum).then((res) => {
        // console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //改变当前页数
      this.currentPage = val;
      //请求当前页面新数据
      getlist(this.currentPage, this.pagenum).then((res) => {
        // console.log(res.data);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
      console.log(`当前页: ${val}`);
    },
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
.btnbox {
  padding: 15px;
}
</style>