<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script> 
  import {
  statistic_list,
  traffic_list,
 customTraffic_list
} from "api/gate/api_statistics";
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题 
  const animationDuration = 3000;
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '400px'
      }
    },
    data() {
      return {
        chart: null,
        urllist:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        urlCount:[],
      };
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');

        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: [{
            type: 'category',
            data:  this.urllist,
            axisTick: {
              alignWithLabel: true
            }
          }],
          xAxis: [{
            type: 'value'
          }],
          series: [{
            name: 'pageA',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.urlCount,
            animationDuration
          },
          ]
        })
      },
      
    //获取固定时间间隔列表
    statistic_list(listQuery) {
      this.listLoading = true;
      statistic_list(listQuery).then(response => {
       var list = response;
      this.listLoading = false;
        
        var url=[];
        var count=[];
        $.each(list,function(i,val){ 
           url.push(val.uri); 
           count.push(val.count);
        })
       this.urllist=(url);
       this.urlCount=count;
        this.initChart();
      });
    },
    
    }
}
</script>
