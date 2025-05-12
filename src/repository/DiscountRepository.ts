import type UUID from "@/utilities/types/uuid";
import type { DataSource } from "typeorm";
import Discount from "@/entitys/Discount";
import BaseRepository from "@/repository/base/BaseRepository";
import LogRepository from "@/utilities/logger/repositoryDecorator";

class DiscountRepository extends BaseRepository<Discount, UUID> {
	constructor(dataSource: DataSource) {
		super(Discount, dataSource);
	}

	@LogRepository
	async softDeleteById(id: UUID): Promise<void> {
		await this.update({ id }, { active: false } as Partial<Discount>);
	}

	@LogRepository
	async softDeleteByParam(param: Partial<Discount>): Promise<number> {
		const result = await this.update(param, { active: false } as Partial<Discount>);
		return result.affected || 0;
	}
}

export default DiscountRepository;
