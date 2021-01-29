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

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: string;

  // owner = [client, instructor]
  @Column()
  @Exclude()
  owner: string;

  @Column()
  owner_id: string;

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
}

export default User;
