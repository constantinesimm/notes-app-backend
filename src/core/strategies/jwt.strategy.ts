import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private cfgService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: cfgService.get('JWT_TOKEN_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    if (payload.exp < new Date().getTime() / 1000)
      throw new UnauthorizedException('Token expired');

    return {
      id: payload.id,
      email: payload.email,
    };
  }
}
