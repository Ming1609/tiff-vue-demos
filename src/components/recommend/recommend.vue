<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="songList">
    	<!--:data="songList"歌单渲染了，scroll组件就能监听数据data的变化，就能去调用refresh()方法。-->
      <div>
        <!-- 轮播start -->
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl" @lode='lodeImg'>
                <!--保证图片后渲染也能重新计算高度，去调用refresh()方法-->
              </a>
            </div>
          </slider>
        </div>
        <!-- 轮播end -->
        <!-- 热门歌单 start-->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单</h1>
          <ul>
            <li v-for="item in songList" class="item">
              <div class="icon">
                <!--<img width="60" height="60" :src="item.picUrl">-->
                <img width="60" height="60" v-lazy="item.picUrl">
                <!--v-lazy:vue-lazylode插件里图片懒加载-->
              </div>
              <div class="text">
                <h2 class="name" v-html="item.songListAuthor"></h2>
                <p class="desc" v-html="item.songListDesc"></p>
              </div>
            </li>
          </ul>
        </div>
        <!--热门歌单 end-->
      </div>
      <!--loading start-->
      <div class="loading-container" v-show="!songList.length">
        <loading></loading>
      </div>
      <!--loading end-->
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import slider from 'base/slider/slider'
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
export default {
  data () {
    return {
      recommends: [],
      radioList: [],
      songList: [],
      title: '请稍等一下下啦~'
    }
  },
  components: {
    slider,
    scroll,
    loading
    
  },
  created() {
    // created():组件实例创建完成，属性已经绑定，但DOM还没生成，$el属性还不存在
    // 在生命周期内去调用私有方法_getRecommend()
    //模拟慢网速时，出现loading动画
    setTimeout(() => {
    	this._getRecommend()
    },1000)
    // this._getRecommend()
    
    
  },
  methods: {
    _getRecommend() {
      // 调用了api下recommend里的getRecommend方法
      getRecommend().then((res) => {
        // getRecommend()是一个promise
        if (res.code === ERR_OK) {
           console.log(res.data)
          this.recommends = res.data.slider
          this.songList = res.data.songList
          this.radioList = res.data.radioList
        }
      })
    },
    
    // _getDiscList() {
    // 	getDiscList().then((res) => {
    // 		if(res.code === ERR_OK){
    // 			console.log(res.data)
    // 		}
    // 	})
    // }
    
    lodeImg() {
    	// 多张图片加载渲染，一旦有一张图片加载就会撑开slider的高度，就去刷新计算高度，只用校验一次就ok
    	if (!this.checkImgLode) {
    		this.$refs.scroll.refresh()
    	  this.checkImgLode = true
    	}
    	
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>