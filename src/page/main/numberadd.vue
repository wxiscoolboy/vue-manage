<template>
  <div>
    <div class="title">添加账号</div>
    <!-- <p>
      <span>账号</span>
      <el-input v-model="num" placeholder="请输入账号" style="width:200px"></el-input>
    </p>
    <p>
      <span>密码</span>
      <el-input placeholder="请输入密码" v-model="pwd" show-password style="width:200px"></el-input>
    </p>-->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
      <el-form-item label="账号" prop="username" style="width:20%">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="width:20%">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
    </el-form>
    <p>
      <span>用户组</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </p>
    <div class="btnbox">
      <el-button type="primary" @click="addclick">添加</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
import { addnum } from "@/api/apis.js";
export default {
  data() {
    return {
      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
      },

      //用户组
      value: "",
      options: [
        {
          value: "1",
          label: "超级管理员",
        },
        {
          value: "2",
          label: "普通管理员",
        },
      ],
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名的长度在6~15个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //重置
    reset() {
      (this.addForm.username = ""), (this.addForm.password = "");
    },
    //添加账号
    addclick() {
      //  console.log((item.label));
      addnum(
        this.addForm.username,
        this.addForm.password,
        this.value == 1 ? "超级管理员" : "普通管理员"
      ).then((res) => {
        if (res.data.code == 0) {
          alert("成功");
        } else {
          alert("失败");
        }
      });
    },
  },
};
</script>

<style lang=less scoped>
div {
  background-color: #fff;
  .title {
    padding: 15px;
    border-bottom: 1px solid #e4e4e4;
    margin-bottom: 15px;
  }
  p {
    margin-bottom: 15px;
    span {
      display: inline-block;
      width: 60px;
      text-align: right;
      margin-right: 10px;
    }
  }
  .btnbox {
    margin-left: 115px;
    padding-bottom: 30px;
  }
}
</style>