import { Module } from '@nestjs/common';
import { CreateTaskUseCase } from '../application/use-cases/create-task.use-case';
import { TASK_REPOSITORY_ALIAS } from '../domain/task.repository';
import { TypeOrmTaskRepository } from './persistence/typeorm-task.repository';
import { UpdateTaskUseCase } from '../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../application/use-cases/delete-task.use-case';
import { SearchTasksUseCase } from '../application/use-cases/search-tasks.use-case';
import { TasksController } from './controllers/tasks.controller';
import { FindTaskUseCase } from '../application/use-cases/find-task.use-case';

@Module({
  controllers: [TasksController],
  providers: [
    SearchTasksUseCase,
    FindTaskUseCase,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
    {
      provide: TASK_REPOSITORY_ALIAS,
      useClass: TypeOrmTaskRepository,
    },
  ],
})
export class TasksModule {}
