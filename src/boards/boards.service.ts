import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
    private boards: Board[] = []; //다른 컴포넌트에서 수정하는 것을 막기 위해 private

    getAllBoards(): Board[] {
        return this.boards;
    }
}
