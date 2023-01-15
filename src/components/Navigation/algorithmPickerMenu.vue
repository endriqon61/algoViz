<template>
    <div class="menu-container">
        <div class="dropdown-btn">
            <div v-for="option in options" @click="setSelectedAlgorithm(option)" class="options">
                {{ option.algorithm }}
            </div>
        </div>
        <button @click="$emit('visualize', selectedAlgorithm)">
            Visualize {{ selectedAlgorithm }}
        </button>
    </div>
</template>

<script lang="ts" setup>
    import { ref,computed } from "vue"
    import type { Ref, ComputedRef} from "vue"
    interface Option {
        algorithm: string,
        id: number
    }

    function setSelectedAlgorithm(option: Option) {
        selectedAlgorithm.value = option.algorithm
    }

    const selectedAlgorithm: Ref<string> = ref('')

    

    const { options } = defineProps<{options: Option[]}>()

</script>

<style lang="scss" scoped>

</style>