import request from '@/utils/request'

export function getPermissionList() {
  return request({
    url: '/auth/permissions', 
    method: 'get'
  })
}

export function getUserList() {
    return request({
      url: '/auth/user', 
      method: 'get'
    })
  }

