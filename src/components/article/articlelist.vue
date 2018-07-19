<template>
	<div style="width:900px;margin:0 auto">
		<el-table
	    :data="tableData"
	    style="width: 900px"
	    >
	    <el-table-column
	      label="序号"
	      type='index'
	      width="50"
	      align="center"> 
	    </el-table-column>
	    <el-table-column
	      label="标题"
	      width="310"
	      align="center">
	      <template slot-scope="scope">
	          <p>{{ scope.row.article_name }}</p>
	      </template>
	    </el-table-column>
	    <el-table-column
	      label="分类"
	      width="180"
	      align="center">
	      <template slot-scope="scope">
	          <p>{{ scope.row.sort_article_name}}</p>
	      </template>
	    </el-table-column>
	    <el-table-column
	      label="日期"
	      width="180"
	      align="center">
	      <template slot-scope="scope">
	        <i class="el-icon-time"></i>
	        <span style="margin-left: 10px">{{ scope.row.article_time }}</span>
	      </template>
	    </el-table-column>
	    
	    <el-table-column label="操作" align="center" width="180">
	      <template slot-scope="scope">
	        <el-button
	          size="mini"
	          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	        <el-button
	          size="mini"
	          type="danger"
	          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-pagination
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30]"
	      :page-size="10"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total=count>
	    </el-pagination>
	</div>
	
</template>
<script type="text/javascript">
	import axios from 'axios';
	export default {
    data() {
      return {
        tableData: [
	       
        ],
        currentPage: 1,
        count:0
      }
    },
    methods: {
      handleEdit(index, row) {
        this.$store.state.article = row
        // console.log(index, row);
        this.$router.push('/updatearticle')
      },
      handleDelete(index, row) {
      	alert('目前不允许删除')
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.$set(this.currentPage,val)
        this.myAjax()
      },
      myAjax:function(){
			axios({
				url:"/api/articlelist?page="+this.currentPage,
				method:"get"
			}).then((res)=>{
				if(res.status==200){
					this.tableData=res.data.article
					this.count = res.data.count
	        	}
			})
		}
    },
    mounted:function(){
    	this.myAjax()
    }
  }
</script>