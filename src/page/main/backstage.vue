<template>
  <div>
    <div class="main">
      <div class="box">
        <span class="el-icon-document" style="color:#1296DB"></span>
        <div class="cont">
          <p style="color:#CECECE">总订单</p>
          <p>{{data.totalOrder}}</p>
        </div>
      </div>
      <div class="box">
        <span class="el-icon-coin" style="color:#D4237A"></span>
        <div class="cont">
          <p style="color:#CECECE">总销售额</p>
          <p>{{data.totalAmount}}</p>
        </div>
      </div>
      <div class="box">
        <span class="el-icon-s-order" style="color:#1296DB"></span>
        <div class="cont">
          <p style="color:#CECECE">今日订单数</p>
          <p>{{data.todayOrder}}</p>
        </div>
      </div>
      <div class="box">
        <span class="el-icon-refresh-right" style="color:#1AFA29"></span>
        <div class="cont">
          <p style="color:#CECECE">今日销售额</p>
          <p>{{data.totayAmount}}</p>
        </div>
      </div>
    </div>
    <div class="Chart">
      <div id="echart" style="width: 100%;height:600px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { totaldata } from "@/api/apis";
export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("echart"));

      //发送后台请求
      totaldata().then((res) => {
        console.log(res.data);
        this.data = res.data;

        // 指定图表的配置项和数据
        let option = {
          title: {
            text: "数据统计",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["金额数据", "订单数据"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data:  res.data.xData //横轴
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "订单",
              type: "line",
              stack: "总量",
              data: res.data.amountData
            },
            {
              name: "销售额",
              type: "line",
              stack: "总量",
              data:res.data.orderData
            },
          ],
        };

        myChart.setOption(option);
      });
    },
  },
  mounted() {
    this.drawChart();
  },
};
</script>

<style scoped>
.main {
  display: flex;
  margin-bottom: 40px;
}
.box {
  width: 300px;
  height: 100px;
  background-color: #fff;
  margin-right: 20px;
  padding-left: 30px;
  display: flex;
}
.box span {
  font-size: 100px;
  margin-right: 60px;
}
.cont {
  padding: 25px 0px;
}
.Chart {
  background-color: #fff;
}
</style>