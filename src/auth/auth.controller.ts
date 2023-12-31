import { Controller, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDTO } from './dto/auth-credential.dto';
import { Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO): Promise<void> {
        return this.authService.signUp(authCredentialDTO);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDTO: AuthCredentialDTO): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDTO);
    }

    @Post('/authTest')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log('user', user);
    }
}
