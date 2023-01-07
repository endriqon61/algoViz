<template lang="">
    <div class="grid-container">
       <Node v-for="node in nodeList" @wall="(r, c) => { makeWallNode(r, c) }" :isWallNode="node.isWallNode" :isStartNode="node.isStartNode" :isEndNode="node.isEndNode" :row="node.row" :col="node.col" :isRoadNode="node.isRoadNode" :isVisited="node.isVisited"/>
    </div>
    <button @click="visualizeAlgorithm()">Visualize</button>
</template>
<script setup lang="ts">
    import Node from "./Node.vue"
    import bfs from "@/algorithms/search/breadthFirst"
    import type { INode } from "../../interfaces/Graph"
    import type { Ref } from "vue"
    import { ref } from "vue"
    
    const nodeList: Ref<Array<INode>> = ref([]);
    const startNode:  Ref<Array<number>> = ref([6, 8])
    const endNode: Ref<Array<number>> = ref([10, 16])
    const rows = ref(15);
    const cols = ref(30);
    
    function makeWallNode(r: number, c: number): void {
        console.log('Making wall node', r, c)
        nodeList.value[cols.value*(r - 1) + c - 1].isWallNode = true
    }

    for(let i = 0; i < rows.value; i++) {
        for(let j = 0; j < cols.value; j++) {
            if(i == startNode.value[0] - 1 && j == startNode.value[1] - 1) {
                nodeList.value.push({isVisited: false, isStartNode: true, isWallNode: false, isEndNode: false, isRoadNode: false, row: i + 1, col: j + 1})
            }
            else if(i == endNode.value[0] - 1 && j == endNode.value[1] - 1) {
                nodeList.value.push({isVisited: false, isStartNode: false, isWallNode: false, isEndNode: true, isRoadNode: false, row: i + 1, col: j + 1})
            } else {
                nodeList.value.push({isVisited: false, isStartNode: false, isWallNode: false,isEndNode: false, isRoadNode: false, row: i + 1, col: j  + 1})
            }
        }
    }

    function visualizeAlgorithm() {
    bfs(startNode, rows, cols, nodeList, endNode)

    }

</script>
<style scoped lang="scss">
    .grid-container {
        display: grid;
        // width: 90vw;
        // height: 90vh;
        grid-template-columns: repeat(30, auto);
        grid-template-rows: repeat(15, auto);
    } 

    
</style>