import request from '@/utils/request'

export function getTeacherYoungList(data) {
  return request({
    url: '/teacherYoung/list',
    method: 'post',
    data
  })
}
export function getTeacherYoungAdd(data) {
  return request({
    url: '/teacherYoung/add',
    method: 'post',
    data,

  })
}
export function getTeacherYoungUpdate(data) {
  return request({
    url: `/teacherYoung/update`,
    method: 'post',
    data
  })
}
export function getTeacherYoungRemove(data) {
  return request({
    url: `/teacherYoung/remove`,
    method: 'DELETE',
    data
  })
}

