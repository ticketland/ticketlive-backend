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

// populado pela API
class AvailableTicket {
  id: string;
  event_id: string;
  allotment: string;
  section: string;
  // Relationships
}

export default AvailableTicket;
