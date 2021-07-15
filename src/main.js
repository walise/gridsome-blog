// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import './assets/css/style.css'
import DefaultLayout from '~/layouts/Default.vue'
export default function (Vue, { router, head, isClient },md) {
  // Set default layout as a global component
  head.titleTemplate = '%s - BLog!',
  // router.prototype.push = function push(location) {
  //   return router.prototype.push.call(this, location).catch(err => err)
  // }
  Vue.mixin({
    data :function(){
      return {
        GRIDSOME_API_URL: process.env.GRIDSOME_API_URL
      }
    }
  })
  // 路由拦截
  Vue.component('Layout', DefaultLayout)
}
