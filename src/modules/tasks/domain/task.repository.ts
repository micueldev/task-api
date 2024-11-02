import { Task } from "./task";
import { TaskCriteria } from "./task-criteria";

export interface TaskRepository {
  searchOneTaskBy(criteria: TaskCriteria): Promise<Task | null>
  createTask(task: Task):Promise<void>;
  updateTask(task: Task):Promise<void>;
  deleteTask(taskId: string): Promise<void>;
}