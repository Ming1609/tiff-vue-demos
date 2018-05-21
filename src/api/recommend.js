import jsonp from 'common/js/jsonp'
// 因为是利用jsonp去抓取数据。
import {commonParams, options} from './config'
// 导入公用参数commonParams，options。因为是export，而非export default，所以导入要加{}。
import axios from 'axios'

export function getRecommend() {
  // 封装获取轮播数据的方法
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    // Object.assign()方法es6用于对象的合并。
    platform: 'h5',
    // 请求来自h5平台
    uin: 0,
    // 默认QQ号为0
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getDiscList() {
  // 封装获取推荐歌单数据的方法
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json' 
  })

  return axios.get(url, {
  	params: data
  }).then((res) => {
  	return Promise.resolve(res.data)
  })
}