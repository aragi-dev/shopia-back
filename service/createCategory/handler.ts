import "reflect-metadata";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import errorLogger from "@middy/error-logger";
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import container from "./inversify.config";
import CreateCategoryUseCase from "@/usecase/createCategoryUseCase";
import type IUseCase from "@/interfaces/IUseCase";
import type ICreateCategoryDTO from "@/interfaces/ICreateCategoryUseCase";
import type Category from "@/entitys/Category";
import createCategorySchema from "@/interfaces/schemas/createCategorySchema";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import type ResponseUseCase from "@/utilities/responseUseCase";
import response from "@/utilities/responseFormatter";
import Logger from "@/utilities/logger/logger";

const baseHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	try {
		const parsed = createCategorySchema.safeParse(event.body);
		if (!parsed.success) {
			Logger.error(messages.log.validation.VALIDATION_ERROR, parsed.error);
			return response({
				statusCode: statusCodes.BAD_REQUEST,
				message: messages.api.INVALID_INPUT,
				errors: parsed.error.errors,
			});
		}
		const useCase: IUseCase<ICreateCategoryDTO, ResponseUseCase<Category>> = container.get(CreateCategoryUseCase);
		const result = await useCase.execute(parsed.data);
		return response({
			statusCode: result.statusCode,
			message: result.message,
			data: result.data,
		});
	} catch (error) {
		return response({
			statusCode: statusCodes.INTERNAL_SERVER_ERROR,
			message: messages.api.SERVER_ERROR,
		});
	}
};

export const handler = middy(baseHandler).use(jsonBodyParser()).use(errorLogger()).use(httpErrorHandler());
