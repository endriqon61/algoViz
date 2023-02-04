<template lang="">
    <div>
        <AlgorithmPickerMenu @pickAlgorithm="(e) => {setCurrentAlgorithm(e)}" @visualize="(e) => { visualizeAlgorithm(e) }" :options="options" menu-type="sorting"/>

        <div class="array-container">
            <div v-for="(el, index) in elements" class="element" :class="{currentBetween: index >= currentBetween[0] && index <= currentBetween[1], currentDouble: index == currentDouble[0] || index == currentDouble[1], currentOne: index == currentOne}" :style="{height: String(el * 15) + 'px', width: String(800/size) + 'px'}"></div>
        </div>
        <label for="volume-slider">Volume: </label>
        <input type="range" min="0" max="10" v-model="volumeRef" @change="(e) => {e.value = volumeRef}"/>
    </div>
</template>
<script setup lang="ts">
    import sortingAlgorithms from "@/algorithms/sortingAlgorithms";
    import AlgorithmPickerMenu from "@/components/Navigation/AlgorithmPickerMenu.vue";
    import { ref, watch, onMounted } from "vue"
    import { sounds } from "@/config/sounds"
    import type { Ref } from "vue"

    const elements: Ref<number[]> = ref([14, 13, 12, 15])
    let elementsNonReactive: number[] = []
    const currentDouble = ref([-1, -1])
    const options = ref(["bubbleSort", "selectionSort", "quickSort"])
    const currentOne = ref(-1)
    const currentBetween: Ref<number[]> = ref([-1, -1])
    const size = ref(100)
    const volumeRef: Ref<number>= ref(7)
    const sound = sounds(volumeRef)
    const currentAlgorithm: Ref<string> = ref("")

    const { quickSort , bubbleSort, selectionSort } = sortingAlgorithms(elements, currentDouble, currentOne, currentBetween, sound, volumeRef)


    const setCurrentAlgorithm = (e: string) => {
        currentAlgorithm.value = e
    }

    watch(currentAlgorithm, n => {
        if(n == "bubbleSort") {
            size.value = 50
        }

        else if(n == "selectionSort") {
            size.value = 35
        }

        else if(n == "quickSort") {
            size.value = 400
        }

        populateElementsArray()
    })

    const populateElementsArray = () =>  {

        elements.value = []
        elementsNonReactive = []
        for(let i = 0; i < size.value; i++) {
            elements.value.push(Math.floor(Math.random() * 50))
            elementsNonReactive.push(elements.value[i])
        }

    }

    const visualizeAlgorithm = async(e: string) => {
        console.log(elements.value, elementsNonReactive)
        elements.value = elementsNonReactive.slice()
        console.log(elements.value, elementsNonReactive)

        if(e == "bubbleSort") 
            await bubbleSort()
        else if(e == "selectionSort")  
            await selectionSort()
        else if (e == "quickSort") {
            await quickSort(0, elements.value.length - 1)
        }

        elementsNonReactive = elements.value.slice()

        currentOne.value = -1
        currentDouble.value = [-1, -1]
        currentBetween.value = [-1, -1]
    }

    onMounted(() => {
        populateElementsArray()
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