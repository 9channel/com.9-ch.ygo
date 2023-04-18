<script lang="ts">
import SkillMark from './SkillMark.vue';
export default {
    components: {
        SkillMark
    },
    props: {
        cid: {
            type: Number,
            required: true,
        },
        skillMode: {
            type: Number,
            default: 0,
        },
        flip: {
            type: Boolean,
            default: false,
        },
        size: {
            type: Number,
            default: 300,
        },
    },
    data() {
        return {
            scale: this.size / 300,
        }
    }
}
</script>
<template>
    <div class="scaleDiv">
        <div class="ygoCard" :style="`background-image: url(https://cdn.233.momobako.com/ygopro/pics/${cid}.jpg);`">
            <SkillMark :mode="skillMode" :flip="flip" />
        </div>
    </div>
</template>

<style scoped >
.ygoCard {
    background-position: -50px -110px;
    width: 300px;
    height: 300px;
    border: 1px solid black;
    box-sizing: border-box;
}

.scaleDiv {
    zoom: v-bind(scale);
    width: 100%;
    height: 100%;
}
</style>