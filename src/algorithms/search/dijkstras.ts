import type { Ref } from 'vue'
import type { INode } from '@/interfaces/Graph';
import { getAdjacentNodes, buildRoad, generateIndex } from '@/utils/graphUtils';
import  sleep  from '@/utils/sleep'

const findShortestDistanceNode = (graph: Array<INode>): number[] => {
  let shortestDistanceNode = graph[0]

  for(const node in graph) {
      if(graph[node].distance < shortestDistanceNode.distance) {
         shortestDistanceNode = graph[node] 
      }
  }
  return [shortestDistanceNode.row, shortestDistanceNode.col]
};


const dijkstras = async(s: Ref<number[]>, rows: number, cols: number, graph: Ref<INode[]>, e: Ref<number[]>) => {
  graph.value[generateIndex(s.value, cols)].distance = 0
  const predecessorList: Array<{node: string, predecessor: string}> = []

  for(const node in graph.value) {

    const shortestDistanceNode = graph.value[generateIndex(findShortestDistanceNode(graph.value), cols)]
    const adjacentNodes: Array<number[]> = getAdjacentNodes([shortestDistanceNode.row, shortestDistanceNode.col], rows, cols, graph.value) 
    await sleep(1)
    shortestDistanceNode.isVisited = true 
    for(const adjNode in adjacentNodes) {
        predecessorList.push({node: [...adjacentNodes[adjNode]].join(), predecessor: [shortestDistanceNode.row, shortestDistanceNode.col].join()})
        const nodeInGraph = graph.value[generateIndex(adjacentNodes[adjNode], cols)]
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
        if(!nodeInGraph.isVisited) {
          nodeInGraph.distance = shortestDistanceNode.distance + nodeInGraph.weight
          // await sleep(10)
          // nodeInGraph.isVisited = true
        }
    }

    shortestDistanceNode.distance = Number.POSITIVE_INFINITY;
    
  }



 
};

export default dijkstras