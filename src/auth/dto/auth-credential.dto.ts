import { IsNotEmpty } from "class-validator";

export class AuthCredentialDTO {

    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
    
}