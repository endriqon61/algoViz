<template lang="">
    <div class="flex items-end justify-center h-full">
        <AlgorithmPickerMenu :class="{'disable-pointers': !algorithmFinishedGlobal}" @pickAlgorithm="(e) => {setCurrentAlgorithm(e)}" @visualize="(e) => { visualizeAlgorithm(e) }" :options="options" menu-type="sorting"/>

        <div class="array-container">
            <div v-for="(el, index) in elements" class="element" :class="{currentBetweenSuccess: index >= currentBetweenSuccess[0] && index <= currentBetweenSuccess[1],currentBetween: index >= currentBetween[0] && index <= currentBetween[1], currentDouble: index == currentDouble[0] || index == currentDouble[1], currentOne: index == currentOne}" :style="{height: String(el * 20) + 'px', width: String(800/size) + 'px'}"></div>
        </div>
        <div class="fixed bottom-0 flex w-full flex items-center justify-start">
            <div class="flex flex-col m-2 p-2 bg-purple-400 rounded shadow-md">
                <label for="volume-slider">Volume: </label>
                <input class="accent-gray-600" type="range" id="volume-slider" min="0" max="10" v-model="volumeRef" @change="(e) => {e.value = volumeRef}"/>
            </div>
            <div class="flex flex-col m-2 p-2 bg-purple-400 rounded shadow-md">
                <label for="speed-slider">Speed: </label>
                <input class="accent-gray-600" style='{color: red}' id="speed-slider" type="range" min="1" max="5" v-model="speed" @change="(e) => {e.value = speed}"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import sortingAlgorithms from "@/algorithms/sortingAlgorithms";
    import AlgorithmPickerMenu from "@/components/Navigation/algorithmPickerMenu.vue";
    import { getCurrentInstance, ref, watch, onMounted } from "vue"
    import { sounds } from "@/config/sounds"
    import type { Ref } from "vue"
    import sleep from "@/utils/sleep";
    import { useAlgoStore } from "@/store/algoStore";
    

    const speed = ref(5)    
    const elements: Ref<number[]> = ref([14, 13, 12, 15])
    const instance = getCurrentInstance()
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
    let { algorithmFinishedGlobal } = useAlgoStore()
    const { mergeSort, quickSort , bubbleSort, selectionSort } = sortingAlgorithms(elements, currentDouble, currentOne, currentBetween, sound, volumeRef, speed)


    const setCurrentAlgorithm = (e: string) => {
        currentAlgorithm.value = e
    }

    watch(currentAlgorithm, n => {

        currentBetweenSuccess.value = [-1, -1]

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
            arr.value.push(Math.floor(Math.random() * 35))
        }

    }


    const visualizeAlgorithm = async(e: string) => {

        algorithmFinishedGlobal = false
        currentBetweenSuccess.value = [-1, -1]

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

        currentOne.value = -1
        currentDouble.value = [-1, -1]
        currentBetween.value = [-1, -1]

        await sleep(200)
        sound.ascend.play()
        sound.ascend.rate(0.4)
        sound.ascend.fade(0, 1, 2000)
        console.time('loop')
        for(let i in elements.value) {
            currentBetweenSuccess.value = [0, Number(i)]

            const sleepTime = Math.floor(400/size.value) <= 1 ? 1 : Math.floor(400/size.value)*4.45
            await sleep(sleepTime)
        }
        console.timeEnd('loop')

        await sleep(1000)


        algorithmFinishedGlobal = true
        rePopulateArrayBool.value = true
        instance?.proxy?.$forceUpdate()

      
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