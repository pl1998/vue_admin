import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
 baseURL:process.env.VUE_APP_HOST, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    // console.log(store.getters.app_id)
		// if (store.getters.app_id) {
		// 	config.headers['app-id'] = store.getters.app_id
    // }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if(res.code ==403) {
      Message({
        message: res.message || '没有权限操作',
        type: 'warning',
        duration: 5 * 1000
      })
    }else if(res.code==400){
      Message({
        message: res.message || '请求参数不合格',
        type: 'warning',
        duration: 5 * 1000
      })
    }else if(res.code==500){
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    else if(res.code==40001){
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    else if(res.code==10004){
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }


    else if(res.code==10006){
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    else if(res.code==10005){
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    else if(res.code==500){
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'warning',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
