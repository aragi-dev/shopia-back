import type UUID from '@/utilities/types/uuid';
import type { DataSource } from 'typeorm';
import SaleItem from '@/entitys/SaleItem';
import BaseRepository from '@/repository/base/BaseRepository';

class SaleItemRepository extends BaseRepository<SaleItem, UUID> {
  constructor(dataSource: DataSource) {
    super(SaleItem, dataSource);
  }
}

export default SaleItemRepository;