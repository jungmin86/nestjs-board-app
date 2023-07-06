import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; //다른 컴포넌트에서 수정하는 것을 막기 위해 private

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board = {
            // title: title,
            // description: description,
            title,
            description,
            status: BoardStatus.PUBLIC //기본값 : 공개글
        }
    }
}
