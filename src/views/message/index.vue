 <template>
<div class="app-container calendar-list-container">
  <div class="filter-container">
    <span class="demonstration">msgKey</span>
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="msgKey" v-model="listQuery.msgKey"> </el-input>
    <span class="demonstration">交换机名称</span>
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="交换机名称" v-model="listQuery.exchangeName"> </el-input>
    <span class="demonstration">发送者应用</span>
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="发送者应用" v-model="listQuery.sender"> </el-input>
    <div class="block">
      <span class="demonstration">发送者IP</span>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="发送者IP" v-model="listQuery.host"> </el-input>
      <span class="demonstration">发送开始时间</span>
      <el-date-picker
        v-model="listQuery.occurStartTime"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions1">
      </el-date-picker>
      <span class="demonstration">发送结束时间</span>
      <el-date-picker
        v-model="listQuery.occurEndTime"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions1">
      </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    </div>
  </div>
  
<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column  type="index" :index="indexMethod">
    </el-table-column>
  
    <el-table-column width="150px" align="center" label="IP">
        <template scope="scope">
            <span>{{scope.row.host}}</span>
        </template>
    </el-table-column>

    <el-table-column width="350px" align="center" label="msgKey">
        <template scope="scope">
            <span> {{scope.row.msgKey}}</span>
        </template>
    </el-table-column>

    <el-table-column width="150px" align="center" label="状态">
        <template scope="scope">
            <span>{{scope.row.status}}</span>
        </template>
    </el-table-column> 
    
    <el-table-column width="150px" align="center" label="是否成功">
        <template scope="scope">
            <span>{{scope.row.success}}</span>
        </template>
    </el-table-column> 
    <el-table-column width="180px" align="center" label="生成时间">
      <template scope="scope">
          <span>{{getLocalTime(scope.row.occurTime)}}</span>
      </template>
    </el-table-column>
    <el-table-column width="150px" align="center" label="exchange名称">
      <template scope="scope">
          <span>{{scope.row.exchangeName}}</span>
      </template>
    </el-table-column>
    <el-table-column width="150px" align="center" label="路由key">
      <template scope="scope">
          <span>{{scope.row.routingKey}}</span>
      </template>
    </el-table-column>
    <el-table-column width="150px" align="center" label="发送者">
      <template scope="scope">
          <span>{{scope.row.sender}}</span>
      </template>
    </el-table-column>
    <el-table-column width="150px" align="center" label="生产失败次数">
      <template scope="scope">
          <span>{{scope.row.produceFailTimes}}</span>
      </template>
    </el-table-column>
    <el-table-column width="150px" align="center" label="消费失败次数">
      <template scope="scope">
          <span>{{scope.row.consumeFailTimes}}</span>
      </template>
    </el-table-column>
    <el-table-column width="180px" align="center" label="生产成功时间">
      <template scope="scope">
          <span>{{getLocalTime(scope.row.produceSuccessTime)}}</span>
      </template>
    </el-table-column>
    <el-table-column width="180px" align="center" label="消费成功时间">
      <template scope="scope">
          <span>{{getLocalTime(scope.row.consumeSuccessTime)}}</span>
      </template>
    </el-table-column>

    <el-table-column width="100px" align="center" label="消息体">
        <template scope="scope">
            <el-button size="small" type="info"  @click="showScript(scope.row.data)">查看</el-button>
        </template>
    </el-table-column> 
    <!-- <el-table-column width="100px" align="center" label="详情">
    </el-table-column>  -->
    <el-table-column width="200px" align="center" label="操作">
        <template scope="scope">
            <el-button size="small" type="info"  @click="showScript(scope.row.data)">详情</el-button>
            <el-button size="small" type="info"  @click="showScript(scope.row.data)">重发</el-button>
        </template>
    </el-table-column> 
</el-table>

  <!-- 分页 -->
  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>

  <!-- 模态框 -->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

    
    
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">

        
        <el-form-item label="过滤名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入过滤名称"></el-input>
        </el-form-item>
        <el-form-item label="过滤类型" prop="name">
          <el-input v-model="form.type" placeholder="请输入过滤类型"></el-input>
        </el-form-item>
        <el-form-item label="执行顺序" prop="url">
          <el-input v-model="form.orders" placeholder="请输入执行顺序"></el-input>
        </el-form-item> 

      <el-form-item label="执行环境">
        <el-radio-group v-model="form.execSetting"  border=true size="medium">
          <el-radio  label="true">是</el-radio>
          <el-radio  label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="金丝雀环境">
        <el-radio-group v-model="form.canarySetting" size="medium">
          <el-radio  label="true">是</el-radio>
          <el-radio  label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
        <el-form-item label="版次" prop="description">
          <el-input v-model="form.version" autosize placeholder="请输入版次"></el-input>
        </el-form-item>
         <el-form-item label="服务名称" prop="serviceName">
          <el-input v-model="form.serviceName" placeholder="请输入服务名称"></el-input>
        </el-form-item> 
      <el-form-item label="过滤脚本" prop="description"> 
        <el-input type="textarea" v-model="form.script" placeholder="请输入过滤脚本"  :autosize="{ minRows: 5, maxRows: 8}"></el-input>
      </el-form-item> 
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel('form')">取 消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
      <el-button v-else type="primary" @click="update('form')">确 定</el-button>
    </div>
  </el-dialog>




    <!-- 详情模态框 -->
  <el-dialog  title="消息体"  :visible.sync="dialogForScript">
    <el-form>
      <el-form-item > 
        <el-input type="textarea" v-model="showScriptdata" placeholder="message"  :autosize="{ minRows: 5}"></el-input>
      </el-form-item> 
    </el-form>
 
    <div slot="footer" class="dialog-footer">
      <el-button  type="success"    @click="dialogForScript = false">关闭</el-button> 
    </div>
  </el-dialog>

</div>
</template>

 <script>
import {
  getMessageList,
  getMessage
} from "api/message/index";
import { mapGetters } from "vuex";
export default {
  name: "messages",
  data() {
    return {
      form: {
        name: undefined,
        serviceName: undefined,
        type: undefined,
        orders: undefined,
        execSetting: false,
        canarySetting: false,
        version: undefined,
        script: undefined
      },
      rules: { 
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        serviceId: undefined,
        msgKey:'',
        exchangeName:'',
        sender:'',
        host:'',
        occurStartTime:'',
        occurEndTime:''
      },
      dialogForScript: false,
      showScriptdata: undefined,
      dialogFormVisible: false,
      dialogStatus: "",
      groupTypeManager_btn_edit: false,
      groupTypeManager_btn_del: false,
      groupTypeManager_btn_add: false,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      tableKey: 1,
      pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
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
    showScript(message) {
      this.dialogForScript = true;
      this.showScriptdata = this.formatJson(message);
    },

    indexMethod(index) {
      return index * 2;
    },
    //获取列表
    getList() {
      this.listLoading = true;
      getMessageList(this.listQuery).then(response => {
        console.log("走这里了吗");
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    // 更新列表
    handleUpdate(row) {
      getObj(row.id).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {
        path: undefined,
        serviceId: undefined,
        url: undefined,
        stripPrefix: undefined,
        retryable: undefined
      };
    },
    formatJson(json, options) {
      var reg = null,
          formatted = '',
          pad = 0,
          PADDING = '    '; 
      options = options || {};
      options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
      options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
      if (typeof json !== 'string') {
          json = JSON.stringify(json);
      } else {
          json = JSON.parse(json);
          json = JSON.stringify(json);
      }
      reg = /([\{\}])/g;
      json = json.replace(reg, '\r\n$1\r\n');
    
      reg = /([\[\]])/g;
      json = json.replace(reg, '\r\n$1\r\n');
    
      reg = /(\,)/g;
      json = json.replace(reg, '$1\r\n');
    
      reg = /(\r\n\r\n)/g;
      json = json.replace(reg, '\r\n');
    
      reg = /\r\n\,/g;
      json = json.replace(reg, ',');
    
      if (!options.newlineAfterColonIfBeforeBraceOrBracket) {        
          reg = /\:\r\n\{/g;
          json = json.replace(reg, ':{');
          reg = /\:\r\n\[/g;
          json = json.replace(reg, ':[');
      }
      if (options.spaceAfterColon) {         
          reg = /\:/g;
          json = json.replace(reg, ': ');
      }
    
      $.each(json.split('\r\n'), function(index, node) {
          var i = 0,
              indent = 0,
              padding = '';
    
          if (node.match(/\{$/) || node.match(/\[$/)) {
              indent = 1;
          } else if (node.match(/\}/) || node.match(/\]/)) {
              if (pad !== 0) {
                  pad -= 1;
              }
          } else {
              indent = 0;
          }
    
          for (i = 0; i < pad; i++) {
              padding += PADDING;
          }
    
          formatted += padding + node + '\r\n';
          pad += indent;
      });
    
      return formatted;
    },
    getLocalTime(ms) {
      if(ms==null) return null;
      return new Date(parseInt(ms)).toLocaleString('chinese',{hour12:false}).replace(/年|月/g, "-").replace(/日/g, " ");
    }
  }
};
</script>
