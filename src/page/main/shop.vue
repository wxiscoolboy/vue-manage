<template>
  <div>
    <p class="title">
      店铺管理
      <el-button type="primary" @click="editdata">保存</el-button>
    </p>
    <p>
      <span :class="sy2">店铺名称</span>
      <el-input v-model="shopdata.name" placeholder="请输入内容" style="width:30%"></el-input>
    </p>
    <p>
      <span :class="sy">店铺公告</span>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="shopdata.bulletin"
        style="width:30%"
      ></el-input>
    </p>
    <p>
      <span :class="sy">店铺头像</span>
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl==''?'':getshoppic+imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </p>
    <p>
      <span :class="sy">店铺图片</span>
      <el-upload
        :action="action"
        list-type="picture-card"
        class="upload-demo"
        :file-list="fileList"
        :on-success="success"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </p>
    <p>
      <span :class="sy2">配送费</span>
      <el-input v-model="shopdata.deliveryPrice" placeholder="4" style="width:30%">4</el-input>
    </p>
    <p>
      <span :class="sy2">配送时间</span>
      <el-input v-model="shopdata.deliveryTime" placeholder="38" style="width:30%"></el-input>
    </p>
    <p>
      <span :class="sy2">配送描述</span>
      <el-input v-model="shopdata.description" placeholder="蜂鸟专送" style="width:30%"></el-input>
    </p>
    <p>
      <span :class="sy2">店铺评分</span>
      <el-input v-model="shopdata.score" placeholder="4.5" style="width:30%"></el-input>
    </p>
    <p>
      <span :class="sy2">销量</span>
      <el-input v-model="shopdata.sellCount" placeholder="100" style="width:30%"></el-input>
    </p>
    <p>
      <span :class="sy2">活动</span>
      <el-form ref="form" :model="form" label-width="80px" style="width:370px">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form>
    </p>
    <p>
      <span :class="sy2">营业时间</span>
      <el-time-picker
        is-range
        v-model="shopdata.date"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
      ></el-time-picker>
    </p>
  </div>
</template>

<script>
import { shopinfo, shoppicupload, getshoppic, shopedit } from "@/api/apis";
import { getchinatime } from "@/utils/utils";
export default {
  data() {
    return {
      //店铺数据
      shopdata: {},
      //店铺活动数据
      form: {
        type: [],
      },

      //头像图片
      imageUrl: "",

      //图片上传地址
      action: "",
      //图片下载地址
      getshoppic: "",

      //图片在页面显示的数据 回填数据
      fileList: [],

      //店铺图片要上传的数据
      arr: [],

      //   样式
      sy: {
        top: true,
      },
      sy2: {
        cen: true,
      },
    };
  },
  methods: {
    //店铺头像上传
    handleAvatarSuccess(res) {
      // console.log(res);
      if (res.code == 0) {
        //上传时图片的显示
        this.imageUrl = res.imgUrl;

        //保存上传的图片数据到shopdata
        this.shopdata.avatar = res.imgUrl;
      }
    },

    //店铺图片上传成功
    success(res) {
      //将上传的图片数据 添加到图片数组里面
      this.arr.push(res.imgUrl);
      // console.log(this.arr);
    },

    //封装得到店铺数据函数
    getshopdata() {
      shopinfo().then((res) => {
        // console.log(res.data.data);
        this.shopdata = res.data.data;
        //活动
        this.form.type = res.data.data.supports;

        //店铺头像 进来加载原本头像
        this.imageUrl = res.data.data.avatar;

        //店铺图片
        this.arr = res.data.data.pics;
        // console.log(arr);
        let newarr = this.arr.map((item) => {
          // console.log(item);

          // console.log( getshoppic+item );
          return { url: getshoppic + item, name: item };
        });
        // console.log(newarr);
        this.fileList = newarr;
        // console.log(this.fileList);
      });
    },

    //移除店铺图片
    handleRemove(file, fileList) {
      // console.log(file,fileList);
      // fileList.splice(includes(file),1)

      // console.log(newpic);
      this.arr = fileList.map((item) => {
        return item.name;
      });
      // console.log(this.arr);
    },

    //保存数据
    editdata() {
      let newdata=JSON.parse(JSON.stringify(this.shopdata))
      // console.log(this.shopdata);
      //    console.log(newdata);
      //  console.log(this.shopdata);
       newdata.supports = JSON.stringify(this.form.type);
       newdata.date[0] = getchinatime(newdata.date[0]);
       newdata.date[1] = getchinatime(newdata.date[1]);
       newdata.date = JSON.stringify(newdata.date);
      // console.log(this.shopdata.date);
      newdata.pics = JSON.stringify(this.arr);
       
    
      //保存数据
      shopedit(newdata).then((res) => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，修改成功",
            type: "success",
          });
          this.getshopdata();
        }
      });
    },
  },

  created() {
    //图片上传地址
    this.action = shoppicupload;
    //图片下载地址
    this.getshoppic = getshoppic;

    this.getshopdata();
  },
};
</script>

<style lang='less' scoped>
div,
main {
  background-color: #fff;
}
.title {
  font-size: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
p {
  padding: 15px;
  display: flex;
  span {
    width: 100px;
    text-align: right;
  }
}
.top {
  margin-right: 15px;
  align-self: flex-start;
}
.cen {
  margin-right: 15px;
  align-self: center;
}
img {
  width: 100px;
  height: 100px;
}
.el-checkbox {
  margin-bottom: 20px;
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