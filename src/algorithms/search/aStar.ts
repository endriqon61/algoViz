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

        if(adjNode.heuristic < currentShortest.heuristic) {
            currentShortest = adjNode
            valueChanged = true
        }
    }
    console.log("current shortest", currentShortest)
    if(valueChanged)
        return [currentShortest.row, currentShortest.col]
    else 
        return [89, 68]
}

function setHeuristics(graph: Ref<INode[]>, e: number[]): void {
    for(let nodeIndex in graph.value) {
        
        const node = graph.value[nodeIndex] 
        node.heuristic = Math.abs((node.row - e[0])) + Math.abs((node.col - e[1]))
    }
}

function sortQueueByDistance(queue: INode[]) {
    queue.sort((a, b) => (b.heuristic + b.distance) - (a.heuristic + a.distance))
}

export default async function aStar(s: Ref<number[]>, rows: number, cols: number, graph: Ref<INode[]>, e: Ref<number[]>) {
    setHeuristics(graph, e.value)
    const startNode = graph.value[generateIndex(s.value, cols)]
    const predecessorList: Array<{node: string, predecessor: string}> = []
    startNode.distance = 0;
    let queue: INode[] = [startNode]
    let currentNode: any = startNode
    while(queue.length >= 1) {

        sortQueueByDistance(queue)
        console.log([...queue], "queue")
        currentNode = queue.pop()

        if(!currentNode) return
        currentNode.isVisited = true 

        const adjacentNodes: Array<number[]> = getAdjacentNodes([currentNode.row, currentNode.col], rows, cols, graph.value) 

        await sleep(25)
        for(const adjNode in adjacentNodes) {

            const nodeInGraph = graph.value[generateIndex(adjacentNodes[adjNode], cols)]
            
            predecessorList.push({node: [...adjacentNodes[adjNode]].join(), predecessor: [currentNode.row, currentNode.col].join()})
            // if(nodeInGraph.isVisited) continue
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

            if(!queue.includes(nodeInGraph)) 
            { 
                queue.push(nodeInGraph)
                nodeInGraph.distance = currentNode.distance + nodeInGraph.weight
            
            }

            if(nodeInGraph.distance >= currentNode.distance + nodeInGraph.weight) {
                nodeInGraph.distance = currentNode.distance + nodeInGraph.weight
                predecessorList.push({node: [...adjacentNodes[adjNode]].join(), predecessor: [currentNode.row, currentNode.col].join()})

            }
            // queue.push(nodeInGraph)
            
        }
    }
}

