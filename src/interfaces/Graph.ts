export interface INode {
    isVisited: boolean
    isStartNode: boolean
    isEndNode: boolean
    isRoadNode: boolean
    isWallNode: boolean
    col: number
    row: number
}