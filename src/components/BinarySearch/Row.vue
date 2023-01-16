<template>
    <div class="row">
        <div v-for="(el, index) in list"
            :class="{ 'cell_found': selectedClass(el.value), 'cell_searching': index >= start && index <= end }"
            class="cell"> {{ el.value }} </div>
    </div>
    <botton @click="visualizeSearch()" type="button">Start</botton>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue"
import type { Ref } from "vue"
import sleep from "../../utils/sleep"
import startSearch from "@/algorithms/search/binarySearch"

const selected: Ref<number> = ref(Number.POSITIVE_INFINITY);

const props = defineProps<{
    elements: Array<number>;
    find: number
}>()

const { elements, find } = props
const list = ref(elements.map(el => { return ({ value: el, isSearching: false }) }))
let end: Ref<number> = ref(-1);
let start: Ref<number> = ref(-1);

function selectedClass(el: number): boolean {
    if (el == selected.value) {
        return true
    }
    return false
}

function visualizeSearch() {
    selected.value = Number.POSITIVE_INFINITY;
    end.value = list.value.length - 1
    start.value = 0
    startSearch(selected, start, end, list, find)
}


</script>

<style scoped lang="scss">
.row {
    display: flex;
    background-color: yellow;
    height: 50px;
    position: relative;
}

.cell {
    padding: 10px;
    border: 1px solid black;
}


.cell_searching {
    background-color: lightblue;
}

.cell_found {
    background-color: pink;
}

button {
    user-select: none;
    cursor: pointer;
    border: 1px solid black;
    background: lightblue;
    &:focus {
        border: 1px solid blue;
    }
}
</style>