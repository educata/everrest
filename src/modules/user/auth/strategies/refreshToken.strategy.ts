import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        let refreshToken = req.headers['refresh_token'];
        if (refreshToken) {
          return refreshToken;
        }
        refreshToken = req.cookies['refresh_token'];
        if (refreshToken) {
          return refreshToken;
        }
        refreshToken = req.body.refresh_token;
        if (refreshToken) {
          return refreshToken;
        }
        return ExtractJwt.fromAuthHeaderAsBearerToken();
      },
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
      passReqToCallback: true,
    });
  }

  async validate(payload) {
    return { ...payload };
  }
}
