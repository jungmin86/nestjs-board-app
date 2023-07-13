import { Repository, DataSource } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/user.entity";


@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
      }

    
    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.createQueryBuilder('board');
        query.where('board.userId = :userId', {userId: user.id});

        const boards = await query.getMany();
        return boards;

    }
    
    async createBoard(createBoardDTO: CreateBoardDTO, user: User): Promise<Board> {
        const {title, description} = createBoardDTO;
        
        const board = this.create({
                title,
                description,
                status: BoardStatus.PUBLIC,
                user
            });

        await this.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.findOne({ where: { id } });
      
        if (!found) throw new NotFoundException(`${id}에 해당하는 게시글이 없다.`);
      
        return found;
      }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.delete(id);
        if(result.affected === 0) throw new NotFoundException(`Can't find the board`);
        console.log('result', result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.save(board);
        return board;
    }

}