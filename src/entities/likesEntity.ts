import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pets } from "./petsEntity";
import { Users } from "./usersEntity";

@Entity("likes")
export class Likes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, (users) => users.likes)
  user: Users;

  @ManyToOne(() => Pets, (pets) => pets.likes)
  pet: Pets;
}
