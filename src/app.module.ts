import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModule as AppConfigModule } from './config/config.module';
import { TasksModule } from './modules/tasks/infrastructure/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AppConfigModule,
    TasksModule
  ],
})
export class AppModule {}
