import type { DeepPartial } from "typeorm";
import type UUID from "@/utilities/types/uuid";

export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: UUID): Promise<T | null>;
  create(data: DeepPartial<T>): Promise<T>;
  update(id: UUID, data: DeepPartial<T>): Promise<T | null>;
  delete(id: UUID): Promise<boolean>;
}

export default abstract class BaseRepository<T> implements IBaseRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: UUID): Promise<T | null>;
  abstract create(data: DeepPartial<T>): Promise<T>;
  abstract update(id: UUID, data: DeepPartial<T>): Promise<T | null>;
  abstract delete(id: UUID): Promise<boolean>;
}
