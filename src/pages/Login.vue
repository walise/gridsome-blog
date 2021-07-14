<template>
    <div>
        <!-- :display="alertDisplay" -->
        <Alerts :title="alertTitle" :type="alertType" ref="myAlert"></Alerts>
        <div class="login">
        <div class="login-top">
            <div class="brand">
                    blog
                </div>
                <div v-if="tab === 'regist'">
                    已有账号？<span @click="toLogin('login')"> 直接登录</span>
                </div>
                <div v-else>
                    还没有账号？<span @click="toLogin('regist')">去创建一个吧</span>
                </div>
        </div>
        <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="用户名" v-if="tab === 'regist'">
                <el-input type="text" v-model="user.username" > </el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input type="email" v-model="user.email" ></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="user.password" ></el-input>
            </el-form-item>
            <el-form-item label-width="0" style="margin-top:50px">
                <el-button type="primary" style="width:100%" @click.prevent="login">{{tab==='regist'?'注册':'登录'}}</el-button>
            </el-form-item>
        </el-form>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import Alerts from '@/components/Alerts'
export default {
    name: 'loginPage',
    metaInfo:{
        title: '登录',
    },
    data: function () {
        return {
            tab: 'regist',
            user: {
                blocked: false,
                confirmed: false,
                email: '',
                username: '',
                password: ''
            },
            alertTitle: '',
            alertType: '',
            alertDisplay: false
        }
    },
    watch: {
       
    },
    components: {
        Alerts
    },
    mounted(){
        // 根据路由中传入的type 来显示登录框中的内容
        this.tab = this.$route.query.do
        console.log(this.tab)
    },
    methods: {
        toLogin (tab) {
            this.tab = tab;
        },
        login () {
            let url;
            let mehod;
            let that = this;
            if(this.tab === 'regist'){
                // 注册
                url = '/auth/local/register'
                mehod = 'POST'
            }else{
                // 登录
                url = '/auth/local'
                mehod = 'POST'
            }
                axios({
                    method: mehod,
                    url:'http://localhost:1337'+url,
                    data: that.tab === 'regist'? that.user: {
                        // identifier 登录标志符  必须为这个，不然就会报错
                        identifier: that.user.email,
                        password: that.user.password
                    },
                }).then((res)=>{
                    // 如果请求成功， 能获取到data
                    if(res.data){
                        // 存储用户信息 以及jwk
                        localStorage.setItem('jwt',res.data.jwt)
                        localStorage.setItem('user', JSON.stringify(res.data.user))     
                        // 跳转页面
                        that.$router.push({
                            path:'/'
                        })
                    }
                }).catch(err=>{
                    // 提示框的信息为错误信息
                    that.$nextTick(function(){
                        that.$refs.myAlert.showDisplay()
                        that.alertType = 'erro'
                        that.alertTitle = '请求失败，请稍后再试'
                        // that.alertDisplay = true;
                    })
                    
                })
        }
    },
}
</script>

<style scoped>
    .login{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 25rem;
        max-height:24rem;
        padding: 20px;
        border-radius: 2px;
        
        background-color: rgb(255, 255, 255);
        box-shadow: rgb(227 233 243) 0px 2px 4px 4px;
    }
    .login-top{
        text-align: center;
        padding-bottom: 20px;
    }
    .brand{
        width: 80px;
        height: 60px;
        margin: 10px auto;
    }
    .login-form{
        display: block;
        margin-top: 20px;
    }
    .login-form .btn{
        margin-top: 30px;
    }
</style>