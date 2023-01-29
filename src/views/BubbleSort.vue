<template lang="">
    <AlgorithmPickerMenu @visualize="(e) => { visualizeAlgorithm(e) }" :options="options" menu-type="sorting"/>

    <div class="array-container">
        <div v-for="(el, index) in elements" class="element" :class="{current: index == currentTwo[0] || index == currentTwo[1], currentOne: index == currentOne}" :style="{height: String(el * 15) + 'px', width: String(800/size) + 'px'}"></div>
        <button @click="visualiseBubbleSort">Start</button>
    </div>
</template>
<script setup lang="ts">
    import { bubbleSort, selectionSort} from "@/algorithms/sortingAlgorithms";
    import AlgorithmPickerMenu from "@/components/Navigation/AlgorithmPickerMenu.vue";
    import { ref, onMounted } from "vue"
    import type { Ref } from "vue"
    const elements: Ref<number[]> = ref([])
    const currentTwo = ref([-1, -1])
    const options = ref(["bubbleSort", "selectionSort"])
    const currentOne = ref(-1)
    const size = ref(30)

    const visualizeAlgorithm = (e: string) => {
         console.log("e", e)
         if(e == "bubbleSort") 
            bubbleSort(elements, currentTwo)
         else if(e == "selectionSort")  
            selectionSort(elements, currentOne, currentTwo)
    }

    onMounted(() => {
        for(let i = 0; i < size.value; i++) {
            elements.value.push(Math.floor(Math.random() * 50))
        }
    })
    
</script>
<style scoped lang="css">
    .array-container {
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .element {
        background-color: blue;
        box-shadow: 0 0 5px -1px black;
    }

    .current {
        background-color: red;
    }

    .currentOne {
        background-color: green;
    }
</style>