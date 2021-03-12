import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateReservation1615570984629
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'reservas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'reserva_id',
            type: 'uuid',
          },
          {
            name: 'usuario_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'waiting'",
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'ReservaUsuarioFK',
            referencedTableName: 'usuarios',
            referencedColumnNames: ['id'],
            columnNames: ['usuario_id'],
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reservas');
  }
}
