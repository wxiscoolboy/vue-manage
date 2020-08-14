<template>
  <div>
    <p>
      <span>时间范围</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" @click="clickSearch">查询</el-button>
    </p>
    <div class="Chart">
      <div id="echart" style="width: 80%;height:500px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { getchinatime } from "@/utils/utils";
import { ordertotal } from "@/api/apis";
export default {
  data() {
    return {
      //时间选择数据
      date: [], //当前选择的时间
    };
  },
  methods: {
    //查询
    clickSearch() {
      console.log(this.date);
      let time = JSON.stringify([
        getchinatime(this.date[0]),
        getchinatime(this.date[1]),
      ]);
      console.log(time);
      this.getdata(time);
    },

    //封装获取数据函数
    getdata(str) {
      ordertotal(str).then((res) => {
        console.log(res);
        let arr=res.data.data;
        for (let obj of res.data.data) {
          obj.orderTime = getchinatime(obj.orderTime);
        }

        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };

        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    this.sechart = echarts.init(document.getElementById("echart"));
  },
};
</script>

<style lang='less' scoped>
.el-date-editor {
  margin: 0px 15px 30px 20px;
}
.Chart {
  background-color: #fff;
  padding: 15px;
}
</style>