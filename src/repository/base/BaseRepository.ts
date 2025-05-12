import type UUID from "@/utilities/types/uuid";
import type { DeepPartial, FindOptionsWhere, EntityManager } from "typeorm";
import { Repository, DataSource } from "typeorm";
import LogRepository from "@/utilities/logger/repositoryDecorator";

export default class BaseRepository<T extends { id: UUID }, ID extends UUID = UUID> extends Repository<T> {
	constructor(entity: { new (): T }, managerOrDataSource: DataSource | EntityManager) {
		const manager = managerOrDataSource instanceof DataSource ? managerOrDataSource.manager : managerOrDataSource;
		super(entity, manager);
	}

	private idWhere(id: ID): FindOptionsWhere<T> {
		return { id } as unknown as FindOptionsWhere<T>;
	}

	@LogRepository
	async createOne(data: DeepPartial<T>): Promise<T> {
		const entity = this.create(data);
		return this.save(entity);
	}

	@LogRepository
	async findAll(): Promise<T[]> {
		return this.find();
	}

	@LogRepository
	async findById(id: ID): Promise<T | null> {
		return this.findOneBy(this.idWhere(id));
	}

	@LogRepository
	async findByParam(param: FindOptionsWhere<T>): Promise<T[]> {
		return this.findBy(param);
	}

	@LogRepository
	async deleteById(id: ID): Promise<void> {
		await this.delete(this.idWhere(id));
	}

	@LogRepository
	async countByParam(param: FindOptionsWhere<T>): Promise<number> {
		return this.count({ where: param });
	}
}
