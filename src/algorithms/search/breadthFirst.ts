import sleep from "@/utils/sleep";
import type { Ref } from 'vue'
import type { INode } from '../../interfaces/Graph'
import { buildRoad, getAdjacentNodes, buildRoadSync} from "@/utils/graphUtils";

export function bfsSync(s: number[], rows: number, cols: number, nodeList: INode[], e: number[]): number[][]
{
    let queue=[];
    
    const root = s
    let index = cols*(s[0] - 1) + s[1] - 1 
    nodeList[index].isVisited = true
    queue.push(s);
    let endFound: boolean = false;     

    const predecessorList: Array<{node: string, predecessor: string}> = []
    const nodesToChange: number[][] = []
    let currentNode = s;
    while(queue.length>0)
    {
        if(endFound) {
            console.log(predecessorList, "predList bfs")
            buildRoadSync(nodeList, cols, sleep, e, predecessorList, s)
            return nodesToChange
        }
        currentNode = queue[0];
        queue.shift();
        let adj: Array<number[]> = getAdjacentNodes(currentNode, rows, cols, nodeList)
        
        adj.forEach((adjacent) => {
            const adjIndex = cols*(adjacent[0] - 1) + adjacent[1] - 1
            predecessorList.push({node: [...adjacent].join(), predecessor: [...currentNode].join()})
            if(adjIndex < 0 || adjIndex > rows * cols - 1) return
            console.log(adjIndex)
            if(!nodeList[adjIndex].isVisited)
            {
                if(nodeList[adjIndex].isEndNode) {
                    endFound = true;
                    return; 
                }
                nodeList[adjIndex].isVisited=true;
                nodesToChange.push([nodeList[adjIndex].row, nodeList[adjIndex].col])
                queue.push(adjacent);
            }
        });
    }
    return nodesToChange

}



export default  async function bfs(s: Ref<number[]>, rows: Ref<number>, cols: Ref<number>, nodeList: Ref<INode[]>, e: Ref<number[]>, speed: Ref<number>)
{
    let queue=[];
    
    const root = s.value
    let index = cols.value*(s.value[0] - 1) + s.value[1] - 1 
    nodeList.value[index].isVisited = true
    queue.push(s.value);
    let endFound: boolean = false;     

    const predecessorList: Array<{node: string, predecessor: string}> = []
    let currentNode = s.value;
    while(queue.length>0)
    {
        if(endFound) {
            console.log(predecessorList, "predList bfs")
            await buildRoad(nodeList, cols.value, sleep, e.value, predecessorList, s.value)
            return
        }
        await sleep(300 - (speed.value * 52))
        currentNode = queue[0];
        queue.shift();
        let adj: Array<number[]> = getAdjacentNodes(currentNode, rows.value, cols.value, nodeList.value)
        
        adj.forEach((adjacent) => {
            const adjIndex = cols.value*(adjacent[0] - 1) + adjacent[1] - 1
            predecessorList.push({node: [...adjacent].join(), predecessor: [...currentNode].join()})
            if(adjIndex < 0 || adjIndex > rows.value * cols.value - 1) return
            console.log(adjIndex)
            if(!nodeList.value[adjIndex].isVisited)
            {
                if(nodeList.value[adjIndex].isEndNode) {
                    endFound = true;
                    return; 
                }
                nodeList.value[adjIndex].isVisited=true;
                queue.push(adjacent);
            }
        });
    }

}

