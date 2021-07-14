<template>
  <div class="layout sticky-header">
    <header class="header sticky">
        <div class="container">
            <div class="brand">
                <g-link to="/">
                    <img src="/img/logo.svg" alt="brand" class="logo">
                </g-link>
            </div>
            <div class="nav right">
                <g-link class="nav__link" to="/posts">Journal</g-link>
                <g-link class="nav__link" to="/social">Say Hi!</g-link>
            </div>
        </div>  
    </header>
    <!-- content -->
    <div class="container">
        <slot></slot>
        <!-- Footer-->
        <footer>
            <div class="container">
                <span>Copyright © 2021</span>
            </div>
        </footer>
    </div><!--/.container-->
    
  </div>
</template>
<script>
export default {
    provide(){
        return {
            reload: this.reload
        }
    },
    data: function () {
        return {
            navList: [],
            isRouterAlive: true,
            user: null,
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        }
    },
    computed: {
        
    },
    created () {
        // 获取登录用户信息
        this.user = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
    },
    methods: {
        logout () {
            // 退出登录 清空所有缓存
            localStorage.clear()
            // 并跳转到首页
            // 这里遇到个问题 在首页不能重复跳转首页
            // 创建个新页面跳转到新页面 再返回到当前页面
            this.$router.push('/template')
            this.$router.go(-1) // 返回上一个页面
            // this.$router.push({
            //     path: '/'
            // })
            this.reload();
        },
        reload () {
            console.log('刷新页面')
            this.isRouterAlive = false
            this.$nextTick(function(){
                this.isRouterAlive = true
            })
        }
    }
}
</script>
<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style>
</style>
