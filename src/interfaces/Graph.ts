export interface INode {
    isVisited: boolean
    isStartNode: boolean
    isEndNode: boolean
    isRoadNode: boolean
    isWallNode: boolean
    distance: number
    weight: number
    heuristic: number
    parent?: INode
    col: number
    row: number
}
