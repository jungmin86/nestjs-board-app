import { EntityRepository, Repository, DataSource } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Board } from "./board.entity";
import { CreateBoardDTO } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";


@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
    constructor(@InjectRepository(Board) private dataSource: DataSource) {
        super(Board, dataSource.createEntityManager())
    }
  
    async createBoard(createBoardDTO: CreateBoardDTO) : Promise<Board> {

        const { title, description } = createBoardDTO;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });

        await this.save(board)
        return board;
    }
}