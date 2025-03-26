import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppLoggerModule } from './logger/app-logger.module';

@Module({
  controllers: [],
  providers: [],
  imports: [TypeOrmModule.forFeature([]), AuthModule, AppLoggerModule],
  exports: [],
})
export class AuthenticationModule {}
