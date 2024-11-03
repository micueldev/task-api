import { faker } from '@faker-js/faker';
import { IntegerMother } from './integer.mother';

export class BooleanMother {
  static random(): boolean {
    const value = IntegerMother.random({ min: 1, max: 2 });
    return !(value - 1);
  }
}
