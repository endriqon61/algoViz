export function swap<T>(arr: T[], one: number, two: number){
    const temp = arr[one]
    arr[one] = arr[two]
    arr[two] = temp
}