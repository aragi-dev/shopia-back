import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import Category from "@/entitys/Category";
import BaseEntity from "@/entitys/base/BaseEntity";

@Entity({ schema: "sales", name: "products" })
class Product extends BaseEntity {
	@ManyToOne(() => Category)
	@JoinColumn({ name: "category_id" })
	category!: Category;

	@Column("text", { unique: true })
	sku!: string;

	@Column("text")
	name!: string;

	@Column("text", { nullable: true })
	description?: string;

	@Column("numeric", { precision: 10, scale: 2 })
	price!: number;

	@Column("numeric", { precision: 10, scale: 2 })
	cost!: number;
}

export default Product;
