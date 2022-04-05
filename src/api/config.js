import request from '@/utils/request'

export function getDepartmentAdd(data) {
  return request({
    url: '/department/add',
    method: 'post',
    data
  })
}
export function getDepartmentList(data) {
  return request({
    url: '/department/list',
    method: 'post',
    data
  })
}
export function getdepartmentupdate(data) {
  return request({
    url: '/department/update',
    method: 'post',
    data
  })
}

export function getDepartmentDel(data) {
  return request({
    url: `/department/remove`,
    method: 'DELETE',
    data
  })
}
export function getDepartmentQuit(data) {
  return request({
    url: `/department/quitRemove`,
    method: 'DELETE',
    data
  })
}
export function getSpAdd(data) {
  return request({
    url: `/specialize/add`,
    method: 'post',
    data
  })
}
export function getSpList(data) {
  return request({
    url: `/specialize/list`,
    method: 'post',
    data
  })
}
export function getSpRemove(data) {
  return request({
    url: `/specialize/remove`,
    method: 'DELETE',
    data
  })
}
export function getSpUpdate(data) {
  return request({
    url: `/specialize/update`,
    method: 'post',
    data
  })
}
export function getClassAdd(data) {
  return request({
    url: `/class/add`,
    method: 'post',
    data
  })
}
export function getClassList(data) {
  return request({
    url: `/class/list`,
    method: 'post',
    data
  })
}
// export function getClassExport(data) {
//   return request({
//     url: `/class/export`,
//     method: 'post',
//     data
//   })
// } 
export function getClassUpdate(data) {
  return request({
    url: `/class/update`,
    method: 'post',
    data
  })
}
export function getClassRemove(data) {
  return request({
    url: `/class/remove`,
    method: 'DELETE',
    data
  })
}



