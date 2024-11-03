import { ObjectNotFoundError } from "src/modules/shared/domain/error/object-not-fpund.error";

export class TaskNotFoundError extends ObjectNotFoundError {
  protected readonly objectName = 'Task';
}
