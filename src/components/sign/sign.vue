<template>
  <div :width=Width style="background: #c5c5c5;height:500px;border-top: 1px solid #fff;margin-top:60px">
    <div class="sign">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="age">
          <el-input v-model.number="ruleForm2.age"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  
  
</template>
<style>
  
</style>
<script>
import axios from 'axios';
export default{
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value.toString().length !== 11) {
              callback(new Error('账号输入错误'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        },
        Width:''
      }
    },
    mounted(){
      window.onresize = function(){
          this.Width=document.body.clientWidth+'px'
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios({
              url:"/api/sign",
              method:"post",
              data:{
                user:this.ruleForm2.age,
                pass:this.ruleForm2.pass
              }
            }).then((res)=>{
              if(res.status==200){
                  if (res.data.ret_code == 4) {
                    this.$router.push('/')
                  }else{
                    alert(res.data.ret_msg)
                  }
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
  
</script>
<style lang="less">
  .sign{
    width: 350px;height: 200px;margin: 0 auto;margin-top: 170px;
  }
</style>