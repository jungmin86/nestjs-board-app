import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDTO } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';



@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
      }

      async createUser(authCredentialDTO: AuthCredentialDTO): Promise<void> {
        const {username, password} = authCredentialDTO;
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ username, password: hashedPassword });
        try {
            await this.save(user);
        } catch(error) {
            console.log(error);
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }

        }
        
      }

}