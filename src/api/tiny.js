import request from '@/utils/request'

export function getCruRoleTeacherYoung(data) {
  return request({
    url: `teacherYoung/getCruRoleTeacherYoung`,
    method: 'post',
    data
  })
}
export function getTinyList(data) {
  return request({
    url: '/tiny/list',
    method: 'post',
    data
  })
}
export function getTinyAdd(data) {
  return request({
    url: '/tiny/add',
    method: 'post',
    data
  })
}
export function getTinyUpdate(data) {
  return request({
    url: `/tiny/update`,
    method: 'get',
    data
  })
}
export function getTinyByStuId(data) {
  return request({
    url: `/tiny/getTinyByStuId/${data.stuId}`,
    method: 'get',
    data
  })
}
export function getTinyRemove(data) {
  return request({
    url: `/tiny/remove`,
    method: 'DELETE',
    data
  })
}
export function getTinyExport(data) {
  return request({
    url: `/tiny/export`,
    method: 'post',
    data
  })
}

