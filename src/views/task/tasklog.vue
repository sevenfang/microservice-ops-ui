 <template>
<div class="app-container calendar-list-container">
   <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="任务名" v-model="listQuery.jobName"> </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button> 
  </div>  
  
<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

    <el-table-column  type="index" :index="indexMethod">
    </el-table-column>

    <el-table-column align="center" label="任务名称"  > 
        <template scope="scope">
            <span>{{scope.row.SCHEDLED_NAME}}</span>
        </template>
    </el-table-column>
  <el-table-column   align="center" label="计划组别">
        <template scope="scope">
            <span>{{scope.row.JOB_GROUP}}</span>
        </template>
    </el-table-column>  


    <el-table-column   align="center" label="url">
        <template scope="scope">
            <span> {{scope.row.URL_NAME}}</span>
        </template>
    </el-table-column>

        <el-table-column  align="center" label="日志时间">
        <template scope="scope">
            <span> {{getLocalTime(scope.row.CREATE_DATE)}}</span>
        </template>
    </el-table-column>


    <el-table-column   align="center" label="执行时长">
        <template scope="scope">
            <span>{{scope.row.WORK_TIME}}</span>
        </template>
    </el-table-column> 

    <el-table-column   align="center" label="业务返回结果">
        <template scope="scope">
            <span>{{scope.row.RESPONSE_INFO}}</span>
        </template>
    </el-table-column> 

 <el-table-column align="center" label="调用执行机器"> 
    <template scope="scope">
            <span>{{scope.row.PC_IP}}</span>
        </template>
    </el-table-column> 

</el-table> 
</div>
</template>

 <script>
import {page } from "api/task/tasklog.js";
import { mapGetters } from "vuex";
export default {
  name: "task",
  data() {
    return {
      form: { 
        JOB_GROUP: undefined,  
        SCHEDLED_NAME: undefined,
        URL_NAME: undefined, 
        CREATE_DATE: undefined,
        WORK_TIME: undefined,  
        PC_IP: undefined, 
        RESPONSE_INFO: undefined, 
        RETURN_FLAG: undefined,
        id: undefined, 
        CREATE_BY: undefined, 
       
      },   
      list: null,
      listLoading: true,
      listQuery: {
        jobName: undefined
      },
      dialogFormVisible: false,
      dialogStatus: "",
      groupTypeManager_btn_edit: false,
      groupTypeManager_btn_del: false,
      groupTypeManager_btn_add: false, 
      tableKey: 1
    };
  },
  created() {
    this.getList();
    this.groupTypeManager_btn_edit = this.elements["groupTypeManager:btn_edit"];
    this.groupTypeManager_btn_del = this.elements["groupTypeManager:btn_del"];
    this.groupTypeManager_btn_add = this.elements["groupTypeManager:btn_add"];
  },
  computed: {
    //获取state里面的listName对象
    ...mapGetters(["elements"])
  },
  methods: {
    //获取列表
    getList() {
      this.listLoading = true;
      page().then(response => { 
        this.list=response.page.list;
        this.listLoading = false;
      });
    },
    indexMethod(index) {
      return index * 2;
    },
    handleFilter() {
      this.getList();
    },  
      getLocalTime(ms) {
      if(ms==null) return null;
      return new Date(parseInt(ms)).toLocaleString('chinese',{hour12:false}).replace(/年|月/g, "-").replace(/日/g, " ");
    },
  }
};
</script>
