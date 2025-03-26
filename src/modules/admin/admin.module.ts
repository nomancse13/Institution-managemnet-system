/**dependencies */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth/auth.module';
import { QueueMailModule } from '../queue-mail/queue-mail.module';
import { UserModule } from '../user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { SystemUserEntity } from './entities';
/**controllers */
/**Authentication strategies */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      SystemUserEntity,
    ]),
    QueueMailModule,
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    AdminController,
  ],
  providers: [
    AdminService,
  ],
  exports: [
    AdminService,
  ],
})
export class AdminModule {}
