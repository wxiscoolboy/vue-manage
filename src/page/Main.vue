<template>
  <el-container>
    <el-aside width="200px">
      <!-- 导航栏 -->
      <!-- unique-opened   //下拉菜单只能打开一个 -->
      <el-col :span="24">
        <el-menu
          :default-active="curhash"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#399eff"
          router
          unique-opened
        >
          <div v-for="item in parr" :key="item.url">
            <el-menu-item v-if="!item.children" :index="item.url">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.url">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.url"
                :index="child.url"
              >{{child.name}}</el-menu-item>
            </el-submenu>
          </div>
          <!-- <el-menu-item index="/main/backstage">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
          <el-menu-item index="/main/order">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-submenu index="/main/commoditylist">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/main/commoditylist">商品列表</el-menu-item>
            <el-menu-item index="/main/commodityadd">商品添加</el-menu-item>
            <el-menu-item index="/main/commodityclass">商品分类</el-menu-item>
          </el-submenu>
          <el-menu-item index="/main/shop">
            <i class="el-icon-s-shop"></i>
            <span slot="title">店铺管理</span>
          </el-menu-item>

          <el-submenu index="/main/numberlist">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>账号管理</span>
            </template>

            <el-menu-item index="/main/numberlist">账号列表</el-menu-item>
            <el-menu-item index="/main/numberadd">添加账号</el-menu-item>

            <el-menu-item index="/main/ChangePassword">修改密码</el-menu-item>
          </el-submenu>
          
          <el-submenu index="/main/saleStatistics">
            <template slot="title">
              <i class="el-icon-pie-chart"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/main/saleStatistics">商品统计</el-menu-item>
              <el-menu-item index="/main/orderStatistics">订单统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div>
          <!-- 左侧面包削 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 右侧头像 -->
        <div>
          欢迎您{{ username }}
          <router-link to="/main/personal">
            <el-avatar :src="src"></el-avatar>
          </router-link>
        </div>
      </el-header>
      <!-- 二级页面加载的盒子 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, getuser } from "@/api/apis";
export default {
  data() {
    return {
      //登录名称
      username: "",
      //登录头像
      src: "",

      //导航栏选项
      list: [
        {
          url: "/main/backstage",
          icon: "el-icon-s-home",
          name: "后台首页",
          roles: ["super", "normal"],
        },
        {
          url: "/main/order",
          icon: "el-icon-s-order",
          name: "订单管理",
          roles: ["super", "normal"],
        },
        {
          url: "/main/commoditylist",
          icon: "el-icon-goods",
          name: "商品管理",
          children: [
            { url: "/main/commoditylist", name: "商品列表" },
            { url: "/main/commodityadd", name: "商品添加" },
            { url: "/main/commodityclass", name: "商品分类" },
          ],
          roles: ["super", "normal"],
        },
        {
          url: "/main/shop",
          icon: "el-icon-s-shop",
          name: "店铺管理",
          roles: ["super"],
        },

        {
          url: "/main/numberlist",
          icon: "el-icon-user",
          name: "账号管理",
          children: [
            { url: "/main/numberlist", name: "账号列表" },
            { url: "/main/numberadd", name: "添加账号" },
            { url: "/main/ChangePassword", name: "修改密码" },
          ],
          roles: ["super"],
        },
        {
          url: "/main/saleStatistics",
          icon: "el-icon-pie-chart",
          name: "销售统计",
          children: [
            { url: "/main/saleStatistics", name: "商品统计" },
            { url: "/main/orderStatistics", name: "订单统计" },
          ],
          roles: ["super"],
        },
      ],

      //默认样式hash值
      curhash: "",

      //面包削数据
      breadlist: [],
    };
  },
  methods: {
    //封装获取头像函数
    gethead() {
      getuser(localStorage.id).then((res) => {
        this.src = res.data.accountInfo.imgUrl;
      });
    },
  },
  computed: {
    //权限数组
    // 根据用户权限进行运算，返回运算完毕的数组
    parr() {
      //返回包含此用户权限的数据
      return this.list.filter((item) => item.roles.includes(localStorage.role));
    },
  },
  created() {
    //页面刷新 hash值 和样式相匹配
    this.curhash = this.$route.path;

    //发送请求验证token是否生效
    checktoken(localStorage.token).then((res) => {
      if (res.data.code == 0) {
        //有效
        this.username = localStorage.acc;
      } else {
        //无效
        this.username = "请登录";
      }
    });

    //获取头像
    this.gethead();

    //监听bus传递的值 接受换头像传递过来的事件 用于做头像上传刷新
    this.$bus.$on("headsucssess", () => {
      this.gethead();
    });


    //初始化给二级菜单赋值  因为hash值只有发生变化时才能发生监听事件 所以面包削不能获得数据 需要初始化
      this.breadlist=this.$route.meta.breadlist

  },
  // wacth可以观察vue很多属性的变化(包括hash变化) , 这里用做面包削
  watch: {
    //监听当前路由的变化
    //to: 要切换到哪里, from: 来自哪里
    $route(to) {
      // console.log(to);
      this.breadlist=to.meta.breadlist
    },
  },
};
</script>

<style lang=less scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #304156;
  height: 100%;
  color: #ffffff;
}
.el-main {
  background-color: #f0f2f5;
}
.el-menu-item {
  a {
    color: #ffffff;
    text-decoration: none;
  }
  .router-link-exact-active {
    color: #399eff;
  }
}
.el-menu {
  border: none;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
</style>