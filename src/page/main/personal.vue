<template>
  <div>
    <p>
      <span>管理员信息</span>
    </p>
    <p>
      <span>管理员ID:</span>
      {{userdata.id}}
    </p>
    <p>
      <span>账号:</span>
      {{userdata.account}}
    </p>
    <p>
      <span>用户组:</span>
      {{userdata.userGroup}}
    </p>
    <p>
      <span>创建时间:</span>
      {{userdata.ctime}}
    </p>
    <p class="pic">
      <span>管理员头像</span>
      <el-upload
        class="avatar-uploader"
        action="http://127.0.0.1:5000/users/avatar_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :data="headdata"
      >
     
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </p>
  </div>
</template>

<script>
import { getuser } from "@/api/apis.js";
export default {
  data() {
    return {
      //用户信息
      userdata: {
        id: "",
        account: "",
        userGroup: "",
        ctime: "",
        imgUrl: "",
      },
      //头像数据
      headdata: {},

      imageUrl: "",
    };
  },

  created() {
    this.headdata = { id: localStorage.id };

    this.getuserdata();
  },
  methods: {
    //头像上传成功
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      if (res.code == 0) {
        //2.发出通知 告诉父组件头像上传成功
        this.$bus.$emit("headsucssess");
      }

      this.imageUrl = URL.createObjectURL(file.raw);
    },

    //封装获取个人信息函数
    getuserdata() {
      getuser(localStorage.id).then((res) => {
        // console.log(this.userdata);
        let time = new Date(res.data.accountInfo.ctime);
        //年
        let year = time.getFullYear();
        //月
        let mouth = time.getMonth();
        //日
        let day = time.getDate();
        time = `${year}/${mouth}/${day}`;
        res.data.accountInfo.ctime = time;
        this.userdata = res.data.accountInfo;
      });
    },
  },
};
</script>

<style lang="less" scoped>
div {
  background-color: #fff;
  p {
    padding: 15px;
    border-bottom: 1px solid #e4e4e4;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .pic {
    display: flex;
    align-items: center;
  }
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