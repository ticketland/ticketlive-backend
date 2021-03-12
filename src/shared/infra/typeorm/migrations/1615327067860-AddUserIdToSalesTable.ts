import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToSalesTable1615327067860
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vendas',
      new TableColumn({
        name: 'usuario_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'transacoes',
      new TableForeignKey({
        name: 'VendasUsuarioFK',
        referencedTableName: 'usuarios',
        referencedColumnNames: ['id'],
        columnNames: ['usuario_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vendas', 'VendasUsuarioFK');
    await queryRunner.dropColumn('vendas', 'usuario_id');
  }
}
