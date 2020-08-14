import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../page/login.vue'
import {
    checktoken
} from '@/api/apis.js'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// import backstage from './page/backstage.vue'
// import commoditylist from './page/commoditylist.vue'
// import commodityadd from './page/commodityadd.vue'
// import commodityclass from './page/commodityclass.vue'
// import numberlist from './page/numberlist.vue'
// import numberadd from './page/numberadd.vue'
// import change from './page/ChangePassword.vue'
// import saleStatistics from './page/saleStatistics.vue'
// import orderStatistics from './page/orderStatistics.vue'
// import order from './page/order.vue'
// import shop from './page/shop.vue'

Vue.use(VueRouter) //使用VueRouter插件

const router = new VueRouter({

    //路由配置数组
    routes: [
        //登录
        {
            path: '/',
            name: 'login',
            component: login,
        },
        //主页
        {
            path: '/main',
            name: 'main',
            // 懒加载, 当hash值被匹配成功时,才会动态加载此页面
            component: () => import('../page/Main.vue'),
            children: [
                // 后台首页
                {
                    path: '/main/backstage',
                    name: '/main/backstage',
                    component: () => import('../page/main/backstage.vue'),
                    //meta自定义数据 可以用于hash值和中文名字对应 用于面包削
                    meta:{breadlist:['后台首页']}
                },
                //修改密码
                {
                    path: '/main/ChangePassword',
                    name: '/main/ChangePassword',
                    component: () => import('../page/main/ChangePassword.vue'),
                    meta:{breadlist:['账号管理','修改密码']}
                },
                //商品添加
                {
                    path: '/main/commodityadd',
                    name: '/main/commodityadd',
                    component: () => import('../page/main/commodityadd.vue'),
                    meta:{breadlist:['商品管理','商品添加']}
                },
                //商品分类
                {
                    path: '/main/commodityclass',
                    name: '/main/commodityclass',
                    component: () => import('../page/main/commodityclass.vue'),
                    meta:{breadlist:['商品管理','商品分类']}
                },
                //商品列表
                {
                    path: '/main/commoditylist',
                    name: '/main/commoditylist',
                    component: () => import('../page/main/commoditylist.vue'),
                    meta:{breadlist:['商品管理','商品列表']}
                },
                //添加账号
                {
                    path: '/main/numberadd',
                    name: '/main/numberadd',
                    component: () => import('../page/main/numberadd.vue'),
                    meta:{breadlist:['账号管理','添加账号']}
                },
                //账号列表
                {
                    path: '/main/numberlist',
                    name: '/main/numberlist',
                    component: () => import('../page/main/numberlist.vue'),
                    meta:{breadlist:['账号管理','账号列表']}
                },
                //订单管理
                {
                    path: '/main/order',
                    name: '/main/order',
                    component: () => import('../page/main/order.vue'),
                    meta:{breadlist:['订单管理']}
                },
                //订单统计
                {
                    path: '/main/orderStatistics',
                    name: '/main/orderStatistics',
                    component: () => import('../page/main/orderStatistics.vue'),
                    meta:{breadlist:['销售统计','订单统计']}
                },
                //商品统计
                {
                    path: '/main/saleStatistics',
                    name: '/main/saleStatistics',
                    component: () => import('../page/main/saleStatistics.vue'),
                    meta:{breadlist:['销售统计','商品统计']}
                },
                //店铺管理
                {
                    path: '/main/shop',
                    name: '/main/shop',
                    component: () => import('../page/main/shop.vue'),
                    meta:{breadlist:['店铺管理']}
                },
                //个人中心
                {
                    path: '/main/personal',
                    name: '/main/personal',
                    component: () => import('../page/main/personal.vue'),
                    meta:{breadlist:['个人中心']}
                },
            ]
        },

    ]
})

router.beforeEach((to, from, next) => {
    //to: 要跳转到的路由
    //from: 我来自于哪里
    // console.log(from)
  
    // 只要不是默认登录,都开启路由验证
    if(to.path != '/'){
      // 验证用户是否登录
      checktoken(localStorage.token).then(res => {
  
        //在登录状态
        if(res.data.code == 0)
          next()  //让它正常跳转
        else  //不在登录状态
          next('/')
  
      })
  
    }else
      next()
  
  
    //让路由继续跳转
    // next()
  })

            export default router