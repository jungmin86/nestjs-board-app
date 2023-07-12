import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234', //토큰이 유효한지 체크
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //토큰을 어디에서 가져오는지? (헤더)
        })
    }

    async validate(payload) {
        return this.userRepository.validate(payload);
    }
}