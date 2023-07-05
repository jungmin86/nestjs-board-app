import { BoardStatus } from "./board.status"

export interface Board {
    id: string,
    titme: string,
    description: string,
    status: BoardStatus
}

