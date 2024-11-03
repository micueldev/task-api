import { ObjectNotFoundError } from 'src/modules/shared/domain/error/object-not-found.error';

export class TaskNotFoundError extends ObjectNotFoundError {
  protected readonly objectName = 'Task';
}
