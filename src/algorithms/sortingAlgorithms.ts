import type { Ref } from 'vue'
import sleep from '@/utils/sleep'
import { swap } from '@/utils/sortingUtils';
import { Howler, Howl } from 'howler'

export default function sortingAlgorithms(elements: Ref<number[]>, currentDouble: Ref<number[]>, currentOne: Ref<number>, currentBetween: Ref<number[]>,  {retroSearch, healSound, retroSwap, retroJump}: any, volume: Ref<number>) {

      async function bubbleSort():  Promise<void> {
      
        const copy = [...elements.value]
        copy.sort((a, b) => a - b)
        for(let i = 0; i < elements.value.length - 1; i++) {
            if(copy.join() === elements.value.join()) {
                currentDouble.value = []
                return
            }

            for(let j = 0; j < elements.value.length - i - 1; j++) {
                await sleep(5) 
                currentDouble.value[0] = j
                currentDouble.value[1] = j + 1
                if(elements.value[j] > elements.value[j + 1]){
                    swap(elements.value, j+1, j)
                    retroSearch.volume(volume.value/50)                    
                    retroSearch.play()
                }
            }
            healSound.volume(volume.value/50)                    
            healSound.fade(1, 0, 500)
            healSound.rate(2)
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
                await sleep(30)
                retroSearch.volume(volume.value/50)
                retroSearch.play()

                currentOne.value = j
                if(elements.value[j] < elements.value[currentMin]) {
                    currentMin = j
                }
            }
            currentOne.value = -1
            currentDouble.value = [i, currentMin]
            await sleep(50)
            retroSwap.volume(volume.value*10)
            retroSwap.play()
            swap(elements.value, i, currentMin)
            currentDouble.value = []
        }
    }

    async function partition(low: number, high: number): Promise<number>{

     

        const pivot = elements.value[high]
        let i: number = low - 1
        for(let j = low; j < high; j++) {
            await sleep(1)
            currentOne.value = j
            retroSearch.volume(volume.value/50)
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
            healSound.volume(volume.value/50)
            healSound.fade(0.5, 0, 400)
            healSound.rate(3)
            healSound.play()
            
            await quickSort(low, pi - 1)
            await quickSort(pi + 1, high)
        }

    }

    async function mergeSort() {

    }


    return { mergeSort, quickSort, bubbleSort, selectionSort }
}
        
