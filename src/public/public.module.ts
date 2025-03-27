import { Module } from '@nestjs/common';
import { AdminModule } from 'src/modules/admin/admin.module';

@Module({
  controllers: [
  ],
  providers: [],
  imports: [ AdminModule],
})
export class PublicModule {}
