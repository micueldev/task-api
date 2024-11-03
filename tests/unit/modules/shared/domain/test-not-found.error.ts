import { ObjectNotFoundError } from 'src/modules/shared/domain/error/object-not-found.error';

export class TestNotFoundError extends ObjectNotFoundError {
  protected readonly objectName = 'Test';
}
