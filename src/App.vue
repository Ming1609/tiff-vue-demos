<template>
  <div id="app">
  	<m-header></m-header>
  </div>
</template>

<script>
import mHeader from "components/m-header/m-header"
export default{
	components:{
		mHeader
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/variable"

#app {
  color: $color-theme;
}
</style>
