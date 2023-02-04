<template lang="">
    <div>
        <AlgorithmPickerMenu @visualize="(e) => { visualizeAlgorithm(e) }" :options="options" menu-type="sorting"/>

        <div class="array-container">
            <div v-for="(el, index) in elements" class="element" :class="{currentBetween: index >= currentBetween[0] && index <= currentBetween[1], currentDouble: index == currentDouble[0] || index == currentDouble[1], currentOne: index == currentOne}" :style="{height: String(el * 15) + 'px', width: String(800/size) + 'px'}"></div>
            <button @click="visualiseBubbleSort">Start</button>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { quickSort, bubbleSort, selectionSort} from "@/algorithms/sortingAlgorithms";
    import AlgorithmPickerMenu from "@/components/Navigation/AlgorithmPickerMenu.vue";
    import { ref, watch, onMounted } from "vue"
    import type { Ref } from "vue"
    const elements: Ref<number[]> = ref([14, 13, 12, 15])
    const currentDouble = ref([-1, -1])
    const options = ref(["bubbleSort", "selectionSort", "quickSort"])
    const currentOne = ref(-1)
    const currentBetween: Ref<number[]> = ref([-1, -1])
    const size = ref(400)

    // watch<currentSearchingTuple>([currentBetween, currentDouble, currentOne],  ([cB, cD, cO]) => {
    //         console.log("current searching", [cB, cD, cO])
    //         currentBetween = cB
    //         currentDouble = cD
    //         currentOne = cO

    // })

    // watch(currentDouble, o => {
    //     currentDouble = o
    // })
   
    // watch(currentOne, o => {
    //     console.log("hello")
    //     currentOne = o
    // })

    const visualizeAlgorithm = async(e: string) => {
        console.log("e", e)
        if(e == "bubbleSort") 
            await bubbleSort(elements, currentDouble)
        else if(e == "selectionSort")  
            await selectionSort(elements, currentOne, currentDouble)
        else if (e == "quickSort") {
            await quickSort(elements, 0, elements.value.length - 1, currentBetween, currentDouble, currentOne)
        }

        currentOne.value = -1
        currentDouble.value = [-1, -1]
        currentBetween.value = [-1, -1]
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


    .currentBetween {
        background-color: lightyellow;
    }
    .currentOne {
        background-color: green;
    }
    .currentDouble {
        background-color: red;
    }
</style>