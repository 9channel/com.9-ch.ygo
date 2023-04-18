<!-- 空白div占位400*300 -->
<script lang="ts">
import { useLocalesStore } from '@/stores/locales'
import YgoCardDiv from '@/components/view/YgoCardDiv.vue';
const locales = (useLocalesStore()).lang
export type cardType = {
    type: number, // 0: main deck, 1: extra deck, 2: side deck
    id: number
}
export type deckType = {
    name: string,
    cards: cardType[]
}
export type GuCardType = {
    cid: number,
    id: number,
    cn_name: string,
    sc_name: string,
    md_name: string,
    nwbbs_name: string,
    cnocg_n: string,
    jp_ruby: string,
    jp_name: string,
    en_name: string,
    text: {
        types: string,
        pdesc: string,
        desc: string,
    },
    data: {
        ot: number,
        setcode: number,
        type: number,
        atk: number,
        def: number,
        level: number,
        race: number,
        attribute: number
    }

}
export type GuCardsType = {
    [key: string]: GuCardType
}
export default {
    components: {
        YgoCardDiv
    },
    data() {
        return {
            decks: [] as deckType[],
            selectedDeckName: '' as string,
            selectedDeck: {} as GuCardsType,
            hCard: -1,
            tCard: -1,
            serverVer: "",
        }
    },
    async setup() {
        const decks = JSON.parse(localStorage.getItem('decks') || '[]') as deckType[]
        let selectedDeckName = localStorage.getItem('defaultDeck') || ''
        // decks非空时
        if (decks.length) {
            // 检查是否有默认卡组
            if (!selectedDeckName || !decks.find((deck: deckType) => deck.name === selectedDeckName)) {
                // 没有默认卡组，设置第一个卡组为默认卡组
                selectedDeckName = decks[0].name
                localStorage.setItem('defaultDeck', selectedDeckName)
            }
        }

        // 内容为带有引号的字符串，如："1234567890abcdef1234567890abcdef"
        // 时间戳，用于清除缓存
        const t = '?t=' + Date.now()
        const serverVer = await (await (await fetch('/cards.zip.md5' + t)).text()).replace(/"/g, '')
        return {
            decks,
            selectedDeckName,
            hCard: -1,
            tCard: -1,
            serverVer,
        }
    },
    methods: {
        saveDecks() {
            localStorage.setItem('decks', JSON.stringify(this.decks))
        },
        deleteDeck(name: string) {
            const index = this.decks.findIndex((deck: deckType) => deck.name === name)
            this.decks.splice(index, 1)
            this.saveDecks()
        },
        // 解析ydk文件
        // ydk格式参考：
        // 任何一行以#开头的都是注释
        // 文件名为卡组名
        // #main为特殊注释，用于标志主卡组开始
        // #extra为特殊注释，用于分割主卡组与额外卡组
        // !side为特殊注释，用于分割额外卡组与副卡组
        // 三种卡组之间可以有多个空行，卡片数量可能为0
        addDeck(file: File) {
            const reader = new FileReader()
            reader.onload = () => {
                const text = reader.result as string
                const lines = text.split('\n')
                // 卡组名，去除文件名.ydk后缀
                const deckName = file.name.slice(0, file.name.length - 4)
                // 检查是否已存在同名卡组
                for (let deck of this.decks) {
                    if (deck.name === deckName) {
                        const confirmMsg = locales.overridMsg.replace('{deckName}', deckName)
                        const comfirmResult = confirm(confirmMsg)
                        if (comfirmResult) {
                            this.deleteDeck(deckName)
                        } else {
                            return
                        }
                    }
                }

                let deck: deckType = {
                    name: deckName,
                    cards: []
                }
                let type = 0
                for (let line of lines) {
                    if (line.startsWith('#')) {
                        if (line.startsWith('#main')) {
                            type = 0
                        } else if (line.startsWith('#extra')) {
                            type = 1
                        }
                    } else if (line.startsWith('!side')) {
                        type = 2
                    } else if (line.trim() === '') {
                        continue
                    } else {
                        const id = line.trim() as unknown as number
                        deck.cards.push({
                            type,
                            id
                        })
                    }
                }
                this.decks.push(deck)
                this.saveDecks()
                // 上传成功后，刷新页面
                window.location.reload()
            }
            reader.readAsText(file)
        },
        // 添加卡组按钮点击后，先要求选择文件，再调用addDeck
        addDeckClick() {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.ydk'
            input.multiple = true
            input.onchange = () => {
                const files = input.files
                if (files) {
                    for (let file of files) {
                        this.addDeck(file)
                    }
                }
            }
            input.click()
        },
        deleteDeckClick() {
            // decks 为空不执行
            if (this.decks.length === 0) {
                return
            }
            // 删除当前选中的卡组
            this.deleteDeck(this.selectedDeckName)
            // 刷新页面
            window.location.reload()
        },
        saveDefaultClick() {
            // decks 为空不执行
            if (this.decks.length === 0) {
                return
            }
            // 将当期选中的卡组设为默认卡组
            localStorage.setItem('defaultDeck', this.selectedDeckName)
        },
        async updateSelectedDeck() {
            // id去重
            let selectedDeck = {} as GuCardsType
            if (this.selectedDeckName) {
                let deck = this.decks.find((deck: deckType) => deck.name === this.selectedDeckName) as deckType
                const idSet = new Set()
                const allCardIds = await (await fetch('/id/all.json?v=' + this.serverVer)).json()
                for (let card of deck.cards) {
                    let id = card.id as number
                    // 去重
                    if (idSet.has(id)) {
                        continue
                    }
                    idSet.add(id)
                    // 获取卡片信息 /id/$id.json 同步调用, 文件可能不存在
                    // 先判断文件是否存在，再调用
                    if (!allCardIds.includes(id)) {
                        continue
                    }
                    const guCard = await (await fetch('/id/' + id + '.json?v=' + this.serverVer)).json() as GuCardType
                    if (!guCard.text) {
                        continue
                    }
                    const rawType = guCard.text.types
                    // 去除rawType不包含"怪兽"的卡片
                    if (!rawType.includes('怪兽')) {
                        continue
                    }
                    // 去除rawType包含"融合"的卡片
                    if (rawType.includes('融合')) {
                        continue
                    }
                    // 去除rawType包含"同调"的卡片
                    if (rawType.includes('同调')) {
                        continue
                    }
                    // 去除rawType包含"超量"的卡片
                    if (rawType.includes('超量')) {
                        continue
                    }
                    // 去除rawType包含"连接"的卡片
                    if (rawType.includes('连接')) {
                        continue
                    }
                    selectedDeck[card.id] = guCard
                }
                this.selectedDeck = selectedDeck
            }
            // 重新渲染.cards
            this.$forceUpdate()
        },
        markPath() {
            // 清除pCard
            for (let id in this.selectedDeck) {
                const card = this.selectedDeck[id]
                const cardDiv = document.getElementById('card-' + card.id)
                if (cardDiv && cardDiv.classList.contains('pCard')) {
                    cardDiv.classList.remove('pCard')
                }
            }
            const h = this.selectedDeck[this.hCard]
            const t = this.selectedDeck[this.tCard]
            // selectedDeck遍历，exactly_one_equal判断
            for (let id in this.selectedDeck) {
                const card = this.selectedDeck[id]
                if (this.exactly_one_equal(h, card) && this.exactly_one_equal(t, card)) {
                    const _pCardDiv = document.getElementById('card-' + card.id)
                    if (_pCardDiv) {
                        _pCardDiv.classList.add('pCard')
                    }
                }
            }
        },
        exactly_one_equal(c1: GuCardType, c2: GuCardType) {
            let similar_attrs = 0
            // data下atk,def,attribute,level,race,每个相同加1
            if (c1.data.atk === c2.data.atk) {
                similar_attrs += 1
            }
            if (c1.data.def === c2.data.def) {
                similar_attrs += 1
            }
            if (c1.data.attribute === c2.data.attribute) {
                similar_attrs += 1
            }
            if (c1.data.level === c2.data.level) {
                similar_attrs += 1
            }
            if (c1.data.race == c2.data.race) {
                similar_attrs += 1
            }
            return similar_attrs === 1
        },
        cardClick(id: number) {
            // 清除pCard

            for (let id in this.selectedDeck) {
                const card = this.selectedDeck[id]
                const cardDiv = document.getElementById('card-' + card.id)
                if (cardDiv && cardDiv.classList.contains('pCard')) {
                    cardDiv.classList.remove('pCard')
                }
            }

            // 状态1：hCard=-1,tCard=-1
            if (this.hCard === -1 && this.tCard === -1) {
                const _hCardDiv = document.getElementById('card-' + id)
                if (_hCardDiv) {
                    _hCardDiv.classList.add('hCard')
                }
                this.hCard = id
                return
            }
            // 状态2：hCard!=-1,tCard=-1,hCard==id
            if (this.hCard !== -1 && this.tCard === -1 && this.hCard === id) {
                const _hCardDiv = document.getElementById('card-' + id)
                if (_hCardDiv) {
                    _hCardDiv.classList.remove('hCard')
                }
                this.hCard = -1
                return
            }
            // 状态3：hCard!=-1,tCard=-1,hCard!=id
            if (this.hCard !== -1 && this.tCard === -1 && this.hCard !== id) {
                const _tCardDiv = document.getElementById('card-' + id)
                if (_tCardDiv) {
                    _tCardDiv.classList.add('tCard')
                }
                this.tCard = id
                this.markPath()
                return
            }
            // 状态4：hCard!=-1,tCard!=-1,tCard==id
            if (this.hCard !== -1 && this.tCard !== -1 && this.tCard === id) {
                const _tCardDiv = document.getElementById('card-' + id)
                if (_tCardDiv) {
                    _tCardDiv.classList.remove('tCard')
                }
                this.tCard = -1
                return
            }

            const _tCardDiv = document.getElementById('card-' + this.tCard)
            if (_tCardDiv) {
                _tCardDiv.classList.remove('tCard')
            }
            const _hCardDiv = document.getElementById('card-' + this.hCard)
            if (_hCardDiv) {
                _hCardDiv.classList.remove('hCard')
            }
            this.hCard = -1
            this.tCard = -1
            return
        },
    },
    mounted() {
        this.updateSelectedDeck()
    },
}
</script>
<template>
    <div class="mainDiv">
        <div class="options">
            <div>
                <!-- 保存默认卡组按钮 -->
                <button @click="saveDefaultClick">❤️</button>
            </div>
            <div>
                <!-- 卡组下拉列表, 修改时触发updateSelectedDeck -->
                <select v-model="selectedDeckName" @change="updateSelectedDeck">
                    <option v-for="deck in decks" :key="deck.name" :value="deck.name">{{ deck.name }}</option>
                </select>
            </div>
            <div>
                <!-- 添加卡组按钮 -->
                <button @click="addDeckClick">+</button>
            </div>
            <div>
                <!-- 删除卡组按钮 -->
                <button @click="deleteDeckClick">-</button>
            </div>
        </div>
        <!-- 卡组列表 -->
        <div class="cards">
            <div class="cardDiv" v-for="card in selectedDeck" :key="card.id" @click="cardClick(card.id)"
                :id="`card-${card.id}`">
                <YgoCardDiv :cid="card.id" :size="94" />
            </div>
        </div>
    </div>
</template>
<style scoped>
.mainDiv {
    max-width: 500px;
    width: 100%;
}

.options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: left;
    width: 100%;
}

.options>div {
    width: 25%;
}

.options>div>select {
    width: 100%;
    height: 100%;
}

.options>div>button {
    width: 100%;
    height: 100%;
}

.cards {
    display: flex;
    max-width: 500px;
    flex-wrap: wrap;
    align-items: flex-start;
}

.cardDiv {
    width: 100px;
    height: 100px;
    /* 中心对齐 */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border-color: transparent;
    border-style: solid;
    box-sizing: border-box;
}

.hCard {
    border-color: rgb(0, 255, 0);
}

.tCard {
    border-color: rgb(0, 0, 255);
}

.pCard {
    border-color: rgb(255, 0, 0);
}
</style>