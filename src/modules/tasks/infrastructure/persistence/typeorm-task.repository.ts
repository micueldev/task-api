import { TypeOrmRepository } from 'src/modules/shared/infrastructure/typeorm/typeorm.repository';
import { Task } from '../../domain/task';
import { TaskCriteria } from '../../domain/task-criteria';
import { TaskRepository } from '../../domain/task.repository';
import { TypeOrmTaskEntity as TaskEntity } from './typeorm-task.entity';
import { DataSource, EntityTarget, SelectQueryBuilder } from 'typeorm';
import { TaskNotFoundError } from '../../domain/task-not-found.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmTaskRepository extends TypeOrmRepository<TaskEntity> implements TaskRepository {
  protected entity(): EntityTarget<TaskEntity> {
    return TaskEntity;
  }

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async searchTasksBy(criteria: TaskCriteria): Promise<Task[]> {
    const taskEntities = await this.createQueryBuilderByTaskCriteria(
      criteria,
    ).getMany();
    return taskEntities.map(
      (taskEntity) => Task.fromPrimitives({ ...taskEntity }),
    );
  }

  async searchOneTaskBy(criteria: TaskCriteria): Promise<Task | null> {
    const taskEntity =
      await this.createQueryBuilderByTaskCriteria(
        criteria,
      ).getOne();

    return taskEntity
      ? Task.fromPrimitives({ ...taskEntity })
      : null;
  }

  async createTask(task: Task): Promise<void> {
    await this.create(task.toPrimitives());
  }

  async updateTask(task: Task): Promise<void> {
    const affected = await this.update(
      task.getId(),
      task.toPrimitives(),
    );

    if (affected != 1) {
      throw new TaskNotFoundError();
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    const affected = await this.update(
      taskId,
      {
        deletedAt: new Date(),
      },
    );

    if (affected != 1) {
      throw new TaskNotFoundError();
    }
  }

  private createQueryBuilderByTaskCriteria(
    criteria: TaskCriteria,
  ): SelectQueryBuilder<TaskEntity> {
    const queryBuilder = this.createQueryBuilderByCriteria(criteria);
    queryBuilder.andWhere('e.deletedAt is null');
    return queryBuilder;
  }
}
