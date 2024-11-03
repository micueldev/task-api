import { Task } from 'src/modules/tasks/domain/task';
import { TaskCriteria } from 'src/modules/tasks/domain/task-criteria';
import { TaskRepository } from 'src/modules/tasks/domain/task.repository';

export class MockTaskRepository implements TaskRepository {
  private mockSearchTasksBy = jest.fn();
  private mockSearchOneTaskBy = jest.fn();
  private mockCreateTask = jest.fn();
  private mockUpdateTask = jest.fn();
  private mockDeleteTask = jest.fn();
  private tasks: Task[];
  private task: Task;

  returnOnSearchTasksBy(tasks: Task[]) {
    this.tasks = tasks;
  }
  async searchTasksBy(criteria: TaskCriteria): Promise<Task[]> {
    this.mockSearchTasksBy(criteria);
    return this.tasks;
  }
  assertSearchTasksByHasBeenCalledWith(criteria: TaskCriteria) {
    expect(this.mockSearchTasksBy).toHaveBeenCalledWith(criteria);
  }

  returnOnSearchOneTaskBy(task: Task | null) {
    this.task = task;
  }
  async searchOneTaskBy(criteria: TaskCriteria): Promise<Task | null> {
    this.mockSearchOneTaskBy(criteria);
    return this.task;
  }
  assertSearchOneTaskByHasBeenCalledWith(criteria: TaskCriteria) {
    expect(this.mockSearchOneTaskBy).toHaveBeenCalledWith(criteria);
  }

  async createTask(task: Task): Promise<void> {
    this.mockCreateTask(task);
  }
  assertCreateTaskHasBeenCalledWith(task: Task) {
    expect(this.mockCreateTask).toHaveBeenCalledWith(task);
  }

  async updateTask(task: Task): Promise<void> {
    this.mockUpdateTask(task);
  }
  assertUpdateTaskHasBeenCalledWith(task: Task) {
    expect(this.mockUpdateTask).toHaveBeenCalledWith(task);
  }

  async deleteTask(taskId: string): Promise<void> {
    this.mockDeleteTask(taskId);
  }
  assertDeleteTaskHasBeenCalledWith(taskId: string) {
    expect(this.mockDeleteTask).toHaveBeenCalledWith(taskId);
  }
}
