import type { Ref } from "vue"
import type { INode } from "@/interfaces/Graph"
export function buildRoadSync(nl: INode[], cols: number, sleep: (ms: number)=> Promise<void>, e: number[], predecessorList: any[], s: number[]) {
    console.log(s, "start", e, "end")
    console.log("start", predecessorList)
    let u: string = [...e].join();
                const roadArray: string[] = []
                while(u != [...s].join()) {
                    roadArray.push(u)
                    const pred = predecessorList.find(el => el.node == u)
                    console.log("pred", pred)
                    console.log('predec', u, pred.predecessor)
                    // if(!pred) {
                    //     console.log("wtfFFFFFFFFFFFFFFFFF") 
                    //     break
                    //   }
                    u = pred.predecessor
                }
                console.log("road Array: ", roadArray)
                roadArray.reverse()
    for(let roadNode = 0; roadNode < roadArray.length; roadNode++) {
        const cords = roadArray[roadNode].split(',')
        const index = cols*(parseInt(cords[0]) - 1) + parseInt(cords[1]) - 1  
        nl[index].isRoadNode = true
    }
}

export async function buildRoad(nl: Ref<INode[]>, cols: number, sleep: (ms: number)=> Promise<void>, e: number[], predecessorList: any[], s: number[]) {
    await sleep(1000)
    console.log(s, "start", e, "end")
    console.log("start", predecessorList)
    let u: string = [...e].join();
                const roadArray: string[] = []
                while(u != [...s].join()) {
                    roadArray.push(u)
                    const pred = predecessorList.find(el => el.node == u)
                    console.log("pred", pred)
                    console.log('predec', u, pred.predecessor)
                    // if(!pred) {
                    //     console.log("wtfFFFFFFFFFFFFFFFFF") 
                    //     break
                    //   }
                    u = pred.predecessor
                }
                console.log("road Array: ", roadArray)
                roadArray.reverse()
    for(let roadNode = 0; roadNode < roadArray.length; roadNode++) {
        await sleep(75)
        const cords = roadArray[roadNode].split(',')
        const index = cols*(parseInt(cords[0]) - 1) + parseInt(cords[1]) - 1  
        nl.value[index].isRoadNode = true
    }
}

export function generateIndex(cords: number[], cols: number): number {
  return cols*(cords[0] - 1) + cords[1] - 1
}

export const findShortestDistanceNode = (graph: Array<INode>, checkHeuristics: boolean, currentNode?: INode): number[] => {
  let shortestDistanceNode = graph[0]
  if(!checkHeuristics) {

    for(const node in graph) {
        if(graph[node].distance < shortestDistanceNode.distance) {
            shortestDistanceNode = graph[node] 
        }
    }

  } else {

    for(const node in graph) {
        if(graph[node].isVisited) continue
        if(graph[node].distance + graph[node].heuristic < shortestDistanceNode.distance + shortestDistanceNode.heuristic) {
            shortestDistanceNode = graph[node]
        }
    }

  }
  return [shortestDistanceNode.row, shortestDistanceNode.col]
};

export function getAdjacentNodes(node: Array<number>, rows: number, columns: number, graph: INode[]): Array<number[]> {
    const arr: Array<number[]> = []
  
    if(!(node[0] == 1)) arr.push([node[0] - 1, node[1]])
    if(!(node[1] == columns)) arr.push([node[0], node[1] + 1])
    if(!(node[0] == rows)) arr.push([node[0] + 1, node[1]])
    if(!(node[1] == 1)) arr.push([node[0], node[1] - 1])

    return arr.filter(el => !graph[generateIndex(el, columns)].isWallNode && !graph[generateIndex(el, columns)].isVisited)
}