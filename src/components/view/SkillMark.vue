<script lang="ts">
export default {
    props: {
        mode: {
            type: Number,
            required: true,
        },
        flip: {
            type: Boolean,
            default: false,
        }

    },

    data() {
        return {
            icons: ['', '①', '②', '③', '④'],
            styles: ["width: 0;height:0", "width: 100%; height: 100%", "width: 100%; height: 50%", "width: 100%; height: 33%", "width: 50%; height: 50%"],
        }
    },
    methods: {
        switchDiv(e: Event) {
            // 绑定div的点击事件
            // 切换opacity 0/0.5
            const div = e.target as HTMLDivElement
            if (div.style.opacity as unknown as number < 0.5) {
                div.style.opacity = "0.6"
            } else {
                div.style.opacity = "0"
            }
        },
    }
}
</script>
<template>
    <div :class="flip ? 'scaleY efMark' : 'efMark'" v-for="index in mode" :key="index" @click="switchDiv"
        :style="styles[mode]">{{
            icons[index] }} </div>
</template>
<style scoped>
.efMark {
    /* 文本水平居中 */
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    font-size: 40px;
    opacity: 0;
    background-color: aqua;
}

.scaleY {
    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
    filter: FlipV;
    -ms-filter: "FlipV";
}
</style>