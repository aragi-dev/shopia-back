import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import BaseEntity from "./base/BaseEntity";
import User from "./User";

@Entity("sale")
export default class Sale extends BaseEntity {
  @Column({ name: "user_id", type: "uuid", nullable: false })
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ name: "total", type: "numeric", precision: 10, scale: 2, nullable: false })
  total!: number;

  @Column({ name: "status", type: "boolean", default: true, nullable: false })
  status!: boolean;
}
