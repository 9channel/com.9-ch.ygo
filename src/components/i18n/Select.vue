<!-- 空白div占位400*300 -->
<script lang="ts">
export default {
    data() {
        return {
            lang: 'language'
        }
    },
    watch: {
        lang() {
            if (this.lang != 'language') {
                const old = localStorage.getItem('language');
                if (old == this.lang) {
                    this.lang = 'language';
                    return;
                }
                localStorage.setItem('language', this.lang);
                this.lang = 'language';
                window.location.reload();
            }
        }
    },
    // 加载后对当前语言option前加上"√"
    mounted() {
        const lang = localStorage.getItem('language');
        if (lang) {
            const options = document.getElementsByTagName('option');
            for (let i = 0; i < options.length; i++) {
                if (options[i].value == lang) {
                    options[i].innerHTML = '√ ' + options[i].innerHTML;
                    break;
                }
            }
        }
    }
    
}
</script>
<template>
    <!-- 下拉选择语言-->
    <select v-model="lang">
        <!-- language 隐藏 -->
        <option value="language" style="display: none;">Language</option>
        <!-- 绑定到change -->
        <option value="zh-CN">简体中文</option>
        <option value="zh-TW">繁体中文</option>
        <option value="ja-JP">日本語</option>
        <!-- 韩语暂未实现 -->
        <option value="ko-KR">한국어(현재 지원되지 않음)</option>
        <option value="en-US">English</option>
    </select>
</template>

