<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default{
	props: {
	  // probeType选项:索引列表，在滚动过程中实时监听滚动到哪个索引的区域了,实时派发 scroll 事件。从而获取滚动过程中的位置。
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
      	//动态数据
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
    	// 在dom渲染之后再初始化
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
        	// 没有值时不初始化
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
		
        //监听滚动，将子组件的scroll事件以及参数$emit派发传给父组件，
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
      	// 滚动到相应的位置，this.scroll指向better-scroll的实例
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        // 因为scrollTo()会接受一些参数，所以要用apply(this.scroll, arguments)将这些参数传给better-scroll的参数里
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
    // 如果数据变化就刷新
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
}
	
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
	
</style>