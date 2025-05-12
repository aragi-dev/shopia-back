import type UUID from '@/utilities/types/uuid';
import type { DataSource, EntityManager } from 'typeorm';
import Category from '@/entitys/Category';
import BaseRepository from '@/repository/base/BaseRepository';
import LogRepository from "@/utilities/logger/repositoryDecorator";

class CategoryRepository extends BaseRepository<Category, UUID> {
  constructor(managerOrDataSource: DataSource | EntityManager) {
    super(Category, managerOrDataSource);
  }

  @LogRepository
  async softDeleteById(id: UUID): Promise<void> {
    await this.update({ id }, { active: false } as Partial<Category>);
  }

  @LogRepository
  async softDeleteByParam(param: Partial<Category>): Promise<number> {
    const result = await this.update(param, { active: false } as Partial<Category>);
    return result.affected || 0;
  }
}

export default CategoryRepository;