import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Sale from "@/entitys/Sale";
import Product from "@/entitys/Product";
import ProductDiscount from "@/entitys/ProductDiscount";
import BaseEntity from "@/entitys/base/BaseEntity";

@Entity({ schema: "sales", name: "sale_items" })
class SaleItem extends BaseEntity {
	@ManyToOne(() => Sale, { onDelete: "CASCADE" })
	@JoinColumn({ name: "sale_id" })
	sale!: Sale;

	@ManyToOne(() => Product)
	@JoinColumn({ name: "product_id" })
	product!: Product;

	@Column("int")
	quantity!: number;

	@Column("numeric", { precision: 10, scale: 2 })
	unitPrice!: number;

	@ManyToOne(() => ProductDiscount, { nullable: true })
	@JoinColumn({ name: "pd_id" })
	productDiscount?: ProductDiscount;

	@Column("numeric", { precision: 10, scale: 2, default: 0 })
	discountAmount!: number;

	@Column("numeric", { precision: 12, scale: 2 })
	lineTotal!: number;
}

export default SaleItem;
