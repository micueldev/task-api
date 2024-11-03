import { INestApplication } from '@nestjs/common';
import { Response } from 'supertest';
import { Method, requestApi } from './base-action';
import { Task, TaskPriority } from 'src/modules/tasks/domain/task';
import { TaskRepository } from 'src/modules/tasks/domain/task.repository';
import { TaskMother } from 'tests/unit/modules/tasks/domain/mothers/task.mother';
import { StringMother } from 'tests/unit/modules/shared/domain/mothers/string.mother';
import { TaskPriorityMother } from 'tests/unit/modules/tasks/domain/mothers/task-priority.mother';
import { UuidMother } from 'tests/unit/modules/shared/domain/mothers/uuid.mother';

export const createTaskModel = async (
  taskRepository: TaskRepository,
  {
    id = UuidMother.random(),
    title = StringMother.random(),
    description = StringMother.random(),
    priority = TaskPriorityMother.random(),
  }: {
    id?: string;
    title?: string;
    description?: string;
    priority?: TaskPriority;
  },
): Promise<Task> => {
  const task = TaskMother.create({
    id,
    title,
    description,
    priority
  });

  await taskRepository.createTask(task);

  return task;
};

export const getTask = (
  app: INestApplication,
  taskId: string,
): Promise<Response> => {
  return requestApi({
    app,
    method: Method.GET,
    path: `/tasks/${taskId}`,
  });
};
