import { injectable } from "inversify";
import Category from "@/entitys/Category";
import CategoryRepository from "@/repository/CategoryRepository";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import type ResponseUseCase from "@/utilities/responseUseCase";
import { openConnection, closeConnection } from "@/utilities/shopiaDB";
import Logger from "@/utilities/logger/logger";
import LogUseCase from "@/utilities/logger/useCaseDecorator";
import type IUseCase from "@/interfaces/IUseCase";

@injectable()
export default class GetCategoriesUseCase implements IUseCase<void, ResponseUseCase<Category[]>> {
    @LogUseCase
    async execute(): Promise<ResponseUseCase<Category[]>> {
        const db = await openConnection([Category]);
        try {
            const categoryRepository = new CategoryRepository(db.manager);
            const categories = await categoryRepository.findAll();
            return {
                statusCode: statusCodes.SUCCESS,
                data: categories,
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
