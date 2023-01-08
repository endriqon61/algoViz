<template lang="">
    <div @mousedown="toggleWallNode = true" @mouseup="toggleWallNode = false" class="grid-container">
       <Node v-for="node in nodeList" @wall="(r, c) => { makeWallNode(r, c) }" :isWallNode="node.isWallNode" :isStartNode="node.isStartNode" :isEndNode="node.isEndNode" :row="node.row" :col="node.col" :isRoadNode="node.isRoadNode" :isVisited="node.isVisited"/>
    </div>
    <button @click="visualizeAlgorithm()">Visualize!</button>
    <button @click="clearGraph(true)">Clear Graph</button>
</template>
<script setup lang="ts">
    import Node from "./Node.vue"
    import bfs from "@/algorithms/search/breadthFirst"
    import type { INode } from "../../interfaces/Graph"
    import type { Ref } from "vue"
    import { ref } from "vue"
    function test()  {
        console.log("mouse uping")
    }
    const nodeList: Ref<Array<INode>> = ref([]);
    const startNodeValue = [6, 8]
    const startNode:  Ref<Array<number>> = ref(startNodeValue)
    const endNode: Ref<Array<number>> = ref([10, 16])
    const rows = ref(20);
    const cols = ref(50);
    const toggleWallNode: Ref<boolean> = ref(false);
    
    function makeWallNode(r: number, c: number): void {
        console.log(toggleWallNode.value)
        if(!toggleWallNode.value) return
        nodeList.value[cols.value*(r - 1) + c - 1].isWallNode = !nodeList.value[cols.value*(r - 1) + c - 1].isWallNode 
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

    function clearGraph(clearWalls: boolean) {
        nodeList.value.forEach((node) => {
            node.isRoadNode = false;
            node.isVisited = false;
            if(clearWalls) node.isWallNode = false;
        })
    }
    function visualizeAlgorithm() {
    clearGraph(false)
    startNode.value = startNodeValue
    bfs(startNode, rows, cols, nodeList, endNode)

    }

</script>
<style scoped lang="scss">
    .grid-container {
        display: grid;
        // width: 90vw;
        // height: 90vh;
        grid-template-columns: repeat(50, auto);
        grid-template-rows: repeat(20, auto);
    } 

    
</style>