 <template>
<div class="app-container calendar-list-container">
   <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="任务名" v-model="listQuery.jobName"> </el-input>
    <el-button class="filter-item" type="primary" v-waves  @click="handleFilter"><i class="iconfont icon-luyou"></i>搜索</el-button> 
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
import { page } from "api/task/tasklog.js";
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
        CREATE_BY: undefined
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
        this.list = response.page.list;
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
      if (ms == null) return null;
      return new Date(parseInt(ms))
        .toLocaleString("chinese", { hour12: false })
        .replace(/年|月/g, "-")
        .replace(/日/g, " ");
    }
  }
};
</script>
 
 

<style>
@font-face {font-family: "iconfont";
  src: url('iconfont.eot?t=1515118490582'); /* IE9*/
  src: url('iconfont.eot?t=1515118490582#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAVsAAsAAAAAB8wAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW7kgzY21hcAAAAYAAAABeAAABhppYBr5nbHlmAAAB4AAAAZ8AAAG4zMDOWWhlYWQAAAOAAAAALwAAADYQCkUxaGhlYQAAA7AAAAAcAAAAJAffA4VobXR4AAADzAAAAAwAAAAMC+oAAGxvY2EAAAPYAAAACAAAAAgAdgDcbWF4cAAAA+AAAAAfAAAAIAETAF1uYW1lAAAEAAAAAUUAAAJtPlT+fXBvc3QAAAVIAAAAIgAAADPiiPN6eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sk4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDzzYG7438AQw9zA0AAUZgTJAQApBwy1eJzFkMENgDAMAy9t6QMxCA8G6Qi8mKMTd41iQnkwQS05VhxLiQIsQBQPMYFdGA9OueZ+ZHU/eSZLjUBtpXf1nyqiWXYNKplpsHmr/9i87qPTV6iDOrGVl4QbB44MrwAAeJwlj79u01AYxb/vOvfexIkdaju+yc3/mPpS2hvUJMQIRLOwgBgquYvZeABYuzB4oTCAxDNUlXiIRIKBkS2WIBNCoD4CAgEuBo6O9FuOjvQDCnDx2VgZTXDhCuzDHTgEQLaLI5t0cahmY7KLjSFtCM82VKCGPBiNjdsoRszzJ/NZKBhndbSxh9PhZK7GROH12QG5hRO/i9hqy9jZ7jjGKzSbqvc0v0dOsdEPOvUDnd/dW3iTgVs+rjlOy3FelBmlZUJKdRsfCb9CKybLz2hdNlb9HdLHWkvJ+4k1aDsPn88ed7dFBTFN0W0P7NeLLblV9In0XafFL1nlprSCyx4ef6023Vo3/AJFWOGaltBIwYIOBHC18L0BQENQc4imPggPuLHPCO+hmM6daIzKFVwofo1ESkR95IpHakFExAUnkOWfqojyo5XhyMzPN9a77yXz55K/+Vaq/FrKWK9DHZ88+AeWqHCtj05iHb7fS1KKMtvgTpXm59km/1A13pr5xXL1g5qIf/F7XQzXOn6WaJXp+GaiM6Xjl/8vC5U/4PxdcQB4nGNgZGBgAOLPR7ib4/ltvjJwszCAwLVShlkI+n8DCyNzA5DLwcAEEgUAJR4J0QB4nGNgZGBgbvjfwBDDAmQxMABJMI0EmAFHNQJuBAAAAAPpAAAEAQAAAAAAAAB2ANx4nGNgZGBgYGYIZGBjAAEmIOYCQgaG/2A+AwARDgFxAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgJmRiZGZkYWBsYI1p7Qyv5SBAQASrALYAAA=') format('woff'),
  url('iconfont.ttf?t=1515118490582') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('iconfont.svg?t=1515118490582#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-luyou:before { content: "\e648"; }
</style>
