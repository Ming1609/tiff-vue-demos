<template>
  <transition name="slide">
  	<!--从右向左滑入的动画-->
  	哈哈哈哈
  </transition>
</template>

<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {getSingerDetail} from 'api/singer'
	import {ERR_OK} from 'api/config'
	export default {
    computed: {
    	// 将getters.js里的singer映射到这里
    	...mapGetters([
    	   'singer'
    	])
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
    				console.log(res.data)
    			}
    			
    		})
    		
    	}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>