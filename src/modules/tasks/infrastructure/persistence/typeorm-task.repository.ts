import { Task } from '../../domain/task';
import { TaskCriteria } from '../../domain/task-criteria';
import { TaskRepository } from '../../domain/task.repository';

export class TypeOrmTaskRepository implements TaskRepository {
  searchOneTaskBy(criteria: TaskCriteria): Promise<Task | null> {
    throw new Error('Method not implemented.');
  }
  createTask(task: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateTask(task: Task): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteTask(taskId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
