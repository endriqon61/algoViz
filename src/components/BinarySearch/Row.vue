<template>
    <div class="row">
        <div v-for="(el, index) in elements" :class="{'cell_found': selectedClass(el)}" class="cell"> {{el}} </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue"
    import type { Ref } from "vue"
    const selected: Ref<number> = ref(0);
    const props = defineProps<{
        elements: Array<number>;
        find: number
    }>()
    function startSearch() {
        let right = props.elements.length - 1;
        let left = 0;


    }
    function selectedClass(el: number): boolean {
        if(el == 2) {
            return true
        }
        return false
    }
    onMounted(() => {
        startSearch()
    })
    
    
</script>

<style scoped lang="css">
    .row {
        display: flex;
        background-color: yellow;
        height: 50px;
        position: relative;
    }
    .cell {
        padding: 10px;
        border: 1px solid black;
    }

    .cell_found {
        background-color: pink;
    }
</style>