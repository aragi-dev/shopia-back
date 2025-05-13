import type { DataSource, Repository } from "typeorm";
import SaleDetail from "../entitys/SaleDetail";
import BaseRepository from "./base/BaseRepository";
import LogRepository from "@/utilities/logger/repositoryDecorator";
import type UUID from "@/utilities/types/uuid";

export default class SaleDetailRepository extends BaseRepository<SaleDetail> {
  private ormRepository: Repository<SaleDetail>;

  constructor(dataSource: DataSource) {
    super();
    this.ormRepository = dataSource.getRepository(SaleDetail);
  }

  @LogRepository
  async findAll(): Promise<SaleDetail[]> {
    return this.ormRepository.find();
  }

  @LogRepository
  async findById(id: UUID): Promise<SaleDetail | null> {
    return this.ormRepository.findOne({ where: { id } }) ?? null;
  }

  @LogRepository
  async create(data: Partial<SaleDetail>): Promise<SaleDetail> {
    const entity = this.ormRepository.create(data);
    return this.ormRepository.save(entity);
  }

  @LogRepository
  async update(id: UUID, data: Partial<SaleDetail>): Promise<SaleDetail | null> {
    await this.ormRepository.update(id, data);
    return this.findById(id);
  }

  @LogRepository
  async delete(id: UUID): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return result.affected !== 0;
  }
}
