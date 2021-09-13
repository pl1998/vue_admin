import request from '@/utils/request'

/**
 * 获取任务列表
 * @param {*} data
 * @returns
 */
export function getTaskList(data) {
  return request({
    url: '/server/tasks',
    method: 'get',
    params:data
  })
}
/**
 * 删除任务
 * @param {*} data
 */
export function delTask(data) {
  return request({
    url: '/server/tasks/'+data.id,
    method: 'delete',
    data
  })
}

/**
 * add任务
 * @param {*} data
 */
 export function addTask(data) {
  return request({
    url: '/server/tasks',
    method: 'post',
    data
  })
}

/**
 * update任务
 * @param {*} data
 */
 export function updateTask(data) {
  return request({
    url: '/server/tasks/'+data.id,
    method: 'put',
    data
  })
}


