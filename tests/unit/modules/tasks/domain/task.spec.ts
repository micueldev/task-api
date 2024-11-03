import { Task } from 'src/modules/tasks/domain/task';
import { BooleanMother } from '../../shared/domain/mothers/boolean.mother';
import { DateMother } from '../../shared/domain/mothers/date.mother';
import { StringMother } from '../../shared/domain/mothers/string.mother';
import { UuidMother } from '../../shared/domain/mothers/uuid.mother';
import { TaskPriorityMother } from './mothers/task-priority.mother';
import { TaskMother } from './mothers/task.mother';

describe('Task test', () => {
  it('should be instantiated correctly', () => {
    const taskObject = {
      id: UuidMother.random(),
      title: StringMother.random(),
      description: StringMother.random(),
      priority: TaskPriorityMother.random(),
      isCompleted: BooleanMother.random(),
      deletedAt: DateMother.random(),
    };

    expect(Task.fromPrimitives({ ...taskObject }).toPrimitives()).toEqual(
      taskObject,
    );
  });

  it('should correctly return the getters functions', () => {
    const id = UuidMother.random();
    const title = StringMother.random();
    const description = StringMother.random();
    const priority = TaskPriorityMother.random();
    const isCompleted = BooleanMother.random();
    const deletedAt = DateMother.random();

    const task = TaskMother.create({
      id,
      title,
      description,
      priority,
      isCompleted,
      deletedAt,
    });
    expect(task.getId()).toEqual(id);
    expect(task.getTitle()).toEqual(title);
    expect(task.getDescription()).toEqual(description);
    expect(task.getPriority()).toEqual(priority);
    expect(task.getIsCompleted()).toEqual(isCompleted);
    expect(task.getDeletedAt()).toEqual(deletedAt);
  });

  it('should correctly execute the function updateValues', () => {
    const task = TaskMother.random();

    const newTitle = StringMother.random();
    const newDescription = StringMother.random();
    const newPriority = TaskPriorityMother.random();
    const newIsCompleted = BooleanMother.random();

    task.updateValues({
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      isCompleted: newIsCompleted,
    });

    expect(task.getTitle()).toEqual(newTitle);
    expect(task.getDescription()).toEqual(newDescription);
    expect(task.getPriority()).toEqual(newPriority);
    expect(task.getIsCompleted()).toEqual(newIsCompleted);
  });
});
