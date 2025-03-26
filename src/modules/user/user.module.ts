/**dependencies */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/authentication/auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { QueueMailModule } from '../queue-mail/queue-mail.module';
import { UserEntity } from './entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';
/**controllers */
/**services */
/**Authentication strategies */
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
    QueueMailModule,
    forwardRef(() => AuthModule),
    forwardRef(() => AdminModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
