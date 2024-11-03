import { TaskPriority } from 'src/modules/tasks/domain/task';
import { EnumMother } from 'tests/unit/modules/shared/domain/mothers/enum.mother';

export class TaskPriorityMother {
  static random(): TaskPriority {
    return EnumMother.random(TaskPriority);
  }
}
