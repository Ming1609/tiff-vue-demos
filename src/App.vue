<template>
  <div id="app">
    <m-header></m-header>
    <m-tab></m-tab>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import MTab from 'components/m-tab/m-tab'
export default{
  components: {
    MHeader,
    MTab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

#app {
  color: $color-theme;
}
</style>
