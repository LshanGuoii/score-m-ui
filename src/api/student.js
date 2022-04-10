import request from '@/utils/request'

export function getStudentList(data) {
  return request({
    url: '/student/list',
    method: 'post',
    data
  })
}
export function getStudentAdd(data) {
  return request({
    url: '/student/add',
    method: 'post',
    data
  })
}
export function getStudentUpdate(data) {
  return request({
    url: `/student/update`,
    method: 'post',
    data
  })
}
export function getStudentRemove(data) {
  return request({
    url: `/student/remove`,
    method: 'DELETE',
    data
  })
}
export function getStudentExport(data) {
  return request({
    url: `/student/export`,
    method: 'post',
    data
  })
}
export function getStudentImportData(data) {
  return request({
    url: `/student/importData`,
    method: 'post',
    data
  })
}
export function getStudentImportTemplate(data) {
  return request({
    url: `/student/importTemplate`,
    method: 'post',
    data
  })
}



