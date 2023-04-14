<!-- 空白div占位400*300 -->
<script lang="ts">
export default {
    data() {
        return {
            lang: localStorage.getItem('language') || 'zh-CN'
        }
    },
    watch: {
        lang() {
            localStorage.setItem('language', this.lang)
            // 重新加载页面
            window.location.reload()
        }
    }
}
</script>
<template>
    <select v-model="lang">
        <option value="zh-CN">简体中文</option>
        <option value="zh-TW">繁体中文</option>
        <option value="ja-JP">日本語</option>
        <!-- 韩语暂未实现 -->
        <option value="ko-KR">한국어(현재 지원되지 않음)</option>
        <option value="en-US">English</option>
    </select>
</template>

