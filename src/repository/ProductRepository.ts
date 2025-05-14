import type { DataSource, Repository } from "typeorm";
import Product from "../entitys/Product";
import BaseRepository from "./base/BaseRepository";
import LogRepository from "@/utilities/logger/repositoryDecorator";
import type UUID from "@/utilities/types/uuid";

export default class ProductRepository extends BaseRepository<Product> {
  private ormRepository: Repository<Product>;

  constructor(dataSource: DataSource) {
    super();
    this.ormRepository = dataSource.getRepository(Product);
  }

  @LogRepository
  async findAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  @LogRepository
  async findById(id: UUID): Promise<Product | null> {
    return this.ormRepository.findOne({ where: { id } }) ?? null;
  }

  @LogRepository
  async create(data: Partial<Product>): Promise<Product> {
    const entity = this.ormRepository.create(data);
    return this.ormRepository.save(entity);
  }

  @LogRepository
  async update(id: UUID, data: Partial<Product>): Promise<Product | null> {
    await this.ormRepository.update(id, data);
    return this.findById(id);
  }

  @LogRepository
  async delete(id: UUID): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return result.affected !== 0;
  }

  @LogRepository
  async findByParam(params: Partial<Product>): Promise<Product[]> {
    return this.ormRepository.find({ where: params });
  }

  @LogRepository
  async findByCode(code: string): Promise<Product | null> {
    return this.ormRepository.findOne({ where: { code } }) ?? null;
  }
}
