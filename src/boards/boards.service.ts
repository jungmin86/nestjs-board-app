import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards = []; //다른 컴포넌트에서 수정하는 것을 막기 위해 private

    getAllBoards() {
        return this.boards;
    }
}
