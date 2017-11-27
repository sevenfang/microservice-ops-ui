<template>
<div>
  <el-input value="内容"  > </el-input>
   
  <el-button icon="edit">按钮</el-button>

  <el-table  :data="list">
    <el-table-column   label="姓名">
          <template scope="scope">
             <span>{{scope.row.name}}--------</span> 
          </template>
    </el-table-column>
    <el-table-column   label="年龄">
          <template scope="scope"> 
             <span>{{scope.row.age}}</span>     
          </template>
    </el-table-column>

    <el-table-column>
         <template scope="scope">
        <el-button icon="edit">编辑</el-button>
        <el-button icon="del" v-if="groupTypeManager_btn_edit" class="el-button--danger">删除</el-button>
        </template>
    </el-table-column>
  </el-table>


  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      bl: "O(∩_∩)O哈哈~",
      list: [
        {
          name: "胡玉龙1",
          age: "131"
        },
        {
          name: "胡玉龙2",
          age: "132"
        },
        {
          name: "胡玉龙3",
          age: "133"
        }
      ],
      groupTypeManager_btn_edit:true
    };
  },
  methods: {
    searchbtn() {
      alert(1);
    }
  }
};
</script>

<style>

</style>
