import { buildRoad, getAdjacentNodes, generateIndex, findShortestDistanceNode } from '@/utils/graphUtils'
import sleep from '@/utils/sleep'

import type { Ref } from 'vue'
import type { INode } from '@/interfaces/Graph'

function getClosestAdjacentNode(adjacentNodes: Array<number[]>, graph: Ref<INode[]>, cols: number): number[] {


    let currentShortest = {heuristic: Number.POSITIVE_INFINITY, distance: Number.POSITIVE_INFINITY, row: 700, col: 800}
    let valueChanged = false 
    for(let adjNodeIndex in adjacentNodes) {
        const  adjNode = graph.value[generateIndex(adjacentNodes[adjNodeIndex], cols)]
        if(adjNode.isWallNode || adjNode.isVisited)  {
            console.log('visited') 
            continue
         }

        if(adjNode.heuristic + adjNode.distance < currentShortest.heuristic + currentShortest.distance) {
            currentShortest = adjNode
            valueChanged = true
        }
    }
    console.log("current shortest", currentShortest)
    if(valueChanged)
        return [currentShortest.row, currentShortest.col]
    else 
        return []
}

function setHeuristics(graph: Ref<INode[]>, e: number[]): void {
    for(let nodeIndex in graph.value) {
        
        const node = graph.value[nodeIndex] 
        node.heuristic = Math.abs((node.row - e[0])) + Math.abs((node.col - e[1]))
    }
}

function sortQueueByDistance(queue: INode[]) {
    queue.sort((a, b) => (b.heuristic + b.distance) - (a.heuristic + a.distance))
    console.log("sorted ", queue)
}

export default async function aStar(s: Ref<number[]>, rows: number, cols: number, graph: Ref<INode[]>, e: Ref<number[]>) {
    setHeuristics(graph, e.value)
    const startNode = graph.value[generateIndex(s.value, cols)]
    const predecessorList: Array<{node: string, predecessor: string}> = []
    startNode.distance = 0;
    const queue: INode[] = [startNode]
    let currentNode: any = startNode
    while(queue.length >= 1) {

        currentNode = queue.pop()

        if(!currentNode) return
        currentNode.isVisited = true 

        const adjacentNodes: Array<number[]> = getAdjacentNodes([currentNode.row, currentNode.col], rows, cols, graph.value) 

        await sleep(1)
        for(const adjNode in adjacentNodes) {

            predecessorList.push({node: [...adjacentNodes[adjNode]].join(), predecessor: [currentNode.row, currentNode.col].join()})
            const nodeInGraph = graph.value[generateIndex(adjacentNodes[adjNode], cols)]
            if(!nodeInGraph.isVisited) nodeInGraph.distance = currentNode.distance + nodeInGraph.weight
            //queue.unshift(nodeInGraph)
            
            if(nodeInGraph.isEndNode) {
                let u: string = [...e.value].join();
                const roadArray: string[] = []
                console.log("road Array: ", roadArray)
                while(u != [...s.value].join()) {
                    roadArray.push(u)
                    const pred = predecessorList.find(el => el.node == u)
                    console.log('predec')
                    if(!pred) break
                    u = pred.predecessor
                }
                await buildRoad(roadArray, graph, cols, sleep)
                return
            }
        }
    currentNode.distance = Number.POSITIVE_INFINITY
    queue.push(graph.value[generateIndex(findShortestDistanceNode(graph.value, true), cols)])
    sortQueueByDistance(queue)
    }
}

