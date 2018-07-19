<template>
  <div id="nav">
    <el-container>
	  <el-header class="header">
      <div class="header_left">{{title}}</div>
      <div class="header_right">
      <span>管理员</span>
      <span>退出</span>
      </div>
      </el-header>
	  <el-container>
	    <el-aside width="200px">
            <el-menu default-active="2" router class="el-menu-vertical-demo" background-color="#DDEFEE" text-color="#3c3c3c" active-text-color="#47A2EF">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document" color="#3c3c3c"></i>
                  <span>文章管理</span>
                </template>
                <el-menu-item index="1-1" route="articlelist">文章列表</el-menu-item>
                <el-menu-item index="1-2" route="addarticle">发布文章</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-news" color="#3c3c3c"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item index="2-1">用户列表</el-menu-item>
                <el-menu-item index="2-2">新建用户</el-menu-item>
              </el-submenu>
            </el-menu>
	    </el-aside>
	    <el-main direction='vertical' :width=mainW>
          <router-view :width=mainW></router-view>
      </el-main>
	  </el-container>
	</el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'nav',
  data () {
  	return {
  		title:"后台管理系统",
      mainW:document.body.clientWidth-200+"px"
    }
  },
  mounted(){
    this.checkSign()
    window.onresize = function(){
        this.mainW=document.body.clientWidth-200+'px'
    }
  },
  methods: {
    checkSign(){
      axios({
        url:"/api/isLogin",
        method:"get"
      }).then((res)=>{
        if(res.status==200){
          if (res.data == 'FAIL') {
            this.$router.push('/sign')
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
    .header{
        background: #DDEFEE;color:#1c1c1c;height: 60px;border-bottom: 1px solid #ccc;
        .header_left{
            float: left;font-size: 32px;line-height: 60px;
        }
        .header_right{
            float: right;line-height: 60px;
        }
    }
</style>
