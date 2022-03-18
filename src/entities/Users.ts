import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Records } from "./Records";

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  validationKey: string;

  @Column({ default: 0 })
  wage: number;

  @Column({ default: false })
  isValid: boolean;

  @OneToMany(() => Records, (record) => record.user)
  records: Records[];
}
