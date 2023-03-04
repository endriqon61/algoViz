<template>
    <div class="menu-container">
        <div class="m-2 flex items-center shadow-lg bg-purple-500 rounded flex justify-between">


        <div @click="() => { showDropDown = !showDropDown }" class="dropdown-btn">
            
            <div class="m-2 disabled shadow-md bg-purple-400 p-2 rounded">

                <span>
                    Choose Algoirthm
                </span>
                <span v-if="showDropDown">
                &#9650 
                </span>
                <span v-else>
                &#9660
                </span>
            </div>

            <div v-if="showDropDown" class="disabled dropdown-menu">
                <div v-for="option in options" @click="setSelectedAlgorithm(option)" class="options">
                    {{ option }}
                </div>
            </div>

        </div>
        
        <div class="buttons">
            <button class="disabled m-2 shadow-md bg-purple-400 p-2 rounded" v-if="type == 'pathfinding'" @click="clearGraph">
                Clear Walls And Weights
            </button>
            <button class="disabled m-2 shadow-md bg-purple-400 p-2 rounded" @click="visualize">
                Visualize {{ selectedAlgorithm }}{{ selectedAlgorithm ? '!' : '' }}
            </button>
        </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref,  onMounted, computed } from "vue"
    import type { Ref, ComputedRef} from "vue"
    
    const emit = defineEmits(['visualize' , 'clearGraph', 'pickAlgorithm'])

    function clearGraph() {
        emit('clearGraph')
    }

    function visualize() {
        console.log("visualizing")
        emit('visualize', selectedAlgorithm.value)
    }
    const selectedAlgorithm: Ref<string> = ref('')
    const showDropDown: Ref<boolean> = ref(false)
    type menuType = 'pathfinding' | 'sorting' | 'searching'

    function setSelectedAlgorithm(option: string) {
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
    .dropdown-btn {

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