<template lang="">
    <div @click="log()" :draggable="props.isStartNode || props.isEndNode" @dragstart="(e) => {dragStart(e)}" :data-isEndNode="props.isEndNode" :data-row="props.row" :data-isStartNode="props.isStartNode" :data-col="props.col" draggable="false" @dragend="(e) => { dragEndHandler(e) }" @dragover="(e) => { dragHandler(e) }" @mouseover="makeWallNode()" id="nodeId" ref="nodeElement" class="node" :class="{wall: props.isWallNode ,start: props.isStartNode, end: props.isEndNode}">
        <span v-if="props.weight > 1" class="weight">{{props.weight}}</span>       
         <div :class="{'animation-visited': props.isVisited, road: props.isRoadNode } "></div> 
         <img v-if="props.isStartNode" src="/in-love.svg"/>
         <img v-if="props.isEndNode" src="/cool.svg"/>
    </div>
</template>
<script setup lang="ts">
   import { ref,  onMounted } from "vue"
   const emit = defineEmits(['dragStartCustom','dragCustom', 'wall', 'dragendCustom'])
   const dragging = ref(true) 
   const nodeElement: any = ref(null)
   const newStartNode: any = ref()
   const nodeElementWithId: any = document.getElementById("nodeId")
   const props = defineProps<{
    heuristic: number,
    distance: number,
    isEndNode: boolean, isWallNode: boolean; isStartNode: boolean, isVisited: boolean, isRoadNode: boolean, weight: number, row: number, col: number}>() 

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
    * {
        user-select: none;
    }
    .node {
        box-shadow: 0px 0px 1px 0px rgb(123, 123, 123);
        box-shadow: 0px 0px 1px 0px rgb(123, 123, 123);
        box-shadow: 0px 0px 1px 0px rgb(123, 123, 123);
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
        border-radius: 100%;
        background-color: rgb(154, 225, 255);
        color: black;
        text-align: center;
        animation: wallAnimation 600ms ease-in;
        border: 1px solid black;
    }

    img {
        width: 100%;
        height: 100%;
    }

  
    .start {
    }

    .end {
    }

    .animation-visited {
        width: 100%;
        height: 100%;
        background-color: pink;
        z-index: -99;
        animation: visitedNode 600ms forwards ease-in;
    }

    .road {
        background-color: rgb(207, 207, 207);
       
        z-index: 100;
        width: 100%;
        height: 100%;
        animation: roadNode 500ms forwards ease-in;
    }
    .wall {
        background-color: rgb(35, 0, 52);
        animation: wallAnimation 600ms ease-in;

    }

    @keyframes wallAnimation {
       0% {
        transform: scale(0.5);
       }
       50% {
        transform: scale(1.3);
       } 

       100% {
        transform: scale(1);
       }
    }
    @keyframes visitedNode {
       0% {
        transform: scale(0.2);
        background-color: rgb(73, 0, 1);
        border-radius: 100%;
       }
        50% {
        border-radius: 50%;
        background-color: rgb(171, 22, 47);
        }
        80% {
            background-color: rgb(253, 180, 194);
            transform: scale(1.2); 
        }
        100% {
        background-color: rgb(209, 25, 255);
        border-radius: 0;
        transform: scale(1);
       }
    }
    @keyframes roadNode {
        0% {
           transform: scale(0) 
        }
        80% {
            transform: scale(1.25)

        }
        100% {
            transform: scale(1)
        }
    }
</style>