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

@Entity("comments")
export class Comments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  comment: string;

  @Column({ length: 200 })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (users) => users.comments)
  user_: Users; //Essa coluna não deve aparecer NUNCA, pq ela se refere ao usuário comentado e não ao que comentou. Ela está aqui apenas para podermos ter o array de comentários no user
};
