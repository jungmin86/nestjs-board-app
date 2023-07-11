import { Repository, DataSource } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { Injectable, NotFoundException } from "@nestjs/common";


@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
      }
    
    async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
        const {title, description} = createBoardDTO;
        
        const board = this.create({
                title,
                description,
                status: BoardStatus.PUBLIC
            });

        await this.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.findOne({ where: { id } });
      
        if (!found) throw new NotFoundException(`${id}에 해당하는 게시글이 없다.`);
      
        return found;
      }

}