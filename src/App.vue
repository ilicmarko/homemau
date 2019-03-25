<template>
  <div id="app">
    <div id="nav">
      <el-menu 
                :default-active="activeIndex" 
                class="el-menu-demo" 
                mode="horizontal" 
                :router="true"
                @select="handleSelect">
        <el-menu-item index="1" :route="{name: 'home'}">Home</el-menu-item>
        <el-menu-item index="2" :route="{name: 'about'}">About</el-menu-item>
      </el-menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Page',
    titleTemplate: `%s | ${process.env.VUE_APP_TITLE}`
  },
  data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>


<style lang="scss">
body {
  margin: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
