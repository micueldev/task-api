import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from '../application/use-cases/create-task.use-case';
import { TASK_REPOSITORY_ALIAS } from '../domain/task.repository';
import { TypeOrmTaskRepository } from './persistence/typeorm-task.repository';

@Module({
  controllers: [],
  providers: [
    CreateTaskUseCase,
    {
      provide: TASK_REPOSITORY_ALIAS,
      useClass: TypeOrmTaskRepository,
    },
  ],
})
export class TasksModule {}
