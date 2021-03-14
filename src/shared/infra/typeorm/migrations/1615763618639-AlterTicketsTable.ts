import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTicketsTable1615763618639
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'ingressos',
      'evento_id',
      new TableColumn({
        name: 'evento_id',
        type: 'integer',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'ingressos',
      'evento_id',
      new TableColumn({
        name: 'evento_id',
        type: 'uuid',
      }),
    );
  }
}
