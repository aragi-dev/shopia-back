import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import Register from "@/entitys/Register";
import BaseEntity from "@/entitys/base/BaseEntity";

@Entity({ schema: "sales", name: "sales" })
class Sale extends BaseEntity {
	@ManyToOne(() => Register)
	@JoinColumn({ name: "register_id" })
	register!: Register;

	@CreateDateColumn({ name: "sale_timestamp", type: "timestamptz" })
	saleTimestamp!: Date;

	@Column("numeric", { precision: 12, scale: 2 })
	subtotal!: number;

	@Column("numeric", { precision: 12, scale: 2, default: 0 })
	discountTotal!: number;

	@Column("numeric", { precision: 12, scale: 2, default: 0 })
	taxTotal!: number;

	@Column("numeric", { precision: 12, scale: 2 })
	total!: number;
}
export default Sale;
