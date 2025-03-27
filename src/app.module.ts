import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './authentication/auth/config/env.validation';
import { TypeOrmConfigModule, TypeOrmConfigService } from './authentication/auth/config/typeorm-config';
import { AuthenticationModule } from './authentication/authentication.module';
import { LoggerMiddleware } from './authentication/middleware';
import { AdminModule } from './modules/admin/admin.module';
import { QueueMailConsumer } from './modules/queue-mail/queue-mail.consumer';
import { UserModule } from './modules/user/user.module';
import { PublicModule } from './public/public.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
     /**initialize nest js config module */
     ConfigModule.forRoot({
      validate: validate,
      //responsible for use config values globally
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Adjust according to your output directory
    }),

      // Typeorm initialize
      TypeOrmModule.forRootAsync({
        imports: [TypeOrmConfigModule],
        inject: [ConfigService],
        // Use useFactory, useClass, or useExisting
        // to configure the ConnectionOptions.
        name: TypeOrmConfigService.connectionName,
        useExisting: TypeOrmConfigService,
        // connectionFactory receives the configured ConnectionOptions
        // and returns a Promise<Connection>.
        // dataSourceFactory: async (options) => {
        //   const connection = await createConnection(options);
        //   return connection;
        // },
      }),
     //module prefix for modules
     RouterModule.register([
      //module prefix for admin
      {
        path: 'admin',
        module: AdminModule,
      },
      {
        path: 'public',
        module: PublicModule,
      },
      
    ]),
    MulterModule.register({dest: './uploads', storage: './uploads'}),
   AuthenticationModule, AdminModule, UserModule, PublicModule],
  controllers: [AppController],
  providers: [AppService, QueueMailConsumer],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}