<template>
    <div>
        <Row :find="find" :elements="elements"/>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import  Row  from "../components/BinarySearch/Row.vue";
const elements = reactive([1 ,1 ,2, 2, 3, 14, 16, 22, 24, 26, 36, 38])
elements.sort((a,b) => a - b)
const showRow = ref(false)
const find = ref(22)
</script>

<style lang="scss" scoped>

</style>