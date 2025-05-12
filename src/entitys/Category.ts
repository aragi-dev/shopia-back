import { Entity, Column } from "typeorm";
import BaseEntity from "@/entitys/base/BaseEntity";

@Entity({ schema: "sales", name: "categories" })
class Category extends BaseEntity {
	@Column("text", { unique: true })
	name!: string;

	@Column("text", { nullable: true })
	description?: string;
}

export default Category;
