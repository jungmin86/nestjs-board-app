import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDTO } from "./dto/auth-credential.dto";

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
      }

      async createUser(authCredentialDTO: AuthCredentialDTO): Promise<void> {
        const {username, password} = authCredentialDTO;
        const user = this.create({ username, password });
        
        await this.save(user);
      }

}