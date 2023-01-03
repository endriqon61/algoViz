    import type { Ref } from "vue"
    import type { ICell } from "@/interfaces/Search";
    import sleep from "@/utils/sleep";

    export default async function startSearch(selected: Ref, start: Ref, end: Ref, list: Ref<Array<ICell>>, find: number): Promise<void> {

        selected.value = Number.POSITIVE_INFINITY
        let left = start.value;
        let right = end.value;

        //await sleep(0);
        while(left != right) {
            await sleep(750);

            const mid = Math.floor((right  + left)/2)
            if(list.value[mid].value > find) {
                right = mid 
                end.value = right
            } else if (list.value[mid].value < find) {
                left = mid
                start.value = left

            } else if (list.value[mid].value === find) {
                selected.value = find
                left = right
                end.value = mid
                start.value = mid
            } else {
                left = right
            } 
        }
    }