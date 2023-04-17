<!-- 空白div占位400*300 -->
<script lang="ts">
export default {
    data() {
        return {
            isDual: false,
            cards: [
                74078255,
                37961969,
                572850,
                73956664,
                92731385,
                28226490,
                38436986,
                74920585,
                1329620,
                84330567
            ]
        }
    },
    setup() {
        const isDual = JSON.parse(localStorage.getItem("isDual") || "false")
        return {
            isDual,
        }
    }, methods: {
        switchDual() {
            this.isDual = !this.isDual
            localStorage.setItem('isDual', JSON.parse(this.isDual))
            this.$forceUpdate()
        }
    }
}
</script>
<template>
    <div class="mainDiv">
        <div class="other" v-if="isDual">
            <!-- 背景为拼接：https://cdn.233.momobako.com/ygopro/pics/+id+.jpg -->
            <div v-for="id in cards" :key="id"
                :style="`background-image: url(https://cdn.233.momobako.com/ygopro/pics/${id}.jpg)`" />
        </div>
        <div class="options">
            <!-- 切换按钮 -->
            <button v-on:click="switchDual">切换</button>
        </div>
        <div class="self">
            <div v-for="id in cards" :key="id"
                :style="`background-image: url(https://cdn.233.momobako.com/ygopro/pics/${id}.jpg)`" />
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

.other {
    display: flex;
    max-width: 590px;
    max-height: 516px;
    flex-wrap: wrap;
    align-items: flex-start;
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
    transform: rotate(180deg);
}

.self>div {
    width: 118px;
    height: 172px;
    border: 1px solid black;
    background-size: 100%;
}
</style>