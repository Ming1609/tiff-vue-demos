<template>
  <div class="slider" ref="slider">
    <!-- ref注册时间说明：ref本身是作为渲染结果被创建的，在初始渲染时无法访问他们，因为此时不存在，$refs也不是响应式的，因此不应该试图用它在模板中做数据绑定。-->
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index }" ></span>
      <!-- 轮播图小点高亮时样式active -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
    // 通常我们为了保证dom成功渲染的话，一般会加一个20毫秒的setTimeout()延迟。20毫秒是依据浏览器通常是17毫秒刷新一次
      this._setSliderWidth()
    	//计算宽
      this._initSlider()
       //初始化slider
      this._initDots()
      //初始化点dots
      if (this.autoPlay) {
      	//是否自动播放。
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  activated() {
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  
  methods: {
    _setSliderWidth(isResize) {
    	// 设置整个sliderGroup的宽度
      this.children = this.$refs.sliderGroup.children
        //列表元素的个数
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
        //父容器的宽度sliderWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
      	  // 循环遍历每一个子节点
        addClass(child, 'slider-item')
          // addClass()去分别动态设置渲染后的样式'.slider-item',是dom.js封装的方法
        child.style.width = sliderWidth + 'px'
        //给每个child去设置宽度,就等于是父容器的宽度
        width += sliderWidth
        //整个sliderGroup的宽度.
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
        // 如果是无缝轮播,要加克隆两个节点
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    
    
    _initSlider() {
     // 初始化一个slider.
      this.slider = new BScroll(this.$refs.slider, {
      	// 实例化better-scroll组件,传相应配置
        scrollX: true,// 沿X轴方向滚动
        scrollY: false,// 不允许Y轴滚动
        momentum: false,// 滑动惯性不开启
        snap: true,// 滚动
        snapLoop: this.loop,//是否是无缝滚动
        snapThreshold: 0.3,// 当用手指去滑动页面的时候的阈值,大于该阈值就滚动到下一页
        snapSpeed: 400 //切换滚动动画的时间
      })
      
    this.slider.on('scrollEnd', () => {
       // 关联点与图片滚动同步
      // 滚动到下一张的时候，会派发scrollEnd()事件
      let pageIndex = this.slider.getCurrentPage().pageX
      // pageIndex获取的是slider第几个子元素
      if (this.loop) {
        // 默认下标是从0开始，所以pageIndex要减1
        pageIndex -= 1
      }
      this.currentPageIndex = pageIndex
      	//同步
      if (this.autoPlay) {
        this._play()
      }
    })
    
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },   
    _initDots() {
      // 初始化dots小点，就是一个长度为this.children.length的数组
      this.dots = new Array(this.children.length)
    },
    _play() {
      // 轮播
      let pageIndex = this.currentPageIndex + 1
       //pageIndex是指第几个元素，所以下标要加1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
        // goToPage()方法是better-scroll提供的接口，跳到pageIndex，0是纵向方向，400是轮播时间间隔。
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>