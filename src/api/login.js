import { axios } from './../util/request'
const urlApi = {
  getAreaselect: '/ajax/area/select'
}
export function getAreaselect (paramster) {
  return axios({
    methods: 'get',
    url: urlApi.getAreaselect,
    params: paramster
  })
}
