import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

// Configs
import uploadConfig from '@config/upload';

// Entitites
// import Entrance from '@modules/entrances/infra/entities/typeorm/Entrance';
// import Sale from '@modules/sales/infra/models/Sale';
import CashRegister from './CashRegister';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  // Serializers
  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }

  // Relationships
  // @OneToMany(() => Entrance, entrance => entrance.user)
  // entrance: Entrance[];

  // @OneToMany(() => Sale, venda => venda.user)
  // vendas: Sale[];

  @OneToMany(() => CashRegister, cashRegister => cashRegister.user)
  cash_registers: CashRegister[];
}

export default User;
