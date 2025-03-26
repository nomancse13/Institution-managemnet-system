import { Module } from '@nestjs/common';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AdminModule } from 'src/modules/admin/admin.module';

@Module({
  controllers: [
  ],
  providers: [],
  imports: [ AdminModule, AuthenticationModule],
})
export class PublicModule {}
