import { PrimaryGeneratedColumn, CreateDateColumn, Column } from "typeorm";
import type UUID from "@/utilities/types/uuid";

export default abstract class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: UUID;

	@CreateDateColumn({ name: "created_at", type: "timestamptz" })
	createdAt!: Date;

	@Column("boolean", { default: true })
	active!: boolean;
}
