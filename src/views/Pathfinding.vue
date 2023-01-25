<template lang="">
    <div class="main-container">
        <AlgorithmPickerMenu class="menu" @clearGraph="() => {clearGraph(true)}" @visualize="(e) => visualizeAlgorithm(e)" menu-type="pathfinding" :options="options"/>
        <div class="grid-container">
                <div @keyup="(e) => { toggleWallNode(e) }" ref="grid" class="grid">
                <Node @dragStartCustom="(ds) => {dragStart(ds)}" @dragCustom="(n, f) => { dragHandler(n, f)}" :id="[node.row, node.col].join()" v-for="node in nodeList" :key="[node.row, node.col].join()" @dragendCustom="() => {dragEndHandler()}" @wall="(r, c) => { makeWallNode(r, c) }" :toggleAnimation="toggleAnimation" :distance="node.distance" :weight="node.weight" :heuristic="node.heuristic" :isWallNode="node.isWallNode" :isStartNode="node.isStartNode" :isEndNode="node.isEndNode" :row="node.row" :col="node.col" :isRoadNode="node.isRoadNode" :isVisited="node.isVisited"/>
                </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Node from "../components/Graph/Node.vue"
    import bfs from "@/algorithms/search/breadthFirst"
    import dijkstras from "@/algorithms/search/dijkstras"
    import AlgorithmPickerMenu from "../components/Navigation/AlgorithmPickerMenu.vue"
    import aStar, { aStarSync } from "@/algorithms/search/aStar"
    import type { INode } from "../interfaces/Graph"
    import type { Ref } from "vue"
    import { ref, onMounted, onUnmounted, getCurrentInstance, unref, watch } from "vue"
    import sleep from "@/utils/sleep"
    import { generateIndex } from "@/utils/graphUtils"
    import LogRocket from 'logrocket';
    

    const newStartNode: Ref<number[]> = ref([6,8])
    const wallMode = ref(false)
    let nodeList: Ref<Array<INode>> = ref([]);
    const startNode:  Ref<Array<number>> = ref([6,8])
    const endNode: Ref<Array<number>> = ref([10, 16])
    const oldStartNode: Ref<Array<number>> = ref([6, 8])
    const oldEndNode: Ref<Array<number>> = ref([10, 16])
    const weightMode = ref(false)
    const nodeListTest: INode[] = []
    const toggleAnimation: Ref<boolean> = ref(false)
    const instance = getCurrentInstance();
    const ac = new AbortController()
    const change = ref(false)
    const options =  ["Bfs", "dijkstras", "aStar"]
    const newEndNode = ref([10, 16])
    const rows = ref(20);
    const cols = ref(50);
    const currentDraggingNode: Ref<string> = ref("")
   
    LogRocket.init('p3oubp/algoviz');

    function toggleWallNode(e: any) {
        if(e.key == "w") {
            wallMode.value = !wallMode.value
            weightMode.value = false
        } else if (e.key == "e") {
            weightMode.value = !weightMode.value
            wallMode.value = false
        }
    }

 
    let nodesToChangeOld: any[] = []

    function dragEndHandler() {

            if(nodeList.value[cols.value*(newStartNode.value[0] - 1) + newStartNode.value[1] - 1].isWallNode) {
                newStartNode.value = oldStartNode.value
                return
            } else if (nodeList.value[cols.value*(newEndNode.value[0] - 1) + newEndNode.value[1] - 1].isWallNode) {
                newEndNode.value = oldEndNode.value
                return
            }
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

    async function dragHandler(e: any, f: any){
            toggleAnimation.value = false
            if(currentDraggingNode.value == "start") {

                 if(nodeList.value[generateIndex([parseInt(e.dataset.row), parseInt(e.dataset.col)],cols.value)].isWallNode) return
                nodeListTest[generateIndex(newStartNode.value, cols.value)].isStartNode = false
                if(newStartNode.value.join() != [parseInt(e.dataset.row), parseInt(e.dataset.col)].join()) {
                    clearGraph(false)

                    console.log("old start", newStartNode.value)

                    newStartNode.value = [parseInt(e.dataset.row), parseInt(e.dataset.col)]
                    nodeListTest[generateIndex(newStartNode.value, cols.value)].isStartNode = true
                    console.log("new start", newStartNode.value)
                    const testStart = [parseInt(e.dataset.row), parseInt(e.dataset.col)]
                    const testEnd = Array.from(endNode.value)
                    const nodesToChange  = aStarSync(testStart, rows.value, cols.value, nodeListTest, testEnd)

                    console.log(nodesToChange, "nodesTochange") 
                    for(let node of nodesToChange!){
                        // nodeList.value[generateIndex(node, cols.value)].isVisited = true
                        let testNode = document.getElementById(node.join())
                        testNode?.classList.add('vis') 
                        if(nodeListTest[generateIndex(node, cols.value)].isRoadNode) testNode?.classList.add('road-no-animation')
                    }            
                    nodesToChangeOld = nodesToChange!.slice()
                    instance?.proxy?.$forceUpdate() 
                }
            } else if(currentDraggingNode.value == "end"){
                if(nodeList.value[generateIndex([parseInt(e.dataset.row), parseInt(e.dataset.col)],cols.value)].isWallNode) return
                nodeListTest[generateIndex(newEndNode.value, cols.value)].isEndNode = false
                if(newEndNode.value.join() != [parseInt(e.dataset.row), parseInt(e.dataset.col)].join()) {
                    clearGraph(false)

                    newEndNode.value = [parseInt(e.dataset.row), parseInt(e.dataset.col)]
                    nodeListTest[generateIndex(newEndNode.value, cols.value)].isEndNode = true
                    const nodesToChange  = aStarSync(startNode.value, rows.value, cols.value, nodeListTest, newEndNode.value)
                          
                    for(let node of nodesToChange!){
                        // nodeList.value[generateIndex(node, cols.value)].isVisited = true
                        let testNode = document.getElementById(node.join())
                        testNode?.classList.add('vis') 
                        if(nodeListTest[generateIndex(node, cols.value)].isRoadNode) testNode?.classList.add('road-no-animation')
                    }            
                    nodesToChangeOld = nodesToChange!.slice()
                               
                }
            }
    }

         

    function dragStart(ds: DOMStringMap) {
        if(ds.isendnode == "true") {
            currentDraggingNode.value = "end"
            oldEndNode.value = [parseInt(ds.row!), parseInt(ds.col!)]
        } else if(ds.isstartnode == "true") {
            currentDraggingNode.value = "start"
            oldStartNode.value = [parseInt(ds.row!), parseInt(ds.col!)]

        }

    }
    function makeWallNode(r: number, c: number): void {
        const node = nodeList.value[cols.value*(r - 1) + c - 1]
        const nodeTest = nodeListTest[cols.value*(r - 1) + c - 1]
        if(node.isEndNode || node.isStartNode || node.weight > 1 || nodeTest.isEndNode || nodeTest.isStartNode || nodeTest.weight > 1) return

        if(wallMode.value) {
            nodeTest.isWallNode = !nodeTest.isWallNode
            node.isWallNode = !node.isWallNode
        }else if(weightMode.value) {
            if(!node.isWallNode) {
                node.weight+=2
            }
            if(!nodeTest.isWallNode) {
                nodeTest.weight+=2
            }
        }
    }

    function createNodeList() {
        nodeList.value = []
        for(let i = 0; i < rows.value; i++) {
            for(let j = 0; j < cols.value; j++) {
                if(i == startNode.value[0] - 1 && j == startNode.value[1] - 1) {
                    nodeList.value.push({heuristic: 0, distance: Number.POSITIVE_INFINITY, weight: 1, isVisited: false, isStartNode: true, isWallNode: false, isEndNode: false, isRoadNode: false, row: i + 1, col: j + 1})
                    nodeListTest.push({heuristic: 0, distance: Number.POSITIVE_INFINITY, weight: 1, isVisited: false, isStartNode: true, isWallNode: false, isEndNode: false, isRoadNode: false, row: i + 1, col: j + 1})

                }
                else if(i == endNode.value[0] - 1 && j == endNode.value[1] - 1) {
                    nodeList.value.push({heuristic: 0, distance: Number.POSITIVE_INFINITY, weight: 1,  isVisited: false, isStartNode: false, isWallNode: false, isEndNode: true, isRoadNode: false, row: i + 1, col: j + 1})
                    nodeListTest.push({heuristic: 0, distance: Number.POSITIVE_INFINITY, weight: 1,  isVisited: false, isStartNode: false, isWallNode: false, isEndNode: true, isRoadNode: false, row: i + 1, col: j + 1})
                } else {
                    nodeList.value.push({heuristic: 0,distance: Number.POSITIVE_INFINITY, weight: 1, isVisited: false, isStartNode: false, isWallNode: false,isEndNode: false, isRoadNode: false, row: i + 1, col: j  + 1})
                    nodeListTest.push({heuristic: 0,distance: Number.POSITIVE_INFINITY, weight: 1, isVisited: false, isStartNode: false, isWallNode: false,isEndNode: false, isRoadNode: false, row: i + 1, col: j  + 1})
                }
            }
        }

    }
    createNodeList()

    function clearGraph(clearWalls: boolean) {
        for(let node of nodesToChangeOld!){
                        // nodeList.value[generateIndex(node, cols.value)].isVisited = true
                        let testNode = document.getElementById(node.join())
                        testNode?.classList.remove('vis') 
                        testNode?.classList.remove('road-no-animation') 
        }
        nodeList.value.forEach((node) => {
            nodeListTest[generateIndex([node.row, node.col], cols.value)].isRoadNode = false
            node.isRoadNode = false;
            nodeListTest[generateIndex([node.row, node.col], cols.value)].isVisited = false
            node.isVisited = false;
            nodeListTest[generateIndex([node.row, node.col], cols.value)].distance = Number.POSITIVE_INFINITY
            node.distance = Number.POSITIVE_INFINITY;
            if(clearWalls) {
                nodeListTest[generateIndex([node.row, node.col], cols.value)].isWallNode = false
                node.isWallNode = false
                nodeListTest[generateIndex([node.row, node.col], cols.value)].weight = 1
                node.weight = 1
            }
        })
    }
    async function visualizeAlgorithm(e: any) {
        toggleAnimation.value = true
        clearGraph(false)
        // startNode.value = newStartNode.value
        if(e == "aStar") {
            aStar(startNode, rows.value, cols.value, nodeList, endNode)
        } else if (e == "dijkstras") {
            dijkstras(startNode, rows.value, cols.value, nodeList, endNode)
        } else if(e == "Bfs") {
            bfs(startNode, rows, cols, nodeList, endNode)
        }

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
        width: auto;
        flex-direction: column;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(50, auto);
        grid-template-rows: repeat(20, auto);
    } 
    .main-container {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .vis {
        background-color: red;
    }
    .road-no-animation {
        background-color: gray;
    }

   .menu {
        z-index: 900000000;
   } 
</style>