<!-- 空白div占位400*300 -->
<script lang="ts">
import { useLocalesStore } from '@/stores/locales'
const locales = (useLocalesStore()).lang
export default {
    data() {
        return {
            locales
        }
    }
}
</script>

<template>
    <main>
        <h1>
            Yu-Gi-Oh! Tools
        </h1>
        <p>{{ locales.siteInfo }}</p>
    </main>
</template>
<style scoped>
main {
    display: flex;
    justify-content: center;
    align-items: center;
}

main>* {
    margin: 0 10px;
}

main>p {
    font-size: 1.2rem;
}
</style>