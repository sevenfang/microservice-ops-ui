<template>
  <div class="app-container calendar-list-container">
    <el-table :key='tableKey' :data="list" stripe="true" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%"  height="500">
<el-table-column fixed width="270px" align="center" label="应用名"><template scope="scope">
  <span>
    {{scope.row.appName}}</span>
</template>

</el-table-column>
<el-table-column width="370px" align="center" label="Instance"><template scope="scope">
  <span>
    {{scope.row.instanceId}}</span>
</template>
</el-table-column> 

      <el-table-column width="150px" align="center" label="Host"><template scope="scope">
  <span>
    {{scope.row.hostName}}</span>
</template>
</el-table-column>  
      <el-table-column align="center" label="端口" width="100">
        <template scope="scope">
          <span>{{scope.row.port}}</span>
</template>
</el-table-column>
<el-table-column width="100px" align="center" label="状态"><template scope="scope">
  <span>
    {{scope.row.status}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" label="最后更新时间"><template scope="scope">
  <span>
    {{getLocalTime(scope.row.lastUpdatedTimestamp)}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" label="lastDirtyTimestamp"><template scope="scope">
  <span>
    {{getLocalTime(scope.row.lastDirtyTimestamp)}}</span>
</template>

</el-table-column>
<el-table-column width="120px" align="center" label="SWAGGER"><template scope="scope">
    <a :href="scope.row.homePageUrl + 'swagger-ui.html'" target="_blank">swagger-ui</a>
</template>

</el-table-column>
<el-table-column width="90px" align="center" label="DURID"><template scope="scope">
    <a :href="scope.row.homePageUrl + 'druid/login.html'" target="_blank">durid</a>
</template>
      </el-table-column>

  <el-table-column width="100px" align="center" label="操作">
      <template scope="scope">
          <el-button size="small" type="info"  @click="deleteInstance(scope.row)">注销</el-button>
      </template>
  </el-table-column>       
         </el-table>
    </div>
</template>

<script>
import { getService,delInstance} from "api/service/index";
export default {
  name: "serviceInfo",
  data() {
    return {
      list: null,
      listLoading: true,
      tableKey: 0
    };
  },
  created() {
    this.getServiceInfo();
  },
  methods: {
    getServiceInfo() {
      this.listLoading = true;
      getService().then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },
    deleteInstance(row){
      this.$confirm("是否真要注销?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delInstance(row.appName, row.instanceId).then(() => {
          this.$notify({
            title: "成功",
            message: "注销成功",
            type: "success",
            duration: 2000
          });
          getServiceInfo();
        });
      });
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
