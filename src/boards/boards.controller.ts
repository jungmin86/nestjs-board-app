import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { BoardsService } from './boards.service'; 
import { BoardStatus } from './board-status.enum';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards') //localhost:3000/boards
export class BoardsController {
    constructor(private boardsService: BoardsService) {} 
    

    // @Get() //localhost:3000/boards (이게 끝)
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDTO: CreateBoardDTO
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDTO);
    // }

    @Get() //localhost:3000/boards (이게 끝)
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDTO: CreateBoardDTO
    ): Promise<Board> {
        return this.boardsService.createBoard(createBoardDTO);
    }
    
    @Get('/:id')
    getBoardById(@Param('id') id: number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }

    // @Get('/:id')
    // getBoardById(
    //     @Param('id') id: string
    // ): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
    
} // private -> 접근제한자를 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 클래스 프로퍼티로 선언이 된다.
// dependency injection

// export class BoardsController {
//     boardsService: BoardsService; //선언부 (C++과 비슷)
//     constructor(boardsService : BoardsService) {
//         this.boardsService = boardsService;
//     } // dependency injection
// }
