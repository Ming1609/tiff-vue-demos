<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <!-- 轮播start -->
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <!-- 轮播end -->
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import slider from 'base/slider/slider'
export default {
  data () {
    return {
      recommends: []
    }
  },
  components: {
    slider
  },
  created() {
    // created:组件实例创建完成，属性已经绑定，但DOM还没生成，$el属性还不存在
    this._getRecommend()
    // 在生命周期内去调用私有方法_getRecommend()，
  },
  methods: {
    _getRecommend() {
      // 调用了api下recommend里的getRecommend方法
      getRecommend().then((res) => {
        // getRecommend()是一个promise
        if (res.code === ERR_OK) {
          // 返回数值成功就打印
          // console.log(res.data.slider)
          this.recommends = res.data.slider
        }
      })
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