<template>
	<!--music-list组件 start-->
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
    	<div class="play-wrapper">
          <div ref="playBtn" v-show="songs.length>0" class="play" >
          	<!--songs.length>0列表出来后再展示该按钮-->
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
    	<div class="filter" ref="filter"></div>
    </div>
    
     <div class="bg-layer" ref="layer"></div>
    <!--scroll组件 start-->
    <scroll @scroll="scroll" :data="songs" class="list" ref="list" :listen-scroll="listenScroll" :probe-type="probeType">
    	<!--:data="songs"为了正确计算高度一定要传入，class="list"样式也要加，否则无法滚动-->
      <!--song-list组件 start-->
	    <div class="song-list-wrapper">
	  	  <song-list :songs="songs"></song-list>
	    </div> 
	    <!--song-list组件 end-->
	    <div v-show="!songs.length" class="loading-container">
          <loading></loading>
        </div>
	  </scroll>
	   <!--scroll组件 end-->
  </div> 
  <!--music-list组件 end-->
</template>

<script type="text/ecmascript-6">
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {prefixStyle} from 'common/js/dom'
  // 浏览器会检测内核，自动添加前缀
  const  transform = prefixStyle('transform')
  
  const RESERVED_HEIGHT = 40
  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    data() {
    	return {
    		scrollY: 0
    	}
    },
    created() {
      this.listenScroll = true
    	this.probeType = 3
    	// 1：滚动的时候会派发scroll事件，会截流。
    	// 2：滚动的时候实时派发scroll事件，不会截流。 
    	// 3：除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
    },
    mounted() {
    	// 利用引用获取列表的top值,this.$refs.list 是一个vue对象，所以要去取它的$el
    	// top值就是背景图的高度，背景图高度是由padding-top：70%预先占位计算出来的。
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
      this.minTransalteY = -this.imageHeight+RESERVED_HEIGHT
      // 变化最大值是背景图高度-标题栏高度RESERVED_HEIGHT
    },
    
    methods: {
    	scroll(pos) {
      	  this.scrollY = pos.y
    	},
    	back() {
          this.$router.back()
        }
    },
    
    watch: {
    	// 监听scrollY的新值
      scrollY(newVal) {
      	let zIndex = 0
        let translateY = Math.max(this.minTransalteY, newVal)
        // 设置下拉列表，上方背景图跟随放大
        let scale = 1
        let percent = Math.abs(newVal/this.imageHeight)
        if (newVal > 0) {
         	scale = 1+percent
         	zIndex = 10
         }
        // 设置layer的偏移
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        
        if (newVal < this.minTransalteY) {
          // 当滚到顶部了,
          // 就将图片的zIndex由默认的0,改为10,
          // 图片占位的paddingTop由70%设置为0
          // 图片的高度变小成标题栏的高度
          // 隐藏返回按钮
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    components: {
    	SongList,
    	Scroll,
    	Loading
    }
    
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>