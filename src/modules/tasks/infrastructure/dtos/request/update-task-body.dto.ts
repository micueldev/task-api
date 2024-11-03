import { UpdateTaskInput } from 'src/modules/tasks/application/dtos/update-task.input';
import { TaskPriority } from 'src/modules/tasks/domain/task';

export class UpdateTaskBodyDto implements UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  priority?: TaskPriority;
  isCompleted?: boolean;
}
