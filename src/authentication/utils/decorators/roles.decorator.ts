import { SetMetadata } from '@nestjs/common';
import { UserTypesEnum } from 'src/authentication/common/enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserTypesEnum[]) => SetMetadata(ROLES_KEY, roles);
