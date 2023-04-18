<!-- 空白div占位400*300 -->
<script lang="ts">
import { useLocalesStore } from '@/stores/locales'
import YgoCardDiv from '../components/view/YgoCardDiv.vue';
const locales = useLocalesStore().lang
export default {
    components: {
        YgoCardDiv
    },
    data() {
        return {
            isDual: false,
            cards: [
                { id: 74078255, mode: 2 },
                { id: 37961969, mode: 2 },
                { id: 572850, mode: 2 },
                { id: 73956664, mode: 2 },
                { id: 6767771, mode: 2 },
                { id: 92731385, mode: 3 },
                { id: 84330567, mode: 2 },
                { id: 28226490, mode: 2 },
                { id: 74920585, mode: 2 },
                { id: 1329620, mode: 2 }
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
        clearAllDiv() {
            // 清除所有div的opacity
            const efDivs = document.getElementsByClassName("efMark")
            for (let i = 0; i < efDivs.length; i++) {
                const div = efDivs[i] as HTMLDivElement
                div.style.opacity = "0"
            }
        }
    }
}
</script>
<template>
    <div class="mainDiv">
        <div class="deck" v-if="isDual">
            <div class="ygoCardDiv" :size="100" v-for="card in cards" :key="card.id">
                <YgoCardDiv :cid="card.id" :size="94" :skill-mode="card.mode" />
            </div>
        </div>
        <div class="options">
            <!-- 切换按钮 -->
            <button v-on:click="switchDual">{{ locales.switchDualMode }}</button>
            <!-- 清除按钮 -->
            <button v-on:click="clearAllDiv">{{ locales.clearAllMark }}</button>
        </div>
        <div class="deck">
            <div class="ygoCardDiv" :size="100" v-for="card in cards" :key="card.id">
                <YgoCardDiv :cid="card.id" :size="94" :skill-mode="card.mode" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.ygoCardDiv {
    border-color: transparent;
    border-style: solid;
    box-sizing: border-box;
    width: 100px;
}

.mainDiv {
    max-width: 500px;
    width: 100%;
}

.deck {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    max-width: 500px;
}

.options {
    width: 100%;
    height: 50px;
    border: 1px solid black;
}

.options button {
    width: 50%;
    height: 100%;
}
</style>