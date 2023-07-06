import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; //다른 컴포넌트에서 수정하는 것을 막기 위해 private

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            // title: title,
            // description: description,
            id: uuid(), //DB에 등록할 때 유니크한 값 들어감 -> 일단은 uuid 모듈을 이용해서 유니크한 값을 사용
            title,
            description,
            status: BoardStatus.PUBLIC //기본값 : 공개글
        }

        this.boards.push(board);
        return board;
    }
}
