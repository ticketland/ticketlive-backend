import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIDToTransactionTable1612803784340
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transacoes',
      new TableColumn({
        name: 'usuario_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'transacoes',
      new TableForeignKey({
        name: 'TransacoesUsuarioFK',
        referencedTableName: 'usuarios',
        referencedColumnNames: ['id'],
        columnNames: ['usuario_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transacoes', 'TransacoesUsuarioFK');
    await queryRunner.dropColumn('transacoes', 'usuario_id');
  }
}
