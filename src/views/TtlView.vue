<!-- 空白div占位400*300 -->
<script lang="ts">
import { useLocalesStore } from '@/stores/locales'
const locales = useLocalesStore().lang
export default {
    data() {
        return {
            isDual: false,
            cards: [
                74078255,
                37961969,
                572850,
                73956664,
                6767771,
                92731385,
                84330567,
                28226490,
                74920585,
                1329620,
            ],
            locales
        }
    },
    setup() {
        const isDual = JSON.parse(localStorage.getItem("isDual") || "false")
        return {
            isDual,
        }
    },
    methods: {
        switchDual() {
            this.isDual = !this.isDual
            localStorage.setItem('isDual', JSON.parse(this.isDual))
            this.$forceUpdate()
        },
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
        clearAllDiv() {
            // 清除所有div的opacity
            const oDivs = document.getElementsByClassName("oef")
            const sDivs = document.getElementsByClassName("sef")
            for (let i = 0; i < oDivs.length; i++) {
                const div = oDivs[i] as HTMLDivElement
                div.style.opacity = "0"
            }
            for (let i = 0; i < sDivs.length; i++) {
                const div = sDivs[i] as HTMLDivElement
                div.style.opacity = "0"
            }
        }
    }
}
</script>
<template>
    <div class="mainDiv">
        <div class="other" v-if="isDual">
            <!-- 背景为拼接：https://cdn.233.momobako.com/ygopro/pics/+id+.jpg -->
            <div v-for="id in cards" :key="id"
                :style="`background-image: url(https://cdn.233.momobako.com/ygopro/pics/${id}.jpg)`">
                <div class="oef ef1" :key="id" @click="switchDiv">①</div>
                <div class="oef ef2" :key="id" @click="switchDiv">②</div>
            </div>
        </div>
        <div class="options">
            <!-- 切换按钮 -->
            <button v-on:click="switchDual">{{ locales.switchDualMode }}</button>
            <!-- 清除按钮 -->
            <button v-on:click="clearAllDiv">{{ locales.clearAllMark }}</button>
        </div>
        <div class="self">
            <div v-for="id in cards" :key="id"
                :style="`background-image: url(https://cdn.233.momobako.com/ygopro/pics/${id}.jpg)`">
                <div class="sef ef1" :key="id" @click="switchDiv">①</div>
                <div class="sef ef2" :key="id" @click="switchDiv">②</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.mainDiv {
    max-width: 590px;
    width: 100%;
}

.options {
    width: 100%;
    height: 100px;
    border: 1px solid black;
}

.options button {
    width: 50%;
    height: 100%;
}

.other {
    display: flex;
    max-width: 590px;
    max-height: 516px;
    flex-wrap: wrap;
    align-items: flex-start;
    /* 垂直镜像 */
    transform: scaleY(-1);
}

.self {
    display: flex;
    max-width: 590px;
    max-height: 516px;
    flex-wrap: wrap;
    align-items: flex-start;
}

.other>div {
    width: 118px;
    height: 172px;
    border: 1px solid black;
    background-size: 100%;
}

.oef {
    width: 100%;
    height: 50%;
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
    transform: scaleY(-1);
}

.sef {
    width: 100%;
    height: 50%;
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

.self>div {
    width: 118px;
    height: 172px;
    border: 1px solid black;
    background-size: 100%;
}
</style>