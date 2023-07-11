import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-z0-9]*$/)
    password: string;

}