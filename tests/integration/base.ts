import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    autoLoadEntities: true,
    synchronize: true,
  }),
];