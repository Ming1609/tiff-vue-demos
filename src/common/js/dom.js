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
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
