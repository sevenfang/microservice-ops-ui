 <template>
<div>
    <iframe :src=url height="1024"  width="100%" id="myiframe" name="my"></iframe>
</div>
</template>

 
<script>
  export default{
    // 使用时请使用 :url.sync=""传值
    
    data () {
      return {
        // //10.180.4.222:9002/swagger-ui.html 
        url:'',
        loading: false,
        html: ''
      }
    }, 
    mounted () {
      // alert(window.location.hash);  
      this.url=this.$route.query.href;
    },
    methods: {
       
    }
  }
</script>
 
<style>
body{margin:0; padding:0;}

</style>
