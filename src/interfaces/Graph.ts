export interface INode {
    isVisited: boolean
    isStartNode: boolean
    isEndNode: boolean
    isRoadNode: boolean
    isWallNode: boolean
    distance: number
    weight: number
    col: number
    row: number
}