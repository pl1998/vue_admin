import request from '@/utils/request'

/**
 * 添加用户
 * @param {*} data
 */
export function getSystem() {
  return request({
    url: '/admin/system',
    method: 'get'
  })
}
