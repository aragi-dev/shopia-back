import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Discount from "@/entitys/Discount";
import Product from "@/entitys/Product";
import BaseEntity from "@/entitys/base/BaseEntity";

@Entity({ schema: "sales", name: "product_discounts" })
class ProductDiscount extends BaseEntity {
	@ManyToOne(() => Discount, { onDelete: "CASCADE" })
	@JoinColumn({ name: "discount_id" })
	discount!: Discount;

	@ManyToOne(() => Product, { onDelete: "CASCADE" })
	@JoinColumn({ name: "product_id" })
	product!: Product;

	@Column({ type: "date", nullable: true })
	validFrom?: string;

	@Column({ type: "date", nullable: true })
	validTo?: string;

	@Column({ type: "int", nullable: true })
	minQuantity?: number;
}

export default ProductDiscount;
