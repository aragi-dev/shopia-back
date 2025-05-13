import type { DataSource, Repository } from "typeorm";
import User from "../entitys/User";
import BaseRepository from "./base/BaseRepository";
import LogRepository from "@/utilities/logger/repositoryDecorator";
import type UUID from "@/utilities/types/uuid";

export default class UserRepository extends BaseRepository<User> {
  private ormRepository: Repository<User>;

  constructor(dataSource: DataSource) {
    super();
    this.ormRepository = dataSource.getRepository(User);
  }

  @LogRepository
  async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  @LogRepository
  async findById(id: UUID): Promise<User | null> {
    return this.ormRepository.findOne({ where: { id } }) ?? null;
  }

  @LogRepository
  async create(data: Partial<User>): Promise<User> {
    const entity = this.ormRepository.create(data);
    return this.ormRepository.save(entity);
  }

  @LogRepository
  async update(id: UUID, data: Partial<User>): Promise<User | null> {
    await this.ormRepository.update(id, data);
    return this.findById(id);
  }

  @LogRepository
  async delete(id: UUID): Promise<boolean> {
    const result = await this.ormRepository.delete(id);
    return result.affected !== 0;
  }

  async findOneByParam(params: Partial<User>): Promise<User | null> {
    return this.ormRepository.findOne({ where: params }) ?? null;
  }
}
