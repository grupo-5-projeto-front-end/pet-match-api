import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./addressesEntity";
import { Comments } from "./commentsEntity";
import { Pets } from "./petsEntity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 15 })
  phone: string;

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

  @OneToOne(() => Addresses, (addresses) => addresses.user)
  @JoinColumn()
  address: Addresses;

  @OneToMany(() => Pets, (pets) => pets.user)
  pets: Pets[];

  @OneToMany(() => Comments, (comments) => comments.user_)
  comments: Comments[];
};
