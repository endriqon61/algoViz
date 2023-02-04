    import type { Ref } from 'vue'
    import sleep from '@/utils/sleep'
    import { swap } from '@/utils/sortingUtils';
    import { Howler, Howl } from 'howler'

    export async function bubbleSort(elements: Ref<number[]>, currentDouble: Ref<number[]>): Promise<void> {
        const swapSound = new Howl({
            src: ['../../public/short_retro.mp3']
        })
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
                    swapSound.play();
                }
            }
        }
        currentDouble.value = [-1, -1]
    }

    export async function selectionSort(elements: Ref<number[]>, currentOne: Ref<number>, currentDouble: Ref<number[]>): Promise<void> {
        const copy = [...elements.value]
        copy.sort((a, b) => a - b)
        const swapSound = new Howl({
            src: ['short_retro2.mp3']
        })

        const searchingSound = new Howl({
            src: ['short_retro3.mp3']
        })

        for(let i = 0; i < elements.value.length - 1; i++) {

            let currentMin = i;
            for(let j = i; j < elements.value.length; j++) {
                await sleep(30)
                searchingSound.play()
                currentOne.value = j
                if(elements.value[j] < elements.value[currentMin]) {
                    currentMin = j
                }
            }
            currentOne.value = -1
            currentDouble.value = [i, currentMin]
            await sleep(50)
            swapSound.play()
            swap(elements.value, i, currentMin)
            currentDouble.value = []
        }
    }

    async function partition(arr: Ref<number[]>, low: number, high: number, currentDouble: Ref<number[]>, currentOne: Ref<number>): Promise<number>{

        const searchingSound = new Howl({
            src: ['short_retro.mp3']
        })
        const swapSound = new Howl({
            src: ['short_retro2.mp3']
        })

        const pivot = arr.value[high]
        let i: number = low - 1
        for(let j = low; j < high; j++) {
            await sleep(1)
            currentOne.value = j
            searchingSound.volume(0.05)
            const s = searchingSound.play()
            searchingSound.rate(0.5, s)
            if(arr.value[j] < pivot) {
                i++
                currentDouble.value = [i, j]
                currentDouble.value = [-1, -1]
                swap(arr.value, i, j)
            }
        }
        currentDouble.value = [high, i + 1]
        swap(arr.value, high, i + 1)

        return (i + 1)
    }

    export async function quickSort(elements: Ref<number[]>, low: number, high: number, currentBetween: Ref<number[]>, currentDouble: Ref<number[]>, currentOne: Ref<number>){

        const healSound = new Howl({
            src: ['retro_heal.wav']
        })

        currentBetween.value[0] = low
        currentBetween.value[1] = high
        if(low < high) {
            await sleep(50)
            const pi = await partition(elements, low, high, currentDouble, currentOne)
            healSound.volume(15)
            const s = healSound.play();
            healSound.fade(0.5, 0, 400, s)
            healSound.rate(3, s)
            
            await quickSort(elements, low, pi - 1, currentBetween, currentDouble, currentOne)
            await quickSort(elements, pi + 1, high, currentBetween, currentDouble, currentOne)
        }

    }
        
