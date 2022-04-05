import request from '@/utils/request'

export function getCourseList(data) {
  return request({
    url: '/course/list',
    method: 'post',
    data
  })
}
export function getCourseAdd(data) {
  return request({
    url: '/course/add',
    method: 'post',
    data
  })
}
export function getCourseUpdate(data) {
  return request({
    url: `/course/update`,
    method: 'post',
    data
  })
}
export function getCourseRemove(data) {
  return request({
    url: `/course/remove`,
    method: 'DELETE',
    data
  })
}
export function getCourseExport(data) {
  return request({
    url: `/course/export`,
    method: 'post',
    data
  })
}

