import axios from 'axios'

//请求基本路径 
axios.defaults.baseURL='http://127.0.0.1:5000'

// console.log(axios.defaults.baseURL);
//商品图片上传接口封装:
export let compic=axios.defaults.baseURL+'/goods/goods_img_upload'
// console.log(compic);
//获取商品图片地址
export let getcompic=axios.defaults.baseURL+'/upload/imgs/goods_img/'



//店铺图片上传接口分装
export let shoppicupload=axios.defaults.baseURL+'/shop/upload'
//店铺图片获取
export let getshoppic=axios.defaults.baseURL+'/upload/shop/'





//封装函数  暴露函数
//登录API
//数据
//account 账号
//password 密码
//es5写法

// export function  login(account,password){
//   return axios.post('users/checkLogin',{
//       account,password
//   })   
// }


//es6写法
//登录API
export let login=(account,password)=>axios.post('users/checkLogin',{account,password})

//验证token 
export let checktoken=(token)=>axios.get('users/checktoken',{params:{token}})

//添加账号
export let addnum=(account,password,userGroup)=>axios.post('users/add',{account,password,userGroup})

//获取账号列表
export let getlist=(currentPage,pageSize)=>axios.get('users/list',{params:{currentPage,pageSize}})

//删除账号
export let delnum=(id)=>axios.get('users/del',{params:{id}})

//批量删除账号
export let moredels=(ids)=>axios.get('users/batchdel',{params:{ids}})

//修改账号
export let update=(id,account,userGroup)=>axios.post('users/edit',{id,account,userGroup})

//检查旧密码是否正确
export let checkpwd=(oldPwd,id)=>axios.get('users/checkoldpwd',{params:{oldPwd,id}})

//修改密码
export let updatepwd=(newPwd,id)=>axios.post('users/editpwd',{newPwd,id})

//头像上传
export let headerpic=(id)=>axios.post('users/avatar_upload',{id})

//获取用户
export let getuser=(id)=>axios.get('users/accountinfo',{params:{id}})



// 商品管理模块
//添加分类
export let addclass=(cateName,state)=>axios.post('goods/addcate',{cateName,state})

//获取分类
export let getclass=(currentPage,pageSize)=>axios.get('goods/catelist',{params:{currentPage,pageSize}})

//修改分类
export let setclass=(params)=>axios.post('goods/editcate',params)

//查询分类
export let checkclass=()=>axios.get('goods/categories')

//删除分类
export let delclass=(id)=>axios.get('goods/delcate',{params:{id}})

//商品图片上传
export let updatepic=()=>axios.post('goods/goods_img_upload')

//添加商品
export let addcom=(name,category,price,imgUrl,goodsDesc)=>axios.post('goods/add',{name,category,price,imgUrl,goodsDesc})

//获取商品列表
export let getcomlist=(currentPage,pageSize)=>axios.get('goods/list',{params:{currentPage,pageSize}})

//删除商品
export let delcom=(id)=>axios.get('goods/del',{params:{id}})

//修改商品
export let setcom=(name,category,price,imgUrl,goodsDesc,id)=>axios.post('goods/edit',{name,category,price,imgUrl,goodsDesc,id})


//-----------------------------------------------订单管理模块-------------------------------------------------//
//获取订单列表
export let getorderlist=(params)=>axios.get('order/list',{params})

//查询订单
export let checkorder=(params)=>axios.get('order/search',{params:{params}})

//获取订单详情
export let getorderdetail=(id)=>axios.get('order/detail',{params:{id}})

//修改订单
export let setorderlist=(params)=>axios.post('order/edit',params)



// ------------------------------------------报表统计-------------------------------------------------//

//首页报表接口order/totaldata
export let totaldata=()=>axios.get('order/totaldata')

//订单报表接口 order/ordertotal
export let ordertotal=(date)=>axios.get('order/ordertotal', {params:{date}})


//--------------------------------------------店铺管理--------------------------------------------------//
//获取店铺详情 shop/info
export let shopinfo=()=>axios.get('shop/info')

//店铺图片上传接口 shop/upload
export let shoppic=()=>axios.get('shop/upload')

//店铺内容修改 shop/edit
export let shopedit=(params)=>axios.post('shop/edit',params)
