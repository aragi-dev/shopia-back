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
import getProductsUseCase from "@/usecase/getProductsUseCase";
import type IUseCase from "@/interfaces/IUseCase";
import type ResponseUseCase from "@/utilities/responseUseCase";

const baseHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const useCase: IUseCase<void, ResponseUseCase<Product[]>> = container.get(getProductsUseCase);
    const result = await useCase.execute();
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
