import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';

import { GqlAuth0ModuleOptions } from './interfaces'

@Injectable()
export class GqlAuth0JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('GRAPHQL_AUTH0_MODULE_OPTIONS') options: GqlAuth0ModuleOptions) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${options.issuer}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: options.audience,
      issuer: options.issuer,
    });
  }

  validate(payload: any, done: VerifiedCallback) {
    if (!payload) {
      done(new UnauthorizedException(), false);
    }

    return done(null, payload);
  }
}
