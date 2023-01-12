import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./usersEntity";

@Entity("pets")
export class Pets {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  sex: string;

  @Column({ length: 50 })
  category: string;

  @Column({ length: 50 })
  breed: string;

  @Column({ length: 3 })
  age: string;

  @Column({ length: 300 })
  bio: string;

  @Column({ length: 200, nullable: true })
  avatar: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (users) => users.pets)
  user: Users;
};
