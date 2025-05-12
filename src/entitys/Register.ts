import { Entity, Column } from "typeorm";
import BaseEntity from "@/entitys/base/BaseEntity";

@Entity({ schema: "sales", name: "registers" })
class Register extends BaseEntity {
	@Column("text", { unique: true })
	name!: string;

	@Column("text", { nullable: true })
	location?: string;
}
export default Register;
