import { injectable } from "inversify";
import Category from "@/entitys/Category";
import type ICreateCategoryDTO from "@/interfaces/ICreateCategoryUseCase";
import type IUseCase from "@/interfaces/IUseCase";
import CategoryRepository from "@/repository/CategoryRepository";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import type ResponseUseCase from "@/utilities/responseUseCase";
import { openConnection, closeConnection } from "@/utilities/shopiaDB";
import Logger from "@/utilities/logger/logger";
import LogUseCase from "@/utilities/logger/useCaseDecorator";

@injectable()
export default class CreateCategoryUseCase implements IUseCase<ICreateCategoryDTO, ResponseUseCase<Category>> {
	@LogUseCase
	async execute(data: ICreateCategoryDTO): Promise<ResponseUseCase<Category>> {
		const db = await openConnection([Category]);
		try {
			const categoryRepository = new CategoryRepository(db.manager);
			const existing = await categoryRepository.findByParam({
				name: data.name,
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
			const category = await categoryRepository.createOne({ ...data });
			Logger.info(messages.log.ENTITY_CREATED, category);
			await db.commitTransaction();
			return {
				statusCode: statusCodes.SUCCESS,
				data: category,
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
