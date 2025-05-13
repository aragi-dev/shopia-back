import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import BaseEntity from "./base/BaseEntity";
import Sale from "./Sale";
import Product from "./Product";

@Entity("sale_detail")
export default class SaleDetail extends BaseEntity {
  @Column({ name: "sale_id", type: "uuid", nullable: false })
  sale_id!: string;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: "sale_id" })
  sale!: Sale;

  @Column({ name: "product_id", type: "uuid", nullable: false })
  product_id!: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ name: "quantity", type: "int", nullable: false })
  quantity!: number;

  @Column({ name: "unit_price", type: "numeric", precision: 10, scale: 2, nullable: false })
  unit_price!: number;
}
