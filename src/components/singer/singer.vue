<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" ref="list" @select="selectSinger"></list-view>
    <!--:data="singers"给list-view组件的data传入的值是singers-->
    <!--@select监听listview组件 emit传过来的点击事件-->
    <router-view></router-view>
    <!--挂载子路由singer-detail-->
  </div>
</template>

<script>
  import ListView from 'base/listview/listview'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  
  import {mapMutations} from 'vuex'
  // vuex提供的语法糖

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
    	//当你点击 <router-link> 时，这个方法会在内部调用，点击 (声明式)<router-link :to="..."> 等同于调用 (编程式)router.push(...)
     selectSinger(singer) {
     	this.$router.push({
     		path:`/singer/${singer.id}`
     		// 注意是反引号
     	})
     	this.setSinger(singer)
     	// 实现了mutation的提交
     },
     
     _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      //数据转换格式归类分组
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        //遍历list数组
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
          	// 前HOT_SINGER_LEN条数据为hot
          	// push热门
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
          	// 如果map中还没有a-z这些key索引，就初始化一个对象，标题是该索引key,元素为空数组
            map[key] = {
              title: key,
              items: []
            }
          }
          // push a-z
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // 为了得到有序列表，需要处理无序的对象map
        let ret = []
        let hot = []
        // 遍历对象，k即为key，obj[k]为当前k对应的值
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        //a-z排序，升序
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				// charCodeAt() 来获得字符串中某个具体字符的 Unicode 编码
        })
        // 连接数组
        return hot.concat(ret)
      },
      
      //点击歌手列表，进入歌手详情页.获取当前点击的元素。使用Vuex状态管理。
      //在methods里，因为mapActions/mapMutations是把action/mutation函数做一个映射，绑定到你的methods里了;
      //你调methods里的方法的时候照常传参就可以了。
      ...mapMutations({
        setSinger: 'SET_SINGER'
        // setSinger为方法名
      })
    },
    components: {
      ListView
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
