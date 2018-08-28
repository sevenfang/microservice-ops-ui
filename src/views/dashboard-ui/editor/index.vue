<template>
	<div class="dashboard-editor-container"> 
   <div class="filter-container"> 
  <el-form :inline="true" :model="listQuery" class="demo-form-inline">
  
  <!-- <el-form-item label="选择日期时间区间:">
       <el-date-picker v-model="listQuery.startDate" @change="getStartTime" type="datetime" placeholder="选择开始日期时间"> </el-date-picker>
       <el-date-picker v-model="listQuery.stopTime"  @change="getEndTime"  type="datetime" placeholder="选择结束日期时间"> </el-date-picker>
  </el-form-item> -->
  <el-form-item label="选择时间区间:">
  <div class="block">
     <el-date-picker  v-model="value7" type="datetimerange" :picker-options="pickerOptions2"  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
    </el-date-picker>
  </div>
  </el-form-item>
   <el-form-item label="排序字段:">
    <el-select  v-model="listQuery.sortField" style="width: 200px;" class="filter-item" placeholder="请选择状态"> 
        <el-option label="总数" value="count"></el-option>
        <el-option label="最小耗时" value="min"></el-option> 
        <el-option label="最大耗时" value="max"></el-option> 
        <el-option label="平均耗时" value="avg"></el-option> 
    </el-select>
  </el-form-item>
     <el-form-item label="排序:">
    <el-select  v-model="listQuery.order" style="width: 200px;" class="filter-item" placeholder="请选择状态"> 
        <el-option label="正序" value="desc"></el-option>
        <el-option label="倒叙" value="asc"></el-option> 
    </el-select>
  </el-form-item>
 
   
   <el-form-item label="选择状态">
        <el-radio-group v-model="timeStatus"  @change="changeTimeStatus"  border=true size="medium">
          <el-radio  label="dynamic">自定义时间间隔</el-radio>
          <el-radio  label="Fixed">选择时间间隔</el-radio>
        </el-radio-group>
    </el-form-item>
    
    <el-form-item label="时间类型:"  v-if="timeStatus=='Fixed'">
      <el-select v-model="listQuery.type" style="width: 200px;" class="filter-item" placeholder="请选择状态"> 
            <el-option label="每秒" value="second"></el-option>
            <el-option label="每分" value="minute"></el-option>
            <el-option label="每时" value="hour"></el-option>
            <el-option label="每天" value="day"></el-option>
      </el-select> 
   </el-form-item>
    <el-form-item label="时间区间:"  v-if="timeStatus=='dynamic'"> 
       <el-input v-model="listQuery.intervalSecond" placeholder="输入间隔时间"> </el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary"  icon="search" @click="apiSearch">查询</el-button>
  </el-form-item>
</el-form> 
  </div>  
		<el-row v-if="timeStatus=='Fixed'">
			<el-col :span="20">
				<div>
					<span>
					API调用频率:
					</span>
				</div>				
			 <apiUrl ref="apiUrl"  :list_Query=listQuery></apiUrl> 
			</el-col>
		</el-row>
    
    <el-row  v-if="timeStatus=='dynamic'">
			<el-col :span="20">
				<div>
					<span>
					API自定义使用频率:
					</span>
				</div>				
			 <apiUrlCustom ref="apiUrlCustom"  :list_Query=listQuery></apiUrlCustom> 
			</el-col>
		</el-row>

		<el-row :gutter="20" v-if="timeStatus=='Fixed'">
      <div>
					<span>
					API调用调用趋势:
					</span>
				</div>	
			<el-col :span="20">
				<line-chart ref="lineChart"></line-chart>
			</el-col> 
		</el-row>  
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import panThumb from "components/PanThumb";
import pieChart from "./pieChart";
import lineChart from "./lineChart";
import countTo from "vue-count-to";
import todoList from "components/TodoList";
import apiUrl from './apiUrl';
import apiUrlCustom from './apiUrlCustom';
export default {
  name: "dashboard-editor",
  components: { panThumb, countTo, pieChart, lineChart, todoList ,apiUrl,apiUrlCustom},
  data() {
    return {
      listQuery: {
            startTime:"2018-08-13",  
            stopTime: "2018-08-22",  
            type: "second",           
            sortField: "count",        
            order: "desc",            
            size: "10", 
            intervalSecond:2,    
          },
      statisticsData: {
        article_count: 1024,
        comment_count: 102400,
        latest_article: [],
        month_article_count: 28,
        pageviews_count: 1024
      },
       timeStatus:"Fixed",
       pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },

        
        value7:[new Date(2018, 8, 28, 10, 10), new Date(2018, 8, 30, 10, 10)],
    };
  },
  props:['list_Query'],
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  mounted() {
       this.apiSearch();
    },
  methods: {
      apiSearch(){
             console.log(this.value7[0]);
             this.startTime= this.changetimeType(this.value7[0]);
             this.stopTime=this.changetimeType(this.value7[1]);
             if (this.timeStatus=="Fixed") {
               this.$refs.apiUrl.statistic_list(this.listQuery);
                this.traffic_list_search();
             }else{
              
                this.$refs.apiUrlCustom.customTraffic_list(this.listQuery);
             }
                },
      traffic_list_search(){ 
            this.$refs.lineChart.traffic_list(this.listQuery);
                },
      getStartTime(date){
          this.listQuery.startTime =new Date(date).getTime()
          console.log(this.listQuery.startTime);
        },
    getEndTime(date){
      this.listQuery.stopTime =new Date(date).getTime()
      console.log(this.listQuery.stopTime);
    },
    changeTimeStatus(){
         this.listQuery.type="second",
         this.listQuery.intervalSecond=2
    },

   
   changetimeType(newdate){
          var yy = newdate.getFullYear();      //年
          var mm = newdate.getMonth() + 1;     //月
          var dd = newdate.getDate();          //日
          var hh = newdate.getHours();         //时
          var ii = newdate.getMinutes();       //分
          var ss = newdate.getSeconds();       //秒
          var clock = yy + "-";
          if(mm < 10) clock += "0";
          clock += mm + "-";
          if(dd < 10) clock += "0";
          clock += dd + " ";
          if(hh < 10) clock += "0";
          clock += hh + ":";
          if (ii < 10) clock += '0'; 
          clock += ii + ":";
          if (ss < 10) clock += '0'; 
          clock += ss;
        console.log(" //获取当前日期"+clock); 
        return clock;
          
   }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  margin: 30px;
  .btn-group {
    margin-bottom: 60px;
  }
  .box-card-header {
    position: relative;
    height: 160px;
  }
  .panThumb {
    z-index: 100;
    height: 150px;
    width: 150px;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
  }
  .display_name {
    font-size: 30px;
    display: block;
  }
  .info-item {
    display: inline-block;
    margin-top: 10px;
    font-size: 14px;
    &:last-of-type {
      margin-left: 15px;
    }
  }
}
</style>
