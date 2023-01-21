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

export default async function aStar(s: Ref<number[]>, rows: number, cols: number, graph: Ref<INode[]>, e: Ref<number[]>) {
    setHeuristics(graph, e.value)
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

        await sleep(25)
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

