import request from '@/utils/request'

export function addUser(data) {
  return request({
    url: '/admin/users',
    method: 'post',
    data:data
  })
}

export function getPermissionList() {
  return request({
    url: '/admin/permissions',
    method: 'get'
  })
}

// export function getAllPermissions() {
//   return request({
//     url: '/auth/all_permissions',
//     method: 'get'
//   })
// }

export function getUserList() {
    return request({
      url: '/admin/users',
      method: 'get'
    })
}



