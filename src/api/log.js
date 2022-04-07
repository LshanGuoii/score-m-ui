import request from '@/utils/request'

export function getOperlogList(data) {
  return request({
    url: '/operlog/list',
    method: 'post',
    data
  })
}

export function getOperlogRemove(data) {
  return request({
    url: `/operlog/remove`,
    method: 'DELETE',
    data
  })
}
export function getOperlogExport(data) {
  return request({
    url: `/operlog/export`,
    method: 'post',
    data
  })
}

