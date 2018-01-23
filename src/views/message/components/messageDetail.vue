<template>
  <div class="app-container calendar-list-container">
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
<el-table-column width="200px" align="center" label="队列名"><template scope="scope">
  <span>
    {{scope.row.queueName}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" label="应用名"><template scope="scope">
  <span>
    {{scope.row.appName}}</span>
</template>
</el-table-column> 

      <el-table-column width="200px" align="center" label="消费者ID"><template scope="scope">
  <span>
    {{scope.row.consumerId}}</span>
</template>
</el-table-column>  
      <el-table-column align="center" label="IP" width="165">
        <template scope="scope">
          <span>{{scope.row.host}}</span>
</template>
</el-table-column>
<el-table-column width="200px" align="center" label="消息Key"><template scope="scope">
  <span>
    {{scope.row.msgKey}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" label="msg"><template scope="scope">
  <span>
    {{scope.row.msg}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" label="消息体"><template scope="scope">
  <span>
    {{scope.row.data}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" label="是否成功"><template scope="scope">
  <span>
    {{scope.row.success}}</span>
</template>

</el-table-column>
<el-table-column width="200px" align="center" label="发生时间"><template scope="scope">
  <span>
    {{getLocalTime(scope.row.occurTime)}}</span>
</template>
      </el-table-column>

<el-table-column width="200px" align="center" label="操作">
        <template scope="scope">
            <el-button size="small" type="info"  @click="resendMsg(scope.row.msgKey)">重发</el-button>
        </template>
    </el-table-column> 

         </el-table>
        <!-- <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div> -->
    </div>
</template>

<script>
import { getConsumedInfoList,resendMessage } from "api/message/index";
export default {
  name: "messageDetail",
  props: {
    msgKey: {
      default: "1"
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      tableKey: 0
    };
  },
  created() {
    this.getMessageDetail();
  },
  methods: {
    getMessageDetail() {
      this.listLoading = true;
      console.log("getMessageDetail msgkey:" + this.msgKey);
      getConsumedInfoList(this.msgKey).then(response => {
        this.list = response.data;
        this.listLoading = false;
      });
    },

    resendMsg(msgKey) {
      resendMessage(msgKey, "consumer").then(response => {
              console.log(response);
              if(response.success){
                this.$notify({
                  title: '成功',
                  message: '重发成功',
                  type: 'success',
                  duration: 2000
                });
              }else{
                this.$notify({
                  title: '失败',
                  message: '重发失败',
                  type: 'error',
                  duration: 2000
                });
              }
            });
    },

    getLocalTime(ms) {
      if(ms==null) return null;
      return new Date(parseInt(ms)).toLocaleString('chinese',{hour12:false}).replace(/年|月/g, "-").replace(/日/g, " ");
    },
  }
};
</script>
