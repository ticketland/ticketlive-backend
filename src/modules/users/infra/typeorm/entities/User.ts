import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

// Configs
import uploadConfig from '@config/upload';

// Entitites
import Entrance from '@modules/entrance/infra/typeorm/entities/Entrance';
import Sale from '@modules/sales/infra/entities/typeorm/Sale';
import CashRegister from '@modules/cashregisters/infra/typeorm/entities/CashRegister';

@Entity('usuarios')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  @Exclude()
  senha: string;

  @Column()
  avatar: string;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updated_at: Date;

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
  @OneToMany(() => Entrance, entrance => entrance.user)
  entrance: Entrance[];

  @OneToMany(() => Sale, venda => venda.user)
  vendas: Sale[];

  @OneToMany(() => CashRegister, caixa => caixa.user)
  caixas: CashRegister[];
}

export default User;
