<template lang="">
    <div class="grid-container">
       <Node v-for="node in nodeList" :isStartNode="node.isStartNode" :isEndNode="node.isEndNode" :isVisited="node.isVisited"/>
    </div>
</template>
<script setup lang="ts">
    import Node from "./Node.vue"
    import type { INode } from "../../interfaces/Graph"
    import type { Ref } from "vue"
    import { ref } from "vue"
    
    const nodeList: Ref<Array<INode>> = ref([]);
    const startNode:  Ref<Array<number>> = ref([7, 3])
    const endNode: Ref<Array<number>> = ref([5, 10])
    const rows = ref(15);
    const cols = ref(20);

    for(let i = 0; i < rows.value; i++) {
        for(let j = 0; j < cols.value; j++) {
            if(i == startNode.value[0] - 1 && j == startNode.value[1] - 1) {
                nodeList.value.push({isVisited: false, isStartNode: true, isEndNode: false})
            }
            else if(i == endNode.value[0] - 1 && j == endNode.value[1] - 1) {
                nodeList.value.push({isVisited: false, isStartNode: false, isEndNode: true})
                console.log('yep')
            } else {
                nodeList.value.push({isVisited: false, isStartNode: false, isEndNode: false})
            }
        }
    }

</script>
<style scoped lang="scss">
    .grid-container {
        display: grid;
        width: 90vw;
        height: 90vh;
        grid-template-columns: repeat(20, auto);
        grid-template-rows: repeat(15, auto);
    } 

    
</style>