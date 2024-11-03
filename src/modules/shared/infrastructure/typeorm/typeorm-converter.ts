import { SelectQueryBuilder } from 'typeorm';
import { Criteria } from '../../domain/criteria';
import { CriteriaWithId } from '../../domain/criteria-with-id';

export class TypeOrmConverter {
  constructor() {}

  public applyCriteria<E>(
    criteria: Criteria,
    queryBuilder: SelectQueryBuilder<E>,
  ) {
    this.applyCriteriaFilters(criteria, queryBuilder);
  }

  private applyCriteriaFilters<E>(
    criteria: Criteria,
    queryBuilder: SelectQueryBuilder<E>,
  ) {
    if (criteria instanceof CriteriaWithId) {
      const id = criteria.getId();
      if (id) {
        queryBuilder.andWhere('e.id = :id', { id });
      }

      const ids = criteria.getIds();
      if (ids && ids.length) {
        queryBuilder.andWhere('e.id IN (:...ids)', { ids });
      }
    }
  }
}
