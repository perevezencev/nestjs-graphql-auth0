import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { GqlAuth0ModuleOptions } from './interfaces'
import { GqlAuth0JwtStrategy } from './gql-auth0-jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [GqlAuth0JwtStrategy],
  exports: [PassportModule],
})
export class GqlAuth0Module {
  static forRoot(options: GqlAuth0ModuleOptions): DynamicModule {
    return {
      module: GqlAuth0Module,
      providers: [{
        provide: 'OPTIONS',
        useValue: options,
      }]
    }
  }
}
