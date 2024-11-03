import { TypeOrmConverter } from "src/modules/shared/infrastructure/typeorm/typeorm-converter";
import { UuidMother } from "../../domain/mothers/uuid.mother";
import { TestCriteria } from "../../domain/test-criteria";
import { SelectQueryBuilder } from 'typeorm';

describe('TypeOrmConverter test', () => {
  const converter = new TypeOrmConverter();

  it('should test applyCriteriaFilters function with id or ids', async () => {
    const andWhereFn = jest.fn();
    const queryBuilder: Partial<SelectQueryBuilder<any>> = {
      andWhere: andWhereFn,
    };

    const id = UuidMother.random();
    const ids = [UuidMother.random(), UuidMother.random(), UuidMother.random()];

    let criteria = TestCriteria.createById(id);
    converter.applyCriteria(criteria, queryBuilder as SelectQueryBuilder<any>);
    expect(andWhereFn).toHaveBeenCalledTimes(1);
    expect(andWhereFn).toHaveBeenCalledWith(...['e.id = :id', { id }]);

    andWhereFn.mockClear();
    criteria = TestCriteria.createByIds(ids);
    converter.applyCriteria(criteria, queryBuilder as SelectQueryBuilder<any>);
    expect(andWhereFn).toHaveBeenCalledTimes(1);
    expect(andWhereFn).toHaveBeenCalledWith(...['e.id IN (:...ids)', { ids }]);
  });
});
