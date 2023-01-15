<template lang="">
    <div @click="log()" :draggable="props.isStartNode || props.isEndNode" @dragstart="(e) => {dragStart(e)}" :data-isEndNode="props.isEndNode" :data-row="props.row" :data-isStartNode="props.isStartNode" :data-col="props.col" draggable="false" @dragend="(e) => { dragEndHandler(e) }" @dragover="(e) => { dragHandler(e) }" @mouseover="makeWallNode()" id="nodeId" ref="nodeElement" class="node" :class="{wall: props.isWallNode ,start: props.isStartNode, end: props.isEndNode}">
        <span v-if="props.weight > 1" class="weight">{{props.weight}}</span>       
         <div :class="{animation: props.isVisited, road: props.isRoadNode } "></div> 
    </div>
</template>
<script setup lang="ts">
   import { ref,  onMounted } from "vue"
   const emit = defineEmits(['dragStartCustom','dragCustom', 'wall', 'dragendCustom'])
   const dragging = ref(true) 
   const nodeElement: any = ref(null)
   const newStartNode: any = ref()
   const nodeElementWithId: any = document.getElementById("nodeId")
   const props = defineProps<{heuristic: number, distance: number, isEndNode: boolean, isWallNode: boolean; isStartNode: boolean, isVisited: boolean, isRoadNode: boolean, weight: number, row: number, col: number}>() 

   function log() {
    console.log("heurstic")
    console.log(props.heuristic)
    console.log('cords')
    console.log(props.row, props.col)
   }
   function dragEndHandler(e: Event) {
        dragging.value = false
        emit('dragendCustom', e.currentTarget)
   }
   function dragHandler(e: Event){
        emit("dragCustom", e.currentTarget)
   }

   function dragStart(e: any) {
        emit("dragStartCustom", e.currentTarget.dataset)
   }
    function makeWallNode() {
        // dragging.value = false
        emit('wall', props.row, props.col)
    }

    onMounted(() => {
    if (props.isStartNode || props.isEndNode) nodeElement.value.draggable = true

   })
   
</script>
<style scoped lang="scss">
    .node {
        box-shadow: 0px 0px 1px 0px rgba(68, 109, 79, 0.75);
        -webkit-box-shadow: 0px 0px 1px 0px rgba(50, 100, 64, 0.75);
        -moz-box-shadow: 0px 0px 1px 0px rgba(45, 126, 68, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
    } 

    .weight {
        position: absolute;
        font-family: 'Varela Round', sans-serif;
        font-weight: bold;
        width: 100%;
        height: 100%;
        text-align: center;
        border: 2px solid black;
    }

    .vis {
        background-color: blue;
    }
    .start {
        background-color: green;
    }

    .end {
        background-color: red;
    }

    .animation {
        width: 10px;
        height: 10px;
        background-color: pink;
        z-index: -99;
        animation: visitedNode 1s forwards ease-in;
    }

    .road {
        background-color: yellow;
        z-index: 100;
        width: 100%;
        height: 100%;
        animation: roadNode 500ms forwards ease-in;
    }
    .wall {
        background-color: black;
    }
    @keyframes visitedNode {
       0% {
        width: 13px;
        height: 13px;
        background-color: darkblue;
        border-radius: 100%;
       }
        50% {
        border-radius: 50%;
        background-color: blue;
        }
        80% {
            background-color: lightgreen;
        }
        100% {
        background-color: lightblue;
        border-radius: 0;
        width: calc(100% + 1px);
        height: calc(100% + 1px);

       }
    }
    @keyframes roadNode {
        0% {
        background-color: yellow;
           transform: scale(0) 
        }
        80% {
        background-color: yellow;
            transform: scale(1.25)

        }
        100% {
        background-color: yellow;
            transform: scale(1)
        }
    }
</style>