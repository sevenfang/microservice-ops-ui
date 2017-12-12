<template>
  <div>
    <v-html-panel url.asyc="url1"></v-html-panel> 
  </div>
</template>
<style scoped>
  div{color:red}
</style>
<script>
  export default{
    data () {
      return {
        url1: '' 
      }
    },
    mounted () {
      this.url1 = 'http://10.180.4.222:9002/swagger-ui.html' 
    },
    methods: {
    }
  }
</script>