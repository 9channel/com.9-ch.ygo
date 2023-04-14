<script setup lang="ts">
import { defineAsyncComponent, getCurrentInstance, defineComponent } from 'vue'
const locales = getCurrentInstance()!.appContext.config.globalProperties.$locales;
const manPage = defineAsyncComponent(() => import('./components/main.vue'))
// 语言选择
const selectLang = defineAsyncComponent(() => import('./i18n/select.vue'))
var year = (new Date).getFullYear(); 
</script>
<template>
  <!-- 顶部标签 -->
  <header>
    <div class="nav">
      <a href="#">{{ locales.home }}</a>
      <!-- 点击显示对应页面, 默认为Swpf-->
      <a href="#swpf">{{ locales.swpf }}</a>
      <a href="#about">{{ locales.about }}</a>
      <!-- 下拉选择语言 -->
      <select-lang />
    </div>
  </header>
  <!-- 主体内容 -->
  <main>
    <!-- 绑定manPage -->
    <component :is="manPage" />
  </main>
  <!-- 底部标签 -->
  <footer>
    <div>
      ©{{ year }} <a href="https://blog.9-ch.com">9 Channel</a> All rights reserved
    </div>
    <div>
      Powered by <a href="https://vuejs.org">Vue 3.0</a>
    </div>
  </footer>
</template>

<style scoped>
/* header位于浏览器顶部，水平方向铺满 */
header {
  width: 100%;
  height: 50px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* footer位于浏览器底部，占满整行 */
footer {
  width: 100%;
  height: 50px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer div {
  margin: 0 10px;
}

footer a {
  margin: 0 5px;
}

/* 下拉框透明背景无边框 */
select {
  background-color: transparent;
  border: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  color: #000;
  font-size: 14px;
  outline: none;
}

/* main位于垂直方向的中间，最小高度要求header+footer+main铺满 */
main {
  min-height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 导航栏 */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 20px;
}

.nav a {
  text-decoration: none;
  width: 10%;
  color: #000;
}

.nav a:hover {
  color: #f00;
}
</style>
