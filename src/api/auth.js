import request from '@/utils/request'

/**
 * 添加用户
 * @param {*} data
 */
export function addUser(data) {
  return request({
    url: '/admin/users',
    method: 'post',
    data:data
  })
}
/**
 * 获取权限列表
 */
export function getPermissionList(id) {
  return request({
    url: '/admin/permissions',
    method: 'get',
    data:{
      'id':id
    }
  })
}
/**
 * 获取权限节点
 */
export function getAllPermissions() {
  return request({
    url: '/admin/all_permissions',
    method: 'get'
  })
}
/**
 * 获取用户列表
 */
export function getUserList() {
    return request({
      url: '/admin/users',
      method: 'get'
    })
}

/**
 * 添加权限
 * @param {*} data
 */
export function addPermissions(data) {
  return request({
    url: '/admin/permissions',
    method: 'post',
    data:data
  })
}

export function updatePermissions(data){
  return request({
    url: '/admin/permissions/'+data.id,
    method: 'put',
    data:data
  })
}
/**
 * 删除权限
 * @param {*} id
 */
export function delPermissions(id) {
  return request({
    url: '/admin/permissions/'+id,
    method: 'delete'
  })
}
/**
 * 更新用户
 * @param {*} data
 */
export function updateUser(data){
  return request({
    url: '/admin/users/'+data.id,
    method: 'put',
    data:data
  })
}



