import type UUID from '@/utilities/types/uuid';
import type { DataSource } from 'typeorm';
import ProductDiscount from '@/entitys/ProductDiscount';
import BaseRepository from '@/repository/base/BaseRepository';

class ProductDiscountRepository extends BaseRepository<ProductDiscount, UUID> {
  constructor(dataSource: DataSource) {
    super(ProductDiscount, dataSource);
  }
}

export default ProductDiscountRepository;
