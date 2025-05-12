import type UUID from '@/utilities/types/uuid';
import type { DataSource } from 'typeorm';
import Sale from '@/entitys/Sale';
import BaseRepository from '@/repository/base/BaseRepository';

class SaleRepository extends BaseRepository<Sale, UUID> {
  constructor(dataSource: DataSource) {
    super(Sale, dataSource);
  }
}

export default SaleRepository;