<script setup lang="ts">
import { defineAsyncComponent,getCurrentInstance  } from 'vue'
const locales = getCurrentInstance()!.appContext.config.globalProperties.$locales;
const manPage = defineAsyncComponent(() => import('./components/MainPage.vue'))
</script>
<template>
  <!-- 顶部标签 -->
  <header>
    <div class="nav">
      <!-- 点击显示对应页面, 默认为Swpf-->
      <a href="#swpf">{{ locales.swpf }}</a>
      <a href="#about">{{ locales.about }}</a>
    </div>
  </header>
  <!-- 主体内容 -->
  <main>
    <!-- 绑定manPage -->
    <component :is="manPage" />
  </main>
  <!-- 底部标签 -->
  <footer>Footer</footer>
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
  width: 200px;
  margin: 0 20px;
}

.nav a {
  text-decoration: none;
  color: #000;
}

.nav a:hover {
  color: #f00;
}
</style>
