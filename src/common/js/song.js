// ES6提供了class这个概念，作为对象的模板。通过class关键字，可以定义类；
// 定义Song类，他里面有个constructor方法，这就是构造方法；而this关键字则代表实例对象
// constructor方法是类的默认方法，通过new 命令生成对象实例时，自动调用该方法，一个类必
// 须有constructor方法，如果没有显示定义，一个空的constructor方法会被默认添加；

// 设计成类的好处：有利于代码的统一维护，类的扩展性比对象好很多，是一种面向对象的编程方式。

export default class Song {
	// 提取出我们想要的数据，so,定义Song类，constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法
  	// 参数多的时候，我们会传入一个对象来装载。
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}


//给song类再扩展一个工厂方法,工厂方法就是不直接去new,而是直接返回一个实例
export function createSong(musicData){
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		albumname: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
	})
}

function filterSinger(singer) {
	// musicData.singer是一个数组,这里按照需求将其转换成字符串
	let ret = []
	if (!singer) {
		return ''
	}
	singer.forEach((s) => {
		ret.push(s.name)
	})
	return ret.join('/')
}
