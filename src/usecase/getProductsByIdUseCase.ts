import { injectable } from "inversify";
import Product from "@/entitys/Product";
import ProductRepository from "@/repository/ProductRepository";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import type ResponseUseCase from "@/utilities/adapter/responseUseCase";
import { openConnection, closeConnection } from "@/utilities/shopiaDB";
import Logger from "@/utilities/logger/logger";
import LogUseCase from "@/utilities/logger/useCaseDecorator";
import type IUseCase from "@/interfaces/IUseCase";
import type IGetProductUseCase from "@/interfaces/IGetProductUseCase";

@injectable()
export default class GetProductsByIdUseCase implements IUseCase<IGetProductUseCase, ResponseUseCase<Product>> {
  @LogUseCase
  async execute(data: IGetProductUseCase): Promise<ResponseUseCase<Product>> {
    const db = await openConnection([Product]);
    try {
      const productRepository = new ProductRepository(db.connection);
      const product = await productRepository.findByCode(data.code);
      if (!product) {
        return {
          statusCode: statusCodes.NOT_FOUND,
          data: {} as Product,
          message: messages.api.NOT_FOUND,
        };
      }
      return {
        statusCode: statusCodes.SUCCESS,
        data: product,
        message: messages.api.SUCCESS,
      };
    } catch (error) {
      Logger.error(messages.log.UNKNOWN_ERROR, error);
      throw new Error(messages.api.SERVER_ERROR);
    } finally {
      await closeConnection(db);
    }
  }
}
