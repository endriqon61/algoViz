<template>
    <div class="menu-container">
        <div @click="() => { showDropDown = !showDropDown }" class="dropdown-btn">O
            <div v-if="showDropDown" class="dropdown-menu">
                <div v-for="option in options" @click="setSelectedAlgorithm(option)" class="options">
                    {{ option }}
                </div>
            </div>
        </div>
        
        <div class="buttons">
            <button v-if="type == 'sorting'" @click="clearGraph">
                Clear Walls And Weights
            </button>
            <button @click="visualize">
                Visualize {{ selectedAlgorithm }}{{ selectedAlgorithm ? '!' : '' }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref,  onMounted, computed } from "vue"
    import type { Ref, ComputedRef} from "vue"
    
    const emit = defineEmits(['visualize' , 'clearGraph'])

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
        padding: 15px;
        display: flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 900000;
    }
</style>