import sleep from "@/utils/sleep";
import type { Ref } from 'vue'
import type { INode } from '../../interfaces/Graph'

async function buildRoad(ra: string[], nl: Ref<INode[]>, cols: number) {
    await sleep(1000)
    for(let roadNode = 1; roadNode < ra.length; roadNode++) {
        await sleep(75)
        const cords = ra[roadNode].split(',')
        const index = cols*(parseInt(cords[0]) - 1) + parseInt(cords[1]) - 1  
        nl.value[index].isRoadNode = true
    }
}

function createAdjacencyList(node: Array<number>, rows: number, columns: number, nodeList: Ref<INode[]>): Array<number[]> {
    const arr: Array<number[]> = []
    const isWallNode = nodeList.value[columns*(node[0] - 1) + node[1] - 1].isWallNode
    if(!(node[0] == 1) && !isWallNode) arr.push([node[0] - 1, node[1]])
    if(!(node[1] == columns) && !isWallNode) arr.push([node[0], node[1] + 1])
    if(!(node[1] == rows) && !isWallNode) arr.push([node[0] + 1, node[1]])
    if(!(node[1] == 1) && !isWallNode) arr.push([node[0], node[1] - 1])

    return arr
}
export default  async function bfs(s: Ref<number[]>, rows: Ref<number>, cols: Ref<number>, nodeList: Ref<INode[]>, e: Ref<number[]>)
{
    // Mark all the vertices as not visited(By default
    // set as false)
     
    // Create a queue for BFS
    let queue=[];
    
    const root = s.value
    // Mark the current node as visited and enqueue it
    let index = cols.value*(s.value[0] - 1) + s.value[1] - 1 
    nodeList.value[index].isVisited = true
    queue.push(s.value);
    let endFound: boolean = false;     

    const predecessorList: Array<{node: string, predecessor: string}> = []

    while(queue.length>0)
    {
        console.log('going')
        // Dequeue a vertex from queue and print it
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
            await buildRoad(roadArray, nodeList, cols.value)
            return
        }
        await sleep(10)
        s.value = queue[0];
        // nodeList.value[cols.value*s[0] - 1 + s[1] - 1].isVisited=true;
        queue.shift();
        // start node is totalColnumber 
        // cols*y - 1 + x - 1
        let adj: Array<number[]> = createAdjacencyList(s.value, rows.value, cols.value, nodeList)
        
        // Get all adjacent vertices of the dequeued
        // vertex s. If a adjacent has not been visited,
        // then mark it visited and enqueue it
        adj.forEach((adjacent) => {
            // if((cols.value*(adjacent[0] - 1) + adjacent[1] - 1) < 0 || (cols.value*(adjacent[0] - 1) + adjacent[1] - 1) > 299 ) return; //this will be removed in future
            const adjIndex = cols.value*(adjacent[0] - 1) + adjacent[1] - 1
            predecessorList.push({node: [...adjacent].join(), predecessor: [...s.value].join()})
            if(adjIndex < 0 || adjIndex > rows.value * cols.value - 1) return
            console.log(adjIndex)
            if(!nodeList.value[adjIndex].isVisited)
            {
                if(nodeList.value[adjIndex].isEndNode == true) {
                    endFound = true;
                    return; 
                }
                nodeList.value[adjIndex].isVisited=true;
                queue.push(adjacent);
            }
        });
    }

}

