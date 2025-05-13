import { injectable } from "inversify";
import Product from "@/entitys/Product";
import type IUseCase from "@/interfaces/IUseCase";
import ProductRepository from "@/repository/ProductRepository";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import type ResponseUseCase from "@/utilities/responseUseCase";
import { openConnection, closeConnection } from "@/utilities/shopiaDB";
import Logger from "@/utilities/logger/logger";
import LogUseCase from "@/utilities/logger/useCaseDecorator";
import type ICreateProductUseCase from "@/interfaces/ICreateProductUseCase";

@injectable()
export default class CreateProductUseCase implements IUseCase<ICreateProductUseCase, ResponseUseCase<Product>> {
  @LogUseCase
  async execute(data: ICreateProductUseCase): Promise<ResponseUseCase<Product>> {
    const db = await openConnection([Product]);
    try {
      const productRepository = new ProductRepository(db.connection);
      const existing = await productRepository.findByParam({
        name: data.name,
        status: true,
      });
      if (existing.length > 0) {
        Logger.warn(messages.log.DUPLICATE_ENTITY, existing[0]);
        return {
          statusCode: statusCodes.BAD_REQUEST,
          data: existing[0],
          message: messages.api.EXIST,
        };
      }
      await db.startTransaction();
      const product = await productRepository.create({ ...data });
      Logger.info(messages.log.ENTITY_CREATED, product);
      await db.commitTransaction();
      return {
        statusCode: statusCodes.SUCCESS,
        data: product,
        message: messages.api.SUCCESS,
      };
    } catch (error) {
      Logger.error(messages.log.UNKNOWN_ERROR, error);
      await db.rollbackTransaction();
      throw new Error(messages.api.SERVER_ERROR);
    } finally {
      await closeConnection(db);
    }
  }
}
