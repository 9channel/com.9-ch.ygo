<!-- 空白div占位400*300 -->
<script lang="ts">
export default {
    data() {
        return {
            name: 'ttl',
            className: 'ttl'
        }
    }
}
</script>
<template>
    <div :class="className" style="width: 400px; height: 300px;">{{ name }} page</div>
</template>