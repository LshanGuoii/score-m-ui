import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'DELETE'
  })
}
export function getFileController() {
  return request({
    url: '/user/upload',
    method: 'post'
  })
}

export function getReset(data) {
  console.log('[ data ]-33', data)
  return request({
    url: '/user/reset',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
export function getUpdata(data) {
  console.log('[ data ]-44', data)
  return request({
    url: '/user/update',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}
