import type { Ref } from 'vue'
import type { INode } from '@/interfaces/Graph';
import { getAdjacentNodes, buildRoad, generateIndex, buildRoadSync,findShortestDistanceNode } from '@/utils/graphUtils';
import  sleep  from '@/utils/sleep'

export const dijkstrasSync = (s: number[], rows: number, cols: number, graph: INode[], e: number[] ): number[][] => {
  graph[generateIndex(s, cols)].distance = 0
  const predecessorList: Array<{node: string, predecessor: string}> = []
  const nodesToChange = [];
  console.log("start dij", s, "end dij", e)
  for(const node in graph) {

    const shortestDistanceNode = graph[generateIndex(findShortestDistanceNode(graph, false), cols)]
    const adjacentNodes: Array<number[]> = getAdjacentNodes([shortestDistanceNode.row, shortestDistanceNode.col], rows, cols, graph) 
    shortestDistanceNode.isVisited = true 

    for(const adjNode in adjacentNodes) {
        predecessorList.push({node: [...adjacentNodes[adjNode]].join(), predecessor: [shortestDistanceNode.row, shortestDistanceNode.col].join()})
        const nodeInGraph = graph[generateIndex(adjacentNodes[adjNode], cols)]
        nodesToChange.push([nodeInGraph.row, nodeInGraph.col])

        if(nodeInGraph.isEndNode) {
          
              buildRoadSync(graph, cols, sleep, e, predecessorList, s)
              return nodesToChange
        }
        if(!nodeInGraph.isVisited) {
          nodeInGraph.distance = shortestDistanceNode.distance + nodeInGraph.weight
          // await sleep(10)
          // nodeInGraph.isVisited = true
        }
    }

    shortestDistanceNode.distance = Number.POSITIVE_INFINITY;
    
  }
  return nodesToChange



 
};


const dijkstras = async(s: Ref<number[]>, rows: number, cols: number, graph: Ref<INode[]>, e: Ref<number[]>, speed: Ref<number>) => {
  graph.value[generateIndex(s.value, cols)].distance = 0
  const predecessorList: Array<{node: string, predecessor: string}> = []

  for(const node in graph.value) {

    const shortestDistanceNode = graph.value[generateIndex(findShortestDistanceNode(graph.value, false), cols)]
    const adjacentNodes: Array<number[]> = getAdjacentNodes([shortestDistanceNode.row, shortestDistanceNode.col], rows, cols, graph.value) 
    await sleep(300 - (speed.value * 52))
    shortestDistanceNode.isVisited = true 
    for(const adjNode in adjacentNodes) {
        predecessorList.push({node: [...adjacentNodes[adjNode]].join(), predecessor: [shortestDistanceNode.row, shortestDistanceNode.col].join()})
        const nodeInGraph = graph.value[generateIndex(adjacentNodes[adjNode], cols)]
        if(nodeInGraph.isEndNode) {
          
              await buildRoad(graph, cols, sleep, e.value, predecessorList, s.value)
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