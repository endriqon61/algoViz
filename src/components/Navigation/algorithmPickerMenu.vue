<template>
    <div class="menu-container">
        <div @click="() => { showDropDown = !showDropDown }" class="dropdown-btn">O
            <div v-if="showDropDown" class="dropdown-menu">
                <div v-for="option in options" @click="setSelectedAlgorithm(option)" class="options">
                    {{ option }}
                </div>
            </div>
        </div>
       
        <button @click="visualize">
            Visualize {{ selectedAlgorithm }}
        </button>
    </div>
</template>

<script lang="ts" setup>
    import { ref, defineEmits, onMounted, computed } from "vue"
    import type { Ref, ComputedRef} from "vue"
    
    const emit = defineEmits(['visualize'])

    function visualize() {
        console.log("visualizing")
        emit('visualize', selectedAlgorithm.value)
    }
    const selectedAlgorithm: Ref<string> = ref('')
    const showDropDown: Ref<boolean> = ref(false)

    function setSelectedAlgorithm(option: string) {
        selectedAlgorithm.value = option
    }


    

    const { options } = defineProps<{options: string[]}>()

    onMounted(() => {
        console.log("options", options)
    })

</script>

<style lang="scss" scoped>
   
   
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
    }
</style>