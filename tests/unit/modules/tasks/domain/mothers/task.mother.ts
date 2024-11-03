import { Task, TaskPriority } from 'src/modules/tasks/domain/task';
import { BooleanMother } from 'tests/unit/modules/shared/domain/mothers/boolean.mother';
import { DateMother } from 'tests/unit/modules/shared/domain/mothers/date.mother';
import { StringMother } from 'tests/unit/modules/shared/domain/mothers/string.mother';
import { UuidMother } from 'tests/unit/modules/shared/domain/mothers/uuid.mother';
import { TaskPriorityMother } from './task-priority.mother';

export class TaskMother {
  static create({
    id = UuidMother.random(),
    title = StringMother.random(),
    description = StringMother.random(),
    priority = TaskPriorityMother.random(),
    isCompleted = BooleanMother.random(),
    deletedAt = DateMother.random(),
  }: {
    id?: string;
    title?: string;
    description?: string;
    priority?: TaskPriority;
    isCompleted?: boolean;
    deletedAt?: Date | null;
  }): Task {
    return Task.fromPrimitives({
      id,
      title,
      description,
      priority,
      isCompleted,
      deletedAt,
    });
  }

  static random(): Task {
    return new Task({
      id: UuidMother.random(),
      title: StringMother.random(),
      description: StringMother.random(),
      priority: TaskPriorityMother.random(),
      isCompleted: BooleanMother.random(),
      deletedAt: DateMother.random(),
    });
  }
}
