<template>
  <div id="box">
    <div class="order">
      <p>
        <span>订单号</span>
        <el-input v-model="ordernum" placeholder="请输入内容" style="width:200px"></el-input>
      </p>
      <p>
        <span>收货人</span>
        <el-input v-model="man" placeholder="请输入内容" style="width:200px"></el-input>
      </p>
      <p>
        <span>手机号</span>
        <el-input v-model="pho" placeholder="请输入内容" style="width:200px"></el-input>
      </p>
      <p>
        <span>订单状态</span>
        <el-select v-model="state" placeholder="请选择">
          <el-option v-for="item in options" :key="item.op" :label="item.op" :value="item.op"></el-option>
        </el-select>
      </p>
      <p>
        <span>选择时间</span>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-button type="primary" @click="checkorderlist">查询</el-button>
      </p>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="orderNo" label="订单号" width="120">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.orderNo}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.orderNo" />
        </template>
      </el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="120">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.orderTime}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.orderTime" />
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.phone}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.phone" />
        </template>
      </el-table-column>
      <el-table-column prop="consignee" label="收货人" width="300">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.consignee}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.consignee" />
        </template>
      </el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="120">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.deliverAddress}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.deliverAddress" />
        </template>
      </el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="120">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.deliveryTime}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.deliveryTime" />
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.remarks}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.remarks" />
        </template>
      </el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.orderAmount}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.orderAmount" />
        </template>
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.orderState}}</span>
          <el-select v-show="scope.row.isedit" v-model=" scope.row.orderState" placeholder="请选择">
            <el-option v-for="item in options" :key="item.op" :label="item.op" :value="item.op"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="clickEdit(scope)"
          >{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 200, 300, 400]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 弹出框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <p>订单号：{{this.seedata.orderNo}}</p>
      <p>下单时间：{{this.seedata.orderTime}}</p>
      <p>手机号：{{this.seedata.phone}}</p>
      <p>收货人：{{this.seedata.consignee}}</p>
      <p>配送地址：{{this.seedata.deliverAddress}}</p>
      <p>送达时间：{{this.seedata.deliveryTime}}</p>
      <p>用户备注：{{this.seedata.remarks}}</p>
      <p>订单金额：{{this.seedata.orderAmount}}</p>
      <p>订单状态：{{this.seedata.orderState}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确  定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getorderlist, setorderlist } from "@/api/apis";
import { getchinatime } from "@/utils/utils";
export default {
  data() {
    return {
      //订单号
      ordernum: "",
      //收货人
      man: "",
      //手机号
      pho: "",
      //订单状态
      state: "",
      //时间选择器数据
      value1: [],

      //下拉菜单数据
      options: [{ op: "已完成" }, { op: "已受理" }, { op: "派送中" },{op:'全部'}],

      //表格数据
      tableData: [],

      //分页器当前页数
      currentPage: 1,
      //数据条数
      pagesize: 5,
      //总共条数
      total: 0,
      //弹出框数据
      dialogVisible: false,

      seedata: {},
    };
  },
  methods: {
    //查看方法
    handleClick(row) {
      this.seedata = row;
      this.dialogVisible = true;
      console.log(row);
    },

    //分页器方法
    handleSizeChange(val) {
      this.pagesize = val;
      // console.log(`每页 ${val} 条`);
      this.getlist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
      this.getlist(this.paramsex);
    },

    //封装获取订单列表的方法
    getlist(paramsex) {
      // console.log(paramsex);
      getorderlist({
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        ...paramsex,
      }).then((res) => {
        // console.log(res);
        for (let obj of res.data.data) {
          obj.deliveryTime = getchinatime(obj.deliveryTime);
          obj.orderTime = getchinatime(obj.orderTime);
          obj.isedit = false;
        }
        this.tableData = res.data.data;
        // console.log(this.tableData);
        this.total = res.data.total;
      });
    },

    //查询订单
    checkorderlist() {
      // console.log( JSON.stringify([
      //     getchinatime(this.value1[0]),
      //     getchinatime(this.value1[1])
      //   ]));
      //时间选择器
      // console.log(this.value1);
      let { ordernum, man, pho, state } = this;
      //额外参数对象
      let paramsex = {};
      if (ordernum != "") paramsex.orderNo = ordernum;
      if (man != "") paramsex.consignee = man;
      if (pho != "") paramsex.phone = pho;
      if (state != ""&&state !='全部') paramsex.orderState = state;
      //服务器要求把时间转化为字符串格式
      if (this.value1)
        paramsex.date = JSON.stringify([
          getchinatime(this.value1[0]),
          getchinatime(this.value1[1]),
        ]);
      this.paramsex = paramsex;
      this.getlist(paramsex);
    },

    //编辑
    clickEdit(scope) {
      if (scope.row.isedit == true) {
        scope.row.isedit = false;
        setorderlist(scope.row).then((res) => {
          // console.log(res);
          if (res.data.code == 0) {
            this.$message({
              message: "恭喜你,修改成功",
              type: "success",
            });
          }
        });
      } else {
        //打开编辑状态
        scope.row.isedit = true;
      }
    },
  },

  created() {
    this.getlist();
  },
};
</script>

<style lang=less scoped>
#box {
  background-color: #fff;
  .order {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    p {
      margin-bottom: 15px;
      span {
        padding: 0px 10px;
      }
      .el-button {
        margin-left: 15px;
      }
    }
  }
}
</style>