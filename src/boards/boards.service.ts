import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository,
    ) {}



    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDTO: CreateBoardDTO) {
    //     const {title, description} = createBoardDTO;
    //     const board: Board = {
    //         // title: title,
    //         // description: description,
    //         id: uuid(), //DB에 등록할 때 유니크한 값 들어감 -> 일단은 uuid 모듈을 이용해서 유니크한 값을 사용
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC //기본값 : 공개글
    //     }
    //     this.boards.push(board);
    //     return board;
    // }

    async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
        const {title, description} = createBoardDTO;
        
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });

        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { id } });
      
        if (!found) throw new NotFoundException(`${id}에 해당하는 게시글이 없다.`);
      
        return found;
      }
      

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //     if (!found) throw new NotFoundException("xx");

    //     return found;
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);

    //     this.boards = this.boards.filter((board) => board.id !== found.id); //id가 다른 것만 다 남김 
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
