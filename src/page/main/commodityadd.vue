<template>
  <div>
    <p class="title">商品添加</p>
    <p>
      <span>商品名称</span>
      <el-input v-model="name" placeholder="请输入内容" style="width:400px"></el-input>
    </p>
    <p>
      <span>商品分类</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.cateName" :value="item.cateName"></el-option>
      </el-select>
    </p>
    <p>
      <span>商品价格</span>
      <el-input-number v-model="num" :min="0" label="描述文字"></el-input-number>
    </p>
    <p class="pic">
      <span>商品图片</span>
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <i v-show="imgurl == ''" class="el-icon-plus"></i>
        <img style="width: 100px" v-show="imgurl != ''" :src="getcompic + imgurl" />
      </el-upload>
    </p>
    <p class="pic">
      <span>商品描述</span>
      <el-input type="textarea" :rows="2" v-model="textarea" style="width:300px"></el-input>
    </p>
    <p>
      <el-button type="primary" @click="addclick">添加商品</el-button>
    </p>
  </div>
</template>

<script>
import { checkclass, addcom, compic,getcompic } from "@/api/apis";
export default {
  data() {
    return {
      //商品名称
      name: "",
      //商品分类
      options: [],
      //商品分类名称
      value: "",

      //商品价格
      num: 0,
    
  
      //图片上传地址
      action: "",
      //图片下载地址
     getcompic:'',

      //添加图片数据
      imgurl: "",

      //商品描述
      textarea: "",
    };
  },
  methods: {
    //图片上传成功
    handleAvatarSuccess(res) {
      // console.log(res.imgUrl);
      // console.log(file);
      //获取图片
      this.imgurl = res.imgUrl;
 
      // console.log(this.image);
    },
    //添加商品
    addclick() {
      addcom(this.name, this.value, this.num, this.imgurl, this.textarea).then(
        (res) => {
          if (res.data.code == 0) {
            console.log(res);
            this.$message({
              message: "恭喜你，添加成功",
              type: "success",
            });
          }
        }
      );
    },
  },

  created() {
    //图片下载地址
    this.getcompic=getcompic
    //图片上传地址
    this.action = compic;
    // console.log(this.action);
    //查询类名
    checkclass().then((res) => {
      // console.log(res.data);
      this.options = res.data.categories;
      this.value = this.options[0].cateName;
    });
  },
};
</script>

<style  lang=less scoped>
div {
  background-color: #fff;
  .title {
    border-bottom: 1px solid #e4e4e4;
    margin-bottom: 15px;
  }
  p {
    padding: 15px;
  }
  span {
    margin: 15px;
  }
}
.pic {
  display: flex;
}
.el-button {
  margin-left: 100px;
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