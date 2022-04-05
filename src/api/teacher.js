import request from '@/utils/request'

export function getTeacherList(data) {
  return request({
    url: '/teacher/list',
    method: 'post',
    data
  })
}
export function getTeacherAdd(data) {
  return request({
    url: '/teacher/add',
    method: 'post',
    data,

  })
}
export function getTeacherUpdate(data) {
  return request({
    url: `/teacher/update`,
    method: 'post',
    data
  })
}
export function getTeacherRemove(data) {
  return request({
    url: `/teacher/remove`,
    method: 'DELETE',
    data
  })
}

