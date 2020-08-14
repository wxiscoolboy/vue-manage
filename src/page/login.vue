<template>
  <div id="box">
    <div class="login">
      <h3>wx系统登录</h3>
      <el-input v-model="acc" placeholder="请输入内容" prefix-icon="el-icon-user-solid" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="pwd" show-password prefix-icon="el-icon-lock"></el-input>
      <p class="error-p">{{ errormsg }}</p>
      <el-button type="primary" style="width:100%" @click="clicklogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import {login} from "@/api/apis.js";
export default {
  data() {
    return {
      acc: "", //账号
      pwd: "", //密码
      errormsg: "", //报错
    };
  },
  methods: {
  
    clicklogin() {
        //发送请求 但是 这种方式 发送一次写一次 所以需要封装函数  在api里面封装
      // axios.post("http://127.0.0.1:5000/users/checkLogin", {
      //     account: this.acc,
      //     password: this.pwd,
      //   })
      login(this.acc,this.pwd).then((res) => {
          if (res.data.code == 0) {
            //写入token
             localStorage.token=res.data.token  //写入token
             localStorage.role=res.data.role //写入用户组
             localStorage.acc=this.acc  //存入用户名
             localStorage.id=res.data.id //存入id        
             console.log(res.data);
             
            this.$router.push("main/backstage");
            //用户登录成功
            this.$message({
              message: "用户登录成功!",
              type: "success",
            });
          } else {
            this.errormsg = res.data.msg;
          }
        });
    },
  },
};
</script>

<style lang=less scoped>
#box {
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login {
  width: 300px;
  text-align: center;
  h3 {
    margin-bottom: 30px;
  }
  .el-input {
    width: 300px;
    margin-bottom: 15px;
  }
  .error-p {
    color: red;
    font-size: 12px;
  }
}
</style>