import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TaskPriority } from '../../domain/task';

@Entity({ name: 'task' })
export class TypeOrmTaskEntity {
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;


  @Column({
    type: 'text',
  })
  priority: TaskPriority;


  @Column({
    type: 'boolean',
    name: 'is_completed',
  })
  isCompleted: boolean;

  @Column({
    type: 'date',
    name: 'deleted_at',
    nullable: true,
    default: null,
  })
  deletedAt: Date | null;
}
