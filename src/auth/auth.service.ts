import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDTO } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {

    constructor(
        private userRepository: UserRepository,
    ) {}

    async signUp(authCredentialDTO: AuthCredentialDTO): Promise<void> {
        return this.userRepository.createUser(authCredentialDTO);
    }

    async signIn(authCredentialDTO: AuthCredentialDTO): Promise<string> {
        return this.userRepository.signIn(authCredentialDTO);
    }
}
