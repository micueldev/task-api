import { ITask, TaskPriority } from 'src/modules/tasks/domain/task';

export class TaskResponseDto implements ITask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  isCompleted: boolean;
}
