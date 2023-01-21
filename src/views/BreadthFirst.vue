<template lang="">
    <div class="container">
        <AlgorithmPickerMenu :options="options"/>
        <p @click="testFunc">press "w" to draw walls</p>
        <Grid :fn="testFunc"/> 
    </div>
</template>
<script setup lang="ts">
    import Grid from "../components/Graph/Grid.vue"
    import AlgorithmPickerMenu from "@/components/Navigation/algorithmPickerMenu.vue";
    import { ref } from "vue"
    import type { Ref } from "vue"
    import type { INode } from "@/interfaces/Graph";

    const newStartNode: Ref<number[]> = ref([6,8])
    const grid: any = ref(null)
    const wallMode = ref(false)
    const nodeList: Ref<Array<INode>> = ref([]);
    const startNodeValue = ref([6, 8])
    const startNode:  Ref<Array<number>> = ref([6,8])
    const endNode: Ref<Array<number>> = ref([10, 16])
    const oldStartNode: Ref<Array<number>> = ref([6, 8])
    const oldEndNode: Ref<Array<number>> = ref([10, 16])
    const weightMode = ref(false)
    
    function testFunc() {

    }

    const options =  ["Bfs", "dijkstras", "aStar"]
</script>
<style scoped lang="scss">

    
   .container {
    display: flex;
    justify-content: center;
    align-items: center;
   } 
</style>