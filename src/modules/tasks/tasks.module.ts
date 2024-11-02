import { Module } from '@nestjs/common';
import { TasksService } from './domain/tasks.service';

@Module({
  controllers: [],
  providers: [TasksService],
})
export class TasksModule {}
