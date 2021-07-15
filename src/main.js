// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import './assets/css/style.css'
import DefaultLayout from '~/layouts/Default.vue'
export default function (Vue, { router, head, isClient },md) {
  // Set default layout as a global component
  head.titleTemplate = '%s - Yay!',
  // router.prototype.push = function push(location) {
  //   return router.prototype.push.call(this, location).catch(err => err)
  // }
  Vue.mixin({
    data :function(){
      return {
        GRIDSOME_API_URL : process.env.GRIDSOME_API_URL
      }
    }
  })
  // 路由拦截
  router.beforeEach((to, from, next) => {
    // Do stuff before next page load
    // 判断用户是否登录
    // 如果已经登录 将不再跳转至 登录页面
    // const isLogin= localStorage.getItem('user') ? true:false;
    // if(isLogin&&to.name === 'login'){
    //   next(false)
    // }
    // else{
    //   next()
    // }
  })
  Vue.component('Layout', DefaultLayout)
}
