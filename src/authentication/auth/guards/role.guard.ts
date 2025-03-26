import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'node:console';
import { Observable } from 'rxjs';
import { ErrorMessage, UserTypesEnum } from 'src/authentication/common/enum';
import { ROLES_KEY } from 'src/authentication/utils/decorators/roles.decorator';
import { decrypt } from 'src/helper/crypto.helper';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<UserTypesEnum[]>(ROLES_KEY, context.getHandler());

    if (!requiredRoles) {
      return true; // If no roles are defined for the route, allow access
    }
    const request = context.switchToHttp().getRequest();
    
    const user = request.user; // Assuming user is attached to request after authentication
    if (!(requiredRoles.some((role) => decrypt(user.hashType)?.includes(role)))) {
          throw new UnauthorizedException(ErrorMessage.UNAUTHORIZED);
        }
    return user;
  }
}
