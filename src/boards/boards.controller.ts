import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service'; 
import { Board } from './board.model';

@Controller('boards') //localhost:3000/boards
export class BoardsController {
    constructor(private boardsService: BoardsService) {} 
    

    @Get('/') //localhost:3000/boards (이게 끝)
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }
    
} // private -> 접근제한자를 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 클래스 프로퍼티로 선언이 된다.
// dependency injection

// export class BoardsController {
//     boardsService: BoardsService; //선언부 (C+과 비슷)
//     constructor(boardsService : BoardsService) {
//         this.boardsService = boardsService;
//     } // dependency injection
// }
