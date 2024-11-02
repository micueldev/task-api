export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface Itask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  isCompleted: boolean;
  deletedAt: Date;
}

export class Task implements Itask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  isCompleted: boolean;
  deletedAt: Date;
}