<template>
  <transition name="slide">
  	<!--从右向左滑入的动画-->
  	<music-list :songs='songs' :title='title' :bg-image='bgImage' ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'
	import MusicList from 'components/music-list/music-list'
	export default {
		data() {
			return {
				songs : []
			}
		},
    computed: {
    	// 将getters.js里的singer映射到这里
    	...mapGetters([
    	   'singer'
    	]),
    	// 通过计算属相去获取singer-detai的标题与背景图片,传给子组件music-list
    	title() {
    		return this.singer.name
    	},
    	bgImage() {
    		return this.singer.avatar
    	},
    	
    },
    created() {
    	// console.log(this.singer)
    	this._getDetail()
    },
    methods: {
    	_getDetail() {
    		if(!this.singer.id) {
    			// 边界情况：如果不小心刷新当前详情页，因为没点击，所以此时并没有设置singer，singer刷新后是一个空对象，
    			// 此时是拿不到singer.id的情况，就让路由回退到上一页
    			this.$router.push('/singer')
    			return
    		}
    		getSingerDetail(this.singer.id).then((res)=> {
    			if(res.code===ERR_OK) {
    				// console.log(res.data.list)
    				this.songs = this._normalizeSongs(res.data.list)
    				// console.log(this.songs)
    			}
    		})
    	},
    	
    	// 遍历res.data.list数组,拿到我们想要抽象的数据，构造出一个新数组ret
    	_normalizeSongs(list) {
    		let ret = []
    		// forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数
    		list.forEach((item) => {
    			// 结构赋值
    			let {musicData} = item
    			// 将musicData转化成data里定义的songs
    			if(musicData.songid && musicData.albummid){
    				ret.push(createSong(musicData))
    			}
    		})
    		return ret
    	}
    },
    components: {
    	MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>