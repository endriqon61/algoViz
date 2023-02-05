<template lang="">
    <div>
        <AlgorithmPickerMenu @pickAlgorithm="(e) => {setCurrentAlgorithm(e)}" @visualize="(e) => { visualizeAlgorithm(e) }" :options="options" menu-type="sorting"/>

        <div class="array-container">
            <div v-for="(el, index) in elements" class="element" :class="{currentBetweenSuccess: index >= currentBetweenSuccess[0] || index <= currentBetweenSuccess[1],currentBetween: index >= currentBetween[0] && index <= currentBetween[1], currentDouble: index == currentDouble[0] || index == currentDouble[1], currentOne: index == currentOne}" :style="{height: String(el * 15) + 'px', width: String(800/size) + 'px'}"></div>
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
    import sleep from "@/utils/sleep";

    const elements: Ref<number[]> = ref([14, 13, 12, 15])
    const currentDouble = ref([-1, -1])
    const options = ref(["bubbleSort", "mergeSort", "selectionSort", "quickSort"])
    const currentOne = ref(-1)
    const currentBetween: Ref<number[]> = ref([-1, -1])
    const size = ref(100)
    const volumeRef: Ref<number>= ref(7)
    const sound = sounds(volumeRef)
    const currentAlgorithm: Ref<string> = ref("")
    const rePopulateArrayBool: Ref<boolean> = ref(false)
    const currentBetweenSuccess: Ref<number[]> = ref([-1, -1])

    const { mergeSort, quickSort , bubbleSort, selectionSort } = sortingAlgorithms(elements, currentDouble, currentOne, currentBetween, sound, volumeRef)


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

        else if(n == "quickSort" || n == "mergeSort") {
            size.value = 400
        }
        

        populateArray(elements)
        rePopulateArrayBool.value = false
    })

    const populateArray = (arr: Ref<number[]>) =>  {

        arr.value = []
        for(let i = 0; i < size.value; i++) {
            arr.value.push(Math.floor(Math.random() * 50))
        }

    }


    const visualizeAlgorithm = async(e: string) => {

        if(rePopulateArrayBool.value) {
            populateArray(elements)
        } 
            

        if(e == "bubbleSort") 
            await bubbleSort()
        else if(e == "selectionSort")  
            await selectionSort()
        else if (e == "quickSort") {
            await quickSort(0, elements.value.length - 1)
        }else if(e == "mergeSort") {
            await mergeSort(0, elements.value.length - 1)
        }

        for(let i in elements.value) {
            currentBetweenSuccess.value = [0, Number(i)]
            await sleep(15)
        }
        await sleep(1000)
        currentBetweenSuccess.value = [-1, -1]

        rePopulateArrayBool.value = true

        currentOne.value = -1
        currentDouble.value = [-1, -1]
        currentBetween.value = [-1, -1]
    }

    onMounted(() => {
        populateArray(elements) 
    })
    
</script>
<style scoped lang="css">
    .array-container {
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .element {
        background-color: rgb(200, 0, 255);
        box-shadow: 0 0 5px -1px black;
    }


    .currentBetween {
        background-color: rgb(34, 34, 34);
    }
    .currentOne {
        background-color: rgb(27, 255, 126);
    }
    .currentDouble {
        background-color: rgb(242, 83, 78);
    }
    .currentBetweenSuccess {
        background-color: rgb(36, 237, 83);
    }
</style>