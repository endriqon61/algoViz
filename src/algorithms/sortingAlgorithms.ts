    import type { Ref } from 'vue'
    import sleep from '@/utils/sleep'
    import { swap } from '@/utils/sortingUtils';
    import { Howler, Howl } from 'howler'

    Howler.volume(0.1);
    export async function bubbleSort(elements: number[], currentDouble: number[]): Promise<void> {
        const successSound = new Howl({
            src: ['../../public/short_retro.mp3']
        })
        const copy = [...elements]
        copy.sort((a, b) => a - b)
        for(let i = 0; i < elements.length - 1; i++) {
            if(copy.join() === elements.join()) {
                currentDouble = []
                return
            }

            for(let j = 0; j < elements.length - i - 1; j++) {
                await sleep(5) 
                currentDouble[0] = j
                currentDouble[1] = j + 1
                if(elements[j] > elements[j + 1]){
                    swap(elements, j+1, j)
                    successSound.play();
                }
            }
        }
        currentDouble = [-1, -1]
    }

    export async function selectionSort(elements: number[], currentOne: number, currentDouble: number[]): Promise<void> {
        const copy = [...elements]
        copy.sort((a, b) => a - b)
        const successSound = new Howl({
            src: ['short_retro2.mp3']
        })

        const searchingSound = new Howl({
            src: ['short_retro3.mp3']
        })

        for(let i = 0; i < elements.length - 1; i++) {

            let currentMin = i;
            for(let j = i; j < elements.length; j++) {
                await sleep(30)
                searchingSound.play()
                currentOne = j
                if(elements[j] < elements[currentMin]) {
                    currentMin = j
                }
            }
            currentOne = -1
            currentDouble = [i, currentMin]
            await sleep(50)
            successSound.play()
            swap(elements, i, currentMin)
            currentDouble = []
        }
    }

    async function partition(arr: number[], low: number, high: number, currentDouble: number[], currentOne: number): Promise<number>{
        const pivot = arr[high]
        let i: number = low - 1
        for(let j = low; j < high; j++) {
            currentOne = j
            await sleep(5)
            if(arr[j] < pivot) {
                i++
                currentDouble = [i, j]
                swap(arr, i, j)
                console.log("swapping")
            }
        }
        currentDouble = [high, i + 1]
        swap(arr, high, i + 1)
        console.log("swapping pivot", arr)

        return (i + 1)
    }

    export async function quickSort(elements: number[], low: number, high: number, currentBetween: number[], currentDouble: number[], currentOne: number){
        currentBetween[0] = low
        currentBetween[1] = high
        if(low < high) {
            const pi = await partition(elements, low, high, currentDouble, currentOne)
            await quickSort(elements, low, pi - 1, currentBetween, currentDouble, currentOne)
            await quickSort(elements, pi + 1, high, currentBetween, currentDouble, currentOne)
        }
    }
        
