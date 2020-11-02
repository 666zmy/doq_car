import { axios } from '../util/request'
// https://api.yodemall.kikistudio.cn/wxApi/channel/sendCode
// https://api.yodemall.kikistudio.cn/wxApi/channel/formSubmit
const urlApi = {
  getAreaselect: '/ajax/area/select',
  sendCode: '/wxApi/channel/sendCode', //发送验证码
  loginFormSubmit: '/wxApi/channel/formSubmit'
}
export function getAreaselect (paramster) {
  return axios({
    method: 'get',
    url: urlApi.getAreaselect,
    params: paramster
  })
}
export function sendCode(paramster) {
  return axios({
    method: 'post',
    url: urlApi.sendCode,
    params: paramster
  })
}
export function loginFormSubmit(paramster) {
  return axios({
    method: 'post',
    url: urlApi.loginFormSubmit,
    data: paramster
  })
}

