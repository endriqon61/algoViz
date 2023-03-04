import { buildRoad, buildRoadSync, getAdjacentNodes, generateIndex, findShortestDistanceNode } from '@/utils/graphUtils'
import sleep from '@/utils/sleep'

import type { Ref } from 'vue'
import type { INode } from '@/interfaces/Graph'
import { reactive, unref } from 'vue'


function setHeuristics(graph: INode[], e: number[]): void {
    for(let nodeIndex in graph) {
        
        const node = graph[nodeIndex] 
        node.heuristic = Math.abs((node.row - e[0])) + Math.abs((node.col - e[1]))
    }
}



function findAndRemoveShortestDistanceNode(queue: INode[]) {
    let currentShortest: INode = queue[0];

    for(let node of queue){
        if(node.isVisited) continue
        if(currentShortest.distance + currentShortest.heuristic > node.distance + node.heuristic) {
            currentShortest = node
        } else if(currentShortest.distance + currentShortest.heuristic === node.distance + node.heuristic
            && currentShortest.heuristic > node.heuristic) {
            currentShortest = node
        }
    }

    queue.splice(queue.indexOf(currentShortest), 1)
    return currentShortest;
}

export function aStarSync(s: number[], rows: number, cols: number, graph: INode[], e: number[]): number[][] {
    
    setHeuristics(graph, e)
    console.log('s', s, "e", e)
    const nodesToAnimate: any[] = []
    const startNode = graph[generateIndex(s, cols)]
    const predecessorList: Array<{node: string, predecessor: string}> = []
    startNode.distance = 0;
    let queue: INode[] = [startNode]
    let currentNode: any = startNode
    let i = 1;
    console.time("loop time astar")
    while(queue.length > 0){

        currentNode = findAndRemoveShortestDistanceNode(queue)
        currentNode.isVisited = true 
        if(!currentNode) return nodesToAnimate
        nodesToAnimate.push([currentNode.row, currentNode.col])
        const adjacentNodes: Array<number[]> = getAdjacentNodes([currentNode.row, currentNode.col], rows, cols, graph) 

        
        for(const adjNode in adjacentNodes) {

            const neighbor = graph[generateIndex(adjacentNodes[adjNode], cols)]
            const nodeInQueueWithSamePositionExists = queue.some(node => [node.row, node.col].join() === [neighbor.row, neighbor.col].join()) 
            const nodeInQueueWithSamePosition = queue.find(node => [node.row, node.col].join() === [neighbor.row, neighbor.col].join())

            if(neighbor.isEndNode) {
                console.log('end found')
                neighbor.parent = currentNode
                let node = neighbor;


                while([node.row, node.col].join() != s.join()) {
                    if(!node.parent) break;
                    predecessorList.push({node: [node.row, node.col].join(), predecessor: [node.parent!.row, node.parent!.col].join()})
                    node = node.parent

                }
                buildRoadSync(graph, cols, sleep, e, predecessorList, s)
                return nodesToAnimate
            }

            if(!queue.includes(neighbor)) 
            { 
                neighbor.distance = currentNode.distance + neighbor.weight
                neighbor.parent = currentNode
                queue.push(neighbor)
            }

            if(nodeInQueueWithSamePositionExists) {
                if(neighbor.distance + neighbor.heuristic > currentNode.distance + currentNode.heuristic) {
                    neighbor!.distance = currentNode.distance + neighbor.weight
                    nodeInQueueWithSamePosition!.distance = currentNode.distance + neighbor.weight
                    neighbor.parent = currentNode
                    nodeInQueueWithSamePosition!.parent = currentNode
                }

            }
            
        }
    }
    console.timeEnd("loop time astar")

    return nodesToAnimate
}

export default async function aStar(s: Ref<number[]>, rows: number, cols: number, graph: Ref<INode[]>, e: Ref<number[]>, speed: Ref<number>) {
    setHeuristics(graph.value, e.value)
    const startNode = graph.value[generateIndex(s.value, cols)]
    const predecessorList: Array<{node: string, predecessor: string}> = []
    startNode.distance = 0;
    let queue: INode[] = [startNode]
    let currentNode: any = startNode
    while(queue.length >= 1) {

        currentNode = findAndRemoveShortestDistanceNode(queue)
        console.log([...queue], "queue")

        if(!currentNode) return
        currentNode.isVisited = true 

        const adjacentNodes: Array<number[]> = getAdjacentNodes([currentNode.row, currentNode.col], rows, cols, graph.value) 

        await sleep(300 - (speed.value * 52))
        for(const adjNode in adjacentNodes) {

            const neighbor = graph.value[generateIndex(adjacentNodes[adjNode], cols)]
            const nodeInQueueWithSamePositionExists = queue.some(node => [node.row, node.col].join() === [neighbor.row, neighbor.col].join()) 
            const nodeInQueueWithSamePosition = queue.find(node => [node.row, node.col].join() === [neighbor.row, neighbor.col].join())

            if(neighbor.isEndNode) {
                neighbor.parent = currentNode
                let node = neighbor;


                while(node.parent) {
                    console.log("node parent", node, node.parent)
                    predecessorList.push({node: [node.row, node.col].join(), predecessor: [node.parent.row, node.parent.col].join()})
                    node = node.parent
                }
                console.log(predecessorList, "predList")
                await buildRoad(graph, cols, sleep, e.value, predecessorList, s.value)
                return
            }

            if(!queue.includes(neighbor)) 
            { 
                neighbor.distance = currentNode.distance + neighbor.weight
                neighbor.parent = currentNode
                queue.push(neighbor)
            }

            if(nodeInQueueWithSamePositionExists) {
                if(neighbor.distance + neighbor.heuristic > currentNode.distance + currentNode.heuristic) {
                    neighbor!.distance = currentNode.distance + neighbor.weight
                    nodeInQueueWithSamePosition!.distance = currentNode.distance + neighbor.weight
                    neighbor.parent = currentNode
                    nodeInQueueWithSamePosition!.parent = currentNode
                }

            }
            
        }
    }
}

