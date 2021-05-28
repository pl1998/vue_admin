import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
/**
 * 更新用户信息
 * @param {*} data
 */
export function updateMe(data) {
  return request({
    url: '/auth/update',
    method: 'put',
    data:data
  })
}

export function getInfo() {
  return request({
    url: 'auth/me',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}


export function getCaptcha() {
  return request({
    url: '/captcha',
    method: 'post'
  })
}
