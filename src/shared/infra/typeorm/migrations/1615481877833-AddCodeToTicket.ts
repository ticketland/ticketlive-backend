import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCodeToTicket1615481877833
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ingressos',
      new TableColumn({
        name: 'codigo',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ingressos', 'codigo');
  }
}
