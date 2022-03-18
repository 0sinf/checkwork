import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Records extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recordDate: Date;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @ManyToOne(() => Users, (user) => user.records)
  user: Users;
}
