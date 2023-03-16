import type { Ref } from 'vue'
import sleep from '@/utils/sleep'
import { swap } from '@/utils/sortingUtils';
import { Howler, Howl } from 'howler'

export default function sortingAlgorithms(elements: Ref<number[]>, currentDouble: Ref<number[]>, currentOne: Ref<number>, currentBetween: Ref<number[]>,  {retroSearch, healSound, retroSwap, retroJump}: any, volume: Ref<number>, speed: Ref<number>) {

      async function bubbleSort():  Promise<void> {
      
        const copy = [...elements.value]
        copy.sort((a, b) => a - b)
        for(let i = 0; i < elements.value.length - 1; i++) {
            if(copy.join() === elements.value.join()) {
                currentDouble.value = []
                return
            }

            for(let j = 0; j < elements.value.length - i - 1; j++) {
                await sleep(200 - (speed.value * 35)) 
                currentDouble.value[0] = j
                currentDouble.value[1] = j + 1
                if(elements.value[j] > elements.value[j + 1]){
                    swap(elements.value, j+1, j)
                    retroSearch.volume(volume.value/20)
                    retroSearch.fade(volume.value/20, 0, 300)
                    retroSearch.play()
                }
            }
            healSound.volume(volume.value/10)                    
            healSound.fade(volume.value/10, 0, 500)
            healSound.rate(3)
            healSound.play()
        }
        currentDouble.value = [-1, -1]
    }

    async function selectionSort(): Promise<void> {
        const copy = [...elements.value]
        copy.sort((a, b) => a - b)

        for(let i = 0; i < elements.value.length - 1; i++) {

            let currentMin = i;
            for(let j = i; j < elements.value.length; j++) {
                await sleep(200 - (speed.value * 35)) 

                retroSearch.volume(volume.value/20)
                retroSearch.play()

                currentOne.value = j
                if(elements.value[j] < elements.value[currentMin]) {
                    currentMin = j
                }
            }
            currentOne.value = -1
            currentDouble.value = [i, currentMin]

            await sleep(300 - (speed.value * 45)) 

            retroSwap.volume(volume.value/10)
            retroSwap.play()
            swap(elements.value, i, currentMin)
            currentDouble.value = []
        }
    }

    async function partition(low: number, high: number): Promise<number>{

     

        const pivot = elements.value[high]
        let i: number = low - 1
        for(let j = low; j < high; j++) {
            await sleep(100 - (speed.value * 20)) 
            currentOne.value = j
            retroSearch.volume(volume.value/20)
            retroSearch.rate(volume.value/30, 0, 100)
            retroSearch.play()
            if(elements.value[j] < pivot) {
                i++
                currentDouble.value = [i, j]
                currentDouble.value = [-1, -1]
                swap(elements.value, i, j)
            }
        }
        currentDouble.value = [high, i + 1]
        swap(elements.value, high, i + 1)

        return (i + 1)
    }

    async function quickSort(low: number, high: number){

      

        currentBetween.value[0] = low
        currentBetween.value[1] = high
        if(low < high) {
            await sleep(50)
            const pi = await partition(low , high)
            healSound.volume(volume.value/10)
            
            healSound.fade(volume.value/10, 0, 400, )
            healSound.rate(3)
            healSound.play()
            
            await quickSort(low, pi - 1)
            await quickSort(pi + 1, high)
        }

    }
    async function merge(left1: number, right1: number, left2: number, right2: number){

        currentBetween.value = [left1, right2]
        
        console.log("merging")

        healSound.volume(volume.value/20)
        healSound.play()
        healSound.rate(3)
        healSound.fade(volume.value/20, 0, 400)

        const tempArray: number[] = []

        const arr1: number[] = []
        const arr2: number[] = []

        const dif1 = right1 - left1
        const dif2 = right2 - left2

        let ai = 0
        let bi = 0

        for(let i = 0; i <= dif1; i++) {
            arr1.push(elements.value[left1 + i])             
        }
     
        for(let i = 0; i <= dif2; i++) {
            arr2.push(elements.value[left2 + i])             
        }

        console.log(arr1, arr2)

        while(arr1.length && arr2.length) {
            console.log("loopin")
            if(arr1[0] < arr2[0]) {
                tempArray.push(arr1[0])
                arr1.shift()
            }
            else {
                tempArray.push(arr2[0])
                arr2.shift()
            }
        }
        while(arr1.length) {
            tempArray.push(arr1[0])
            arr1.shift()
        }
        while(arr2.length) {
            tempArray.push(arr2[0])
            arr2.shift()
        }

        for(let i = 0; i < tempArray.length; i++) {
            currentDouble.value = [left1 + i, (i > dif2 ? -1 : left2 + i)]
            retroSearch.volume(volume.value/20)
            retroSearch.fade(volume.value/20, 0, 100)
            retroSearch.play()
            await sleep(100 - (speed.value * 20)) 
            elements.value[left1 + i] = tempArray[i]
        }
       
      
        return
    }

    async function mergeSort(left: number, right: number): Promise<void> {
        if(left >= right) return

        const mid = Math.floor((right+left)/2) 


        await mergeSort(left, mid)
        await mergeSort(mid + 1, right) 


        await merge(left, mid, mid + 1, right)
    }


    return { mergeSort, quickSort, bubbleSort, selectionSort }
}
        
