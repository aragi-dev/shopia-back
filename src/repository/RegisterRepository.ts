import type UUID from '@/utilities/types/uuid';
import type { DataSource } from 'typeorm';
import Register from '@/entitys/Register';
import BaseRepository from '@/repository/base/BaseRepository';
import LogRepository from '@/utilities/logger/repositoryDecorator';

class RegisterRepository extends BaseRepository<Register, UUID> {
  constructor(dataSource: DataSource) {
    super(Register, dataSource);
  }

  @LogRepository
  async softDeleteById(id: UUID): Promise<void> {
    await this.update({ id }, { active: false } as Partial<Register>);
  }
  
  @LogRepository
  async softDeleteByParam(param: Partial<Register>): Promise<number> {
    const result = await this.update(param, { active: false } as Partial<Register>);
    return result.affected || 0;
  }
}

export default RegisterRepository;