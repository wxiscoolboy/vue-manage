<template>
  <div>
    <p class="title">修改密码</p>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldpwd">
        <el-input
          type="password"
          v-model="ruleForm.oldpwd"
          autocomplete="off"
          style="width:20%"
          @blur="checkoldpwd"
        ></el-input>
        <span class="error" v-show="show">原密码不正确</span>
      </el-form-item>

      <el-form-item label="新密码" prop="newpwd">
        <el-input type="password" v-model="ruleForm.newpwd" autocomplete="off" style="width:20%"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" style="width:20%"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { checkpwd, updatepwd } from "@/api/apis.js";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      //提示显示
      show: false,

      ruleForm: {
        //旧密码
        oldpwd: "",
        //新密码
        newpwd: "",
        //确认密码
        checkPass: "",
      },
      rules: {
        oldpwd: [{ validator: validatePass, trigger: "blur" }],
        newpwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //修改密码
          updatepwd(this.ruleForm.newpwd,parseInt(localStorage.id) ).then((res) => {
            console.log(this.ruleForm.newpwd);
            console.log(res);
            if (res.data.code === 0) {
              alert("修改成功");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //验证原来密码
    checkoldpwd() {
      checkpwd(this.ruleForm.oldpwd,parseInt(localStorage.id) ).then((res) => {
        if (res.data.code == 0) {
          this.show = false;
        } else {
          this.show = true;
        }
      });
    },
  },
};
</script>

<style scoped>
div {
  background-color: #fff;
}
.title {
  padding: 15px;
  font-size: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e4e4;
}
.error {
  font-size: 12px;
  color: red;
}
</style>