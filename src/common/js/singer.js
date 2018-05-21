export default class Singer {
	// 定义Singer类，constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法
	// ${xxx}字符串连接
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}