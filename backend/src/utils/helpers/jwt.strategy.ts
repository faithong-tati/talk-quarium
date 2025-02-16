import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environment } from 'src/common/constants';
import { UserDto } from 'src/common/dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Environment.JWT_SECRET(),
    });
  }

  validate(payload: { sub: string; username: string }): UserDto {
    return { userId: Number(payload.sub), username: payload.username };
  }
}
