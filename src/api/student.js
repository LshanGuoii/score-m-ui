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

