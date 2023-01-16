import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./usersEntity";

@Entity("addresses")
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  state: string;

  @Column({ length: 200 })
  street: string;

  @Column({ length: 10, nullable: true })
  number: string;

  @Column({ length: 200 })
  zipCode: string;

  @OneToOne(() => Users, (users) => users.address)
  user: Users;
}
