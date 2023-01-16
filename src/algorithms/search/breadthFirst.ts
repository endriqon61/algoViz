import sleep from "@/utils/sleep";
import type { Ref } from 'vue'
import type { INode } from '../../interfaces/Graph'
import { buildRoad, getAdjacentNodes } from "@/utils/graphUtils";


export default  async function bfs(s: Ref<number[]>, rows: Ref<number>, cols: Ref<number>, nodeList: Ref<INode[]>, e: Ref<number[]>)
{
    let queue=[];
    
    const root = s.value
    let index = cols.value*(s.value[0] - 1) + s.value[1] - 1 
    nodeList.value[index].isVisited = true
    queue.push(s.value);
    let endFound: boolean = false;     

    const predecessorList: Array<{node: string, predecessor: string}> = []

    while(queue.length>0)
    {
        if(endFound) {
            let u: string = [...e.value].join();
            const roadArray: string[] = []
            while(u != [...root].join()) {
                roadArray.push(u)
                const pred = predecessorList.find(el => el.node == u)
                console.log('predec')
                if(!pred) break
                u = pred.predecessor
            }
            await buildRoad(roadArray, nodeList, cols.value, sleep)
            return
        }
        await sleep(10)
        s.value = queue[0];
        queue.shift();
        let adj: Array<number[]> = getAdjacentNodes(s.value, rows.value, cols.value, nodeList.value)
        
        adj.forEach((adjacent) => {
            const adjIndex = cols.value*(adjacent[0] - 1) + adjacent[1] - 1
            predecessorList.push({node: [...adjacent].join(), predecessor: [...s.value].join()})
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

