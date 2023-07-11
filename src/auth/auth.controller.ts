import { Controller, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO): Promise<void> {
        return this.authService.signUp(authCredentialDTO);
    }
}
