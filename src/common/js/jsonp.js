import originJsonp from 'jsonp'
export default function jsonp(url, data, option) {
  // 对外暴露一个方法jsonp，jsonp(url, data, option)返回一个Promise
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  // 如果url没有包含？号，第一个就是？，有就用‘&’符号。param(data)调用拼接后面的参数方法。
  return new Promise((resolve, reject) => {
  // 封装
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
export function param(data) {
// url往往带一些参数以data传入,是需要我们把data去拼接到url上去，
  let url = ''
  for (var k in data) {
  // 遍历data
    let value = data[k] !== undefined ? data[k] : ''
    // data[k] !== undefined，值就是data[k],否则就标记为空字符（因为不能传undefined）
    url += '&' + k + '=' + encodeURIComponent(value)
    // 用'&'拼接到url上去。
  }
  return url ? url.substring(1) : ''
  // 如果url已经有data的话，就去掉第一个'&'
}