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

  @Column({ nullable: true })
  validationKey: string;

  @Column({ default: 0 })
  wage: number;

  @Column({ default: false })
  isValid: boolean;

  @Column({ default: false })
  isWorking: boolean;

  @Column({ nullable: true })
  startTime: Date;

  @OneToMany(() => Records, (record) => record.user)
  records: Records[];
}
