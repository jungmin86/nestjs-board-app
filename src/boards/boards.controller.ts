import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, NotFoundException } from '@nestjs/common';
import { BoardsService } from './boards.service'; 
import { Board, BoardStatus } from './board.model';
import { CreateBoardDTO } from './dto/create-board.dto';

@Controller('boards') //localhost:3000/boards
export class BoardsController {
    constructor(private boardsService: BoardsService) {} 
    

    @Get() //localhost:3000/boards (이게 끝)
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDTO: CreateBoardDTO
    ): Board {
        return this.boardsService.createBoard(createBoardDTO);
    }
    
    @Get('/:id')
    getBoardById(
        @Param('id') id: string
    ): Board {
        const found = this.boardsService.getBoardById(id);
        if (!found) throw new NotFoundException("그런 글은 없다고 ~");
        return found;
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status') status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
    
} // private -> 접근제한자를 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 클래스 프로퍼티로 선언이 된다.
// dependency injection

// export class BoardsController {
//     boardsService: BoardsService; //선언부 (C++과 비슷)
//     constructor(boardsService : BoardsService) {
//         this.boardsService = boardsService;
//     } // dependency injection
// }
