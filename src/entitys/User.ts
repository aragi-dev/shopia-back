import { Entity, Column, Unique } from "typeorm";
import BaseEntity from "./base/BaseEntity";

@Entity("user")
@Unique(["email"])
export default class User extends BaseEntity {
  @Column({ name: "name", type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ name: "password_hash", type: "text", nullable: false })
  password_hash!: string;

  @Column({ name: "role", type: "varchar", length: 20, nullable: false })
  role!: "admin" | "seller";

  @Column({ name: "email", type: "varchar", length: 255, unique: true, nullable: false })
  email!: string;
}
