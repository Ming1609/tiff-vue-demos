export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  // className开头，或者空白字符在它前面，className结尾，或者空白字符在它后面
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
  	//有className就什么都不做。直接return
    return
  }
	// 没有就addClass
  let newClass = el.className.split(' ')
  // 用空格将el.className拆开成数组newClass。
  newClass.push(className)
  // 将要添加的className添加到数组newClass中去
  el.className = newClass.join(' ')
  //将新数组以空格连接成字符串。
}

export function getData(el, name, val) {
	// 获取data-xx属性，有val值则set，无则get
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

// 能力检测
// 创建一个div去拿到style
let elementStyle = document.createElement('div').style

let vendor = (() => {
	// 供应商
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
  	//遍历查询是哪种浏览器供应商
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  // 都无法匹配就是浏览器有毛病
  return false
})()
 //依据浏览器，自动去添加相应的前缀或者standard情况下啥都不添加
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
  //返回字符串（由前缀+样式名首字母转换成大写+截取首字母之后的所有字字符组成）
}
