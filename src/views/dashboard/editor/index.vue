<template>
<div class="dashboard-editor-container">
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="data in list" :key="data.list">
       <img v-bind:src="data.src">
      </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  name: "dashboard-editor",
  data() {
    return {
      list: [
        { src: "../../../static/tinymce/skins/lightgray/img/model.jpg" },
        {
        //   src: "http://www.caiqi.com/upload/image/19/2017-06-07/2017060711393060.jpg"
        },
        { src: "../static/images/B1.jpg" },
        { src: "../static/images/B3.jpg" }
      ]
    };
  }
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>