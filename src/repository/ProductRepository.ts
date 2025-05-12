import type UUID from '@/utilities/types/uuid';
import type { DataSource } from 'typeorm';
import Product from '@/entitys/Product';
import BaseRepository from '@/repository/base/BaseRepository';
import LogRepository from '@/utilities/logger/repositoryDecorator';

class ProductRepository extends BaseRepository<Product, UUID> {
  constructor(dataSource: DataSource) {
    super(Product, dataSource);
  }
  
  @LogRepository
  async softDeleteById(id: UUID): Promise<void> {
    await this.update({ id }, { active: false } as Partial<Product>);
  }
   
  @LogRepository
  async softDeleteByParam(param: Partial<Product>): Promise<number> {
    const result = await this.update(param, { active: false } as Partial<Product>);
    return result.affected || 0;
  }
}

export default ProductRepository;
