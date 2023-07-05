import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service'; 

@Controller('boards')
export class BoardsController {
    constructor(private boardsService : BoardsService) {} // dependency injection
} // private -> 접근제한자를 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 클래스 프로퍼티로 선언이 된다.

// export class BoardsController {
//     boardsService: BoardsService;
//     constructor(boardsService : BoardsService) {
//         this.boardsService = boardsService;
//     } // dependency injection
// }
