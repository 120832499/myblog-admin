<template>
  <div class="components-container">
    <el-form ref="form" :model="form" label-width="80px" style="width:50%">
      <el-form-item label="文章名称" label-width='80px'>
        <el-input v-model="form.name" label-width='100px'></el-input>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="form.region" placeholder="请选择文章类型">
          <el-option v-for='item in sorts' :label="item.sort_article_name" :value="item.sort_article_id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="editor-container">
      <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
    </div>
    <div class="addarticleBtn" @click="getUEContent()">发布文章</div>
  </div>
</template>
<style>
  .components-container{
    margin:0 auto;width: 900px;
  }
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;
    margin: 10px;
    background-color: #ffffff;
  }
  .addarticleBtn{
    width: 120px;height: 40px;background: #CBCFB9;line-height: 40px;text-align: center;margin-top: 30px;margin-left: 780px;
  }
</style>
<script>
  import UE from '../../components/componentft/editor.vue';
  import axios from 'axios';
  export default {
    components: {UE},
    data() {
      return {
        sorts:[],
        defaultMsg: '<p>这里是UE测试跨域版本</p>',
        config: {
          initialFrameWidth: 900,
          initialFrameHeight: 350
        },
        form: {
          name: '',
          region: ''
        }
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        // this.$notify({
        //   title: '获取成功，可在控制台查看！',
        //   message: content,
        //   type: 'success'
        // });
        // console.log(content)
        axios({
          url:"/api/addarticle",
          method:"post",
          data:{
            content:content,
            form:this.form
          }
        }).then((res)=>{
          if(res.status==200){
            alert(res.data.message)
            }
        })
      }
    },
    mounted(){
      axios({
          url:"/api/articlesort",
          method:"get"
        }).then((res)=>{
          if(res.status==200){
              this.sorts = res.data
            }
        })
    }
  }
</script>