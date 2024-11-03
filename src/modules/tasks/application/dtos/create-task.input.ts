import { TaskPriority } from '../../domain/task';

export interface CreateTaskInput {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
}
