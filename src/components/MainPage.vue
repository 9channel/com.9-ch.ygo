<!-- 空白div占位400*300 -->
<script lang="ts">
import Swpf from './Swpf.vue'
import About from './About.vue'
export default {
    components: {
        Swpf, About
    },
    data() {
        return {
            componentKey: 0,
        };
    },
    mounted() {
        window.addEventListener('hashchange', this.forceRerender);
    },
    beforeUnmount() {
        window.removeEventListener('hashchange', this.forceRerender);
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
        },
        getcomponent() {
            switch (window.location.hash) {
                case '#swpf':
                    return Swpf;
                case '#about':
                    return About;
                default:
                    return Swpf;
            }
        },
    },
}
</script>
<template>
    <component :is="getcomponent()" :key="componentKey" />
</template>