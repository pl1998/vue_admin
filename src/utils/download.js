import axios from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'
const download = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    withCredentials: true,
  },
  baseURL: process.env.VUE_APP_HOST, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 60 // request timeout
})
// request interceptor
download.interceptors.request.use(
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
download.interceptors.response.use(
  response => {
    var blob = new Blob([response.data])
    var downloadElement = document.createElement('a');
　　var href = window.URL.createObjectURL(blob); //创建下载的链接
　　downloadElement.href = href;
　　downloadElement.download = new Date().getTime()+'.xlsx'; //下载后文件名
　　document.body.appendChild(downloadElement);
　　downloadElement.click(); //点击下载
　　document.body.removeChild(downloadElement); //下载完成移除元素
　　window.URL.revokeObjectURL(href); //释放掉blob对象
  },
  error => {
    Notification({
      message: error.message,
      type: 'warning',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)



export default download
