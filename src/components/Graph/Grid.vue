<template lang="">
    <div class="grid-container">
            <div @keyup="(e) => { toggleWallNode(e) }" ref="grid" class="grid">
            <Node @dragStartCustom="(ds) => {dragStart(ds)}" @dragCustom="(n, f) => dragHandler(n, f)" v-for="node in nodeList" @dragendCustom="() => {dragEndHandler()}" @wall="(r, c) => { makeWallNode(r, c) }" :distance="node.distance" :weight="node.weight" :heuristic="node.heuristic" :isWallNode="node.isWallNode" :isStartNode="node.isStartNode" :isEndNode="node.isEndNode" :row="node.row" :col="node.col" :isRoadNode="node.isRoadNode" :isVisited="node.isVisited"/>
            </div>
            <button @click="visualizeAlgorithm()">Visualize!</button>
            <button @click="clearGraph(true)">Clear Graph</button>
            <button @click="() => { wallMode = !wallMode }">Draw a wall</button>
    </div>
</template>
<script setup lang="ts">
    import Node from "./Node.vue"
    import bfs from "@/algorithms/search/breadthFirst"
    import dijkstras from "@/algorithms/search/dijkstras"
    import aStar from "@/algorithms/search/aStar"
    import type { INode } from "../../interfaces/Graph"
    import type { Ref } from "vue"
    import { ref, onMounted, onUnmounted } from "vue"
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



    function toggleWallNode(e: any) {
        if(e.key == "w") {
            wallMode.value = !wallMode.value
            weightMode.value = false
        } else if (e.key == "e") {
            weightMode.value = !weightMode.value
            wallMode.value = false
        }
    }

    const newEndNode = ref([10, 16])
    const rows = ref(20);
    const cols = ref(50);
    const currentDraggingNode: Ref<string> = ref("")

    
    // function makeNodesDraggable() {
    //     if(grid.value) {
    //         Array.from(grid.value.children).forEach((child: any, index: number) => {
    //             if(child.draggable)
    //                 console.log("draggable", child.dataset.row, child.dataset.col)
    //             if(child.dataset.isStartNode || child.dataset.isEndNode) {
    //                 child.draggable = true
    //             } else {
    //                 child.draggable = false
    //             }
    //         })
    //     }

    // }

    function dragEndHandler() {
            startNode.value = newStartNode.value
            endNode.value = newEndNode.value

            if(currentDraggingNode.value == "end") {
                nodeList.value[cols.value*(oldEndNode.value[0] - 1) + oldEndNode.value[1] - 1].isEndNode = false
                nodeList.value[cols.value*(newEndNode.value[0] - 1) + newEndNode.value[1] - 1].isEndNode = true

            }else if(currentDraggingNode.value == "start") {
                nodeList.value[cols.value*(oldStartNode.value[0] - 1) + oldStartNode.value[1] - 1].isStartNode = false
                nodeList.value[cols.value*(newStartNode.value[0] - 1) + newStartNode.value[1] - 1].isStartNode = true

            }

            currentDraggingNode.value = ""

            oldEndNode.value = endNode.value
            oldStartNode.value = startNode.value

    }

    function dragHandler(e: any, f: any){
            if(currentDraggingNode.value == "start") {
                newStartNode.value = [parseInt(e.dataset.row), parseInt(e.dataset.col)]
            } else if(currentDraggingNode.value == "end"){
                newEndNode.value = [parseInt(e.dataset.row), parseInt(e.dataset.col)]
            }
    }

    function dragStart(ds: DOMStringMap) {
        if(ds.isendnode == "true") {
            currentDraggingNode.value = "end"
            oldEndNode.value = [parseInt(ds.row!), parseInt(ds.col!)]
        } else if(ds.isstartnode == "true") {
            currentDraggingNode.value = ds.isendnode == "true" ? "end" : ds.isstartnode == "true" ? "start" : ""
            oldStartNode.value[0] = parseInt(ds.row!)         
            oldStartNode.value[1] = parseInt(ds.col!)         

        }

    }
    function makeWallNode(r: number, c: number): void {
        const node = nodeList.value[cols.value*(r - 1) + c - 1]
        if(node.isEndNode || node.isStartNode) return

        if(wallMode.value) {
            node.isWallNode = !node.isWallNode
        }else if(weightMode.value) {
            node.weight+=2
        }
    }

    function createNodeList() {
        nodeList.value = []
        for(let i = 0; i < rows.value; i++) {
            for(let j = 0; j < cols.value; j++) {
                if(i == startNode.value[0] - 1 && j == startNode.value[1] - 1) {
                    nodeList.value.push({heuristic: 0, distance: Number.POSITIVE_INFINITY, weight: 1, isVisited: false, isStartNode: true, isWallNode: false, isEndNode: false, isRoadNode: false, row: i + 1, col: j + 1})
                }
                else if(i == endNode.value[0] - 1 && j == endNode.value[1] - 1) {
                    nodeList.value.push({heuristic: 0, distance: Number.POSITIVE_INFINITY, weight: 1,  isVisited: false, isStartNode: false, isWallNode: false, isEndNode: true, isRoadNode: false, row: i + 1, col: j + 1})
                } else {
                    nodeList.value.push({heuristic: 0,distance: Number.POSITIVE_INFINITY, weight: 1, isVisited: false, isStartNode: false, isWallNode: false,isEndNode: false, isRoadNode: false, row: i + 1, col: j  + 1})
                }
            }
        }

    }
    createNodeList()

    function clearGraph(clearWalls: boolean) {
        nodeList.value.forEach((node) => {
            node.isRoadNode = false;
            node.isVisited = false;
            node.distance = Number.POSITIVE_INFINITY;
            if(clearWalls) {
                node.isWallNode = false
                node.weight = 1
            }
        })
    }
    async function visualizeAlgorithm() {
    clearGraph(false)
    startNode.value = newStartNode.value
    aStar(startNode, rows.value, cols.value, nodeList, endNode)

    }
    onMounted(() => {
        window.addEventListener('keypress', toggleWallNode)
    }) 

    onUnmounted(() => {
        window.removeEventListener('keypress', toggleWallNode)
    })
    // onBeforeMount(()=> {
    //     makeNodesDraggable()
    // })

</script>
<style scoped lang="scss">
    .grid-container {
        display: flex;
        flex-direction: column;
    }
    .grid {
        display: grid;
        // width: 90vw;
        // height: 90vh;
        grid-template-columns: repeat(50, auto);
        grid-template-rows: repeat(20, auto);
    } 

    
</style>