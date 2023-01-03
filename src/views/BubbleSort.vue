<template lang="">
    <div class="array-container">
        <div v-for="(el, index) in elements" class="element" :class="{current: index == current[0] || index == current[1]}" :style="{height: String(el * 35) + 'px'}"></div>
        <button @click="visualiseBubbleSort">Start</button>
    </div>
</template>
<script setup lang="ts">
    import startSort from "@/algorithms/search/bubbleSort";
    import { ref } from "vue"

    const elements = ref( [3, 4, 17, 13, 8, 9, 7, 6, 5, 7, 4, 6, 15, 7, 8,4 , 7 ,8 , 9 , 12, 6, 8, 9] )
    const current = ref([-1, -1])

    const visualiseBubbleSort = () => { startSort(elements, current) }
    
</script>
<style scoped lang="css">
    .array-container {
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .element {
        width: 10px;
        background-color: blue;
        border: 1px solid black;
    }

    .current {
        background-color: red;
    }
</style>