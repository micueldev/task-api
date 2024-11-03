import { MigrationInterface, QueryRunner } from "typeorm";

export class NewTaskTable1730612435696 implements MigrationInterface {
    name = 'NewTaskTable1730612435696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` varchar(255) NOT NULL, \`title\` text NOT NULL, \`description\` text NOT NULL, \`priority\` text NOT NULL, \`is_completed\` tinyint NOT NULL, \`deleted_at\` date NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`task\``);
    }

}
