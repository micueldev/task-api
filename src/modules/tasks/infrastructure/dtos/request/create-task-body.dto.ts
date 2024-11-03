import { CreateTaskInput } from 'src/modules/tasks/application/dtos/create-task.input';
import { TaskPriority } from 'src/modules/tasks/domain/task';

export class CreateTaskBodyDto implements CreateTaskInput {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
}
