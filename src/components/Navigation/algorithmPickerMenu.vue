<template>
    <div class="menu-container">
        <div class="m-2 flex items-center shadow-lg bg-purple-500 rounded flex justify-between">


        <div>
            
            <div @click="() => { showDropDown = !showDropDown }" class="m-2 flex justify-center items-center disabled shadow-md bg-purple-50 text-purple-600 p-2 rounded">

                <span class="whitespace-nowrap">
                    Choose Algoirthm
                </span>
                <span v-if="showDropDown">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path d="M18 15L12.2126 9.21261V9.21261C12.0952 9.09519 11.9048 9.09519 11.7874 9.21261V9.21261L6 15" stroke="#9333ea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </span>
                <span v-else>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L11.7874 14.7874V14.7874C11.9048 14.9048 12.0952 14.9048 12.2126 14.7874V14.7874L18 9" stroke="#9333ea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
                </span>
            </div>

            <div v-if="showDropDown" class="disabled dropdown-menu">
                <div v-for="option in options" @click="setSelectedAlgorithm(option)" class="options">
                    {{ option }}
                </div>
            </div>

        </div>

        <div class="flex w-full  items-center justify-start">
            <div class="left-border">
                <div class="flex m-2 gap-1 p-2 bg-purple-50 text-purple-600 rounded shadow-md">
                    <label for="volume-slider">Volume: </label>
                    <input class="accent-purple-600" type="range" id="volume-slider" min="0" max="5" v-model="volume" @input="() => { emit('changeVolume', volume) }"/>
                    <span> {{ volume }} </span>
                </div>
            </div>
            <div class="left-border">
                <div class="flex m-2 gap-1 p-2 bg-purple-50 text-purple-600 rounded shadow-md">
                    <label for="speed-slider">Speed: </label>
                    <input class="accent-purple-600" style='{color: red}' id="speed-slider" type="range" min="1" max="5" v-model="speed" @input="() => { emit('changeSpeed', speed) }"/>
                    <span>{{ speed }}</span>
                </div>
            </div>
        </div>
        
        <div class="buttons">
            <button class="whitespace-nowrap disabled m-2 shadow-md bg-purple-50 text-purple-600 p-2 rounded" v-if="type == 'pathfinding'" @click="clearGraph">
                Clear Walls And Weights
            </button>
            <button class="disabled m-2 whitespace-nowrap shadow-md bg-purple-50 text-purple-600 p-2 rounded" @click="visualize">
                Visualize {{ selectedAlgorithm }}{{ selectedAlgorithm ? '!' : '' }}
            </button>
        </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref,  onMounted, computed } from "vue"
    import type { Ref, ComputedRef} from "vue"
    
    const emit = defineEmits(['visualize' , 'clearGraph', 'pickAlgorithm', 'changeSpeed', 'changeVolume'])

    function clearGraph() {
        emit('clearGraph')
    }

    function changeVolume(e: Event) {

        emit('changeVolume', volume.value) 
    }

    

    function changeSpeed(e: Event) {

        emit('changeSpeed', volume.value) 
    }

    function visualize() {
        console.log("visualizing")
        emit('visualize', selectedAlgorithm.value)
    }
    const selectedAlgorithm: Ref<string> = ref('')
    const volume: Ref<number> = ref(5)
    const speed: Ref<number> = ref(5)
    const showDropDown: Ref<boolean> = ref(false)
    type menuType = 'pathfinding' | 'sorting' | 'searching'

    function setSelectedAlgorithm(option: string) {
        showDropDown.value = false
        selectedAlgorithm.value = option
        emit('pickAlgorithm', option)
    }


    

    const { options, type } = defineProps<{options: string[], type: menuType}>()

    onMounted(() => {
        console.log("options", options)
    })

</script>

<style lang="scss" scoped>
   
    .buttons {
        display: flex;
        >button {
            margin: 5px;
        }
    }

    .left-border {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        &::before{
            content: '';
            position: absolute;
            left: 0;
            height: 35%;
            background-color: white;
            width: 1px;
            border-radius: 100%;
        }
    }
    .dropdown-menu {

        position: absolute;
        bottom: 0;
        transform: translateY(100%);
    }
    .menu-container {
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 900000;
    }
</style>