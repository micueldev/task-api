export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  isCompleted: boolean;
  deletedAt: Date | null;
}

export class Task {
  private id: string;
  private title: string;
  private description: string;
  private priority: TaskPriority;
  private isCompleted: boolean;
  private deletedAt: Date | null;

  constructor({
    id,
    title,
    description,
    priority,
    isCompleted,
    deletedAt,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.isCompleted = isCompleted;
    this.deletedAt = deletedAt;
  }

  toPrimitives(): ITask {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      isCompleted: this.isCompleted,
      deletedAt: this.deletedAt,
    };
  }

  static create({
    id,
    title,
    description,
    priority,
  }: {
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
  }): Task {
    return new Task({
      id,
      title,
      description,
      priority,
      isCompleted: false,
      deletedAt: null,
    });
  }

  static fromPrimitives({
    id,
    title,
    description,
    priority,
    isCompleted,
    deletedAt,
  }: ITask): Task {
    return new Task({
      id,
      title,
      description,
      priority,
      isCompleted,
      deletedAt,
    });
  }

  public getId(): string {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public getPriority(): TaskPriority {
    return this.priority;
  }
  public getIsCompleted(): boolean {
    return this.isCompleted;
  }
  public getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  public updateValues({
    title,
    description,
    priority,
    isCompleted,
  }: {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    isCompleted?: boolean;
  }) {
    this.title = title ?? this.title;
    this.description = description ?? this.description;
    this.priority = priority ?? this.priority;
    this.isCompleted = isCompleted ?? this.isCompleted;
  }
}
