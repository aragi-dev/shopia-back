import { Entity, Column } from "typeorm";
import DiscountType from "@/utilities/enums/DiscountType";
import BaseEntity from "@/entitys/base/BaseEntity";

@Entity({ schema: "sales", name: "discounts" })
class Discount extends BaseEntity {
	@Column("text", { nullable: true })
	description?: string;

	@Column({ type: "enum", enum: DiscountType })
	type!: DiscountType;

	@Column("numeric", { precision: 10, scale: 2 })
	amount!: number;
}

export default Discount;
