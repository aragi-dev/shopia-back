import "reflect-metadata";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import errorLogger from "@middy/error-logger";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import container from "./inversify.config";
import type Product from "@/entitys/Product";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import response from "@/utilities/responseFormatter";
import Logger from "@/utilities/logger/logger";
import GetProductsByIdUseCase from "@/usecase/getProductsByIdUseCase";
import type IUseCase from "@/interfaces/IUseCase";
import type ResponseUseCase from "@/utilities/responseUseCase";
import type IGetProductUseCase from "@/interfaces/IGetProductUseCase";
import schema from "./schema";

const baseHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const parsed = schema.safeParse(event.pathParameters);
    if (!parsed.success) {
      Logger.error(messages.log.validation.VALIDATION_ERROR, parsed.error);
      return response({
        statusCode: statusCodes.BAD_REQUEST,
        message: messages.api.INVALID_INPUT,
        errors: parsed.error.errors,
      });
    }
    const useCase: IUseCase<IGetProductUseCase, ResponseUseCase<Product>> = container.get(GetProductsByIdUseCase);
    const result = await useCase.execute({ code: parsed.data.code });
    return response({
      statusCode: result.statusCode,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    Logger.error(messages.log.UNKNOWN_ERROR, error);
    return response({
      statusCode: statusCodes.INTERNAL_SERVER_ERROR,
      message: messages.api.SERVER_ERROR,
    });
  }
};

export const handler = middy(baseHandler).use(errorLogger()).use(httpErrorHandler());
