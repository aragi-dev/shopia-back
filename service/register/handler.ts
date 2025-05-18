import "reflect-metadata";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import errorLogger from "@middy/error-logger";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import container from "./inversify.config";
import CreateUserUseCase from "@/usecase/createUserUseCase";
import type IUseCase from "@/interfaces/IUseCase";
import type ICreateUserDTO from "@/interfaces/ICreateUserUseCase";
import type User from "@/entitys/User";
import schema from "./schema";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import type ResponseUseCase from "@/utilities/adapter/responseUseCase";
import response from "@/utilities/adapter/responseHandler";
import Logger from "@/utilities/logger/logger";

const baseHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const parsed = schema.safeParse(event.body);
    if (!parsed.success) {
      Logger.error(messages.log.validation.VALIDATION_ERROR, parsed.error);
      return response({
        statusCode: statusCodes.BAD_REQUEST,
        message: messages.api.INVALID_INPUT,
        errors: parsed.error.errors,
      });
    }
    const useCase: IUseCase<ICreateUserDTO, ResponseUseCase<User>> = container.get(CreateUserUseCase);
    const result = await useCase.execute(parsed.data);
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

export const handler = middy(baseHandler).use(jsonBodyParser()).use(errorLogger()).use(httpErrorHandler());
