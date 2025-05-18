import { Entity, Column } from "typeorm";
import BaseEntity from "./base/BaseEntity";
import numericTransformer from "@/utilities/adapter/numericTransformer";

@Entity("product")
export default class Product extends BaseEntity {
  @Column({ name: "code", type: "varchar", length: 50, unique: true, nullable: false })
  code!: string;

  @Column({ name: "name", type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column({ name: "description", type: "text", nullable: true })
  description?: string;

  @Column({ name: "purchase_price", type: "numeric", precision: 10, scale: 2, nullable: false, transformer: numericTransformer })
  cost!: number;

  @Column({ name: "price", type: "numeric", precision: 10, scale: 2, nullable: false, transformer: numericTransformer })
  price!: number;

  @Column({ name: "stock", type: "int", nullable: false })
  stock!: number;
}
