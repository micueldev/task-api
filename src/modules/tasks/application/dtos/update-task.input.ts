import { TaskPriority } from '../../domain/task';

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  priority?: TaskPriority;
  isCompleted?: boolean;
}
