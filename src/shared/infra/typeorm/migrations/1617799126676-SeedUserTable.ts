import { MigrationInterface, QueryRunner } from 'typeorm';

import BCryptHashProvider from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';

export class SeedUserTable1617799126676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const bcryptHashProvider = new BCryptHashProvider();
    const hashedPassword = await bcryptHashProvider.generateHash('senha12345');
    await queryRunner.query(`
      INSERT INTO users ("name", email, cpf, password)
      VALUES
       ('Usuário teste', 'teste@ticketlive.com', '00000000000', '${hashedPassword}');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users
      WHERE users.email = 'teste@ticketlive.com'
    `);
  }
}
