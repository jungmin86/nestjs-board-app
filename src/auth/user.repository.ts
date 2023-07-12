import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDTO } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";
import { access } from "fs";



@Injectable()
export class UserRepository extends Repository<User> {

    constructor(
        private dataSource: DataSource,
        private jwtService: JwtService
        ) {
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

    async signIn(authCredentialDTO: AuthCredentialDTO): Promise<{accessToken: string}> {
        const {username, password} = authCredentialDTO;
        const user = await this.findOne({ where: {username} });

        if(user && (await bcrypt.compare(password, user.password))) {
            //유저 토큰 생성 (secret + Payload)
            const payload = { username }; //중요한 정보는 넣으면 안됨
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        } else {
            throw new UnauthorizedException("Login Failed");
        }
    }

}