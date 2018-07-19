<template>
	<div class="updatearticle">
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
	    <div class="addarticleBtn" @click="getUEContent()">修改文章</div>
	</div>	
</template>
<style type="text/css">
	.updatearticle{
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
export default{
	components: {UE},
	data(){
		return {
			sorts:[],
			id:this.$store.state.article.article_id,
			defaultMsg:this.$store.state.article.article_content,
			form: {
				name: this.$store.state.article.article_name,
	          	region: this.$store.state.article.sort_article_id
	        },
	        config: {
	          initialFrameWidth: 900,
	          initialFrameHeight: 350
	        }
		}
	},
	methods:{
		getUEContent() {
	        let content = this.$refs.ue.getUEContent();
	        axios({
	          url:"/api/updatearticle",
	          method:"post",
	          data:{
	          	id:this.id,
	            content:content,
	            form:this.form
	          }
	        }).then((res)=>{
	          if(res.status==200){
	              alert(res.data.message)
	              this.$router.go(-1)
	            }
	        })
	      }
	},
	mounted:function(){
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