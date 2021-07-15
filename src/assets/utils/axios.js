// 对axios 进行二次封装 作拦截，请求头，统一处理错误等等
import axios from 'axios'
// post 请求前 改变请求的数据格式
const service = axios.create({
    baseURL: process.env.GRIDSOME_API_URL,
    // 如果请求话费了超过 `timeout` 的时间，请求将被中断
    timeout: 5000,
    // 表示跨域请求时是否需要使用凭证
    withCredentials: true,
    // proxy: {
    //     host: '117.50.84.241',
    //     port: 1337,
    //     auth: {
    //       username: 'mikeymike',
    //       password: 'rapunz3l'
    //     }
    // },
})
const err = (error) => {
    if (error.response) {
      if (error.response.status !== 200) {
        // 接口接口返回的状态码，获取对应的提示消息
        // const errorMessage = errorCode(error.response)
        // console.log(errorMessage)
        return
      }
    }
    return Promise.reject(error)
  }
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    
    // 添加请求头，
    const token = localStorage.getItem('jwt')
    if(token){
        config.headers['Authorization'] = 'Bearer '+token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
// 响应数据拦截中
service.interceptors.response.use((response) => {
    return response.data
  }, err)
export {
    service as axios
}