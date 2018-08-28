<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts';
  require('echarts/theme/macarons'); // echarts 主题
  import { debounce } from 'utils';
  import {
  statistic_list,
  traffic_list,
  customTraffic_list
  } from "api/gate/api_statistics";
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
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chart: null,
        timelist:['2018-08-16 17:00:00', '2018-08-16 17:00:00', '2018-08-16 17:00:00', '2018-08-16 17:00:00', '2018-08-16 17:00:00', '2018-08-16 17:00:00', '2018-08-16 17:00:00'],
        urlCount:[100, 120, 161, 134, 105, 160, 165],
      };
    },
    mounted() {
      this.initChart();
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
      
      
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

      this.chart.dispose()
      this.chart = null
    },
    methods: {
    traffic_list(listQuery) {
      this.listLoading = true;
      traffic_list(listQuery).then(response => {
        var list = response;
        this.listLoading = false;
        
        var url=[];
        var count=[];
        $.each(list,function(i,val){ 
           url.push(val.time); 
           count.push(val.count);
        })
        this.timelist=(url);
        this.urlCount=count;
        console.log(url);
        
        console.log(count);
        this.initChart();

      });
    },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');

        this.chart.setOption({
          xAxis: {
            data:this.timelist,
            boundaryGap: false
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            containLabel: true
          },

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          yAxis: {},
          series: [{
            name: 'visitors',
            itemStyle: {
              normal: {
                areaStyle: {}
              }
            },
            smooth: true,
            type: 'line',
            data: this.urlCount,
            animationDuration: 2600,
            animationEasing: 'cubicInOut'
          },
          ]
        })
      }
    }
}
</script>
