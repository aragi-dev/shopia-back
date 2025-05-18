import { injectable } from "inversify";
import type IUseCase from "@/interfaces/IUseCase";
import type ICreateUserUseCase from "@/interfaces/ICreateUserUseCase";
import type ResponseUseCase from "@/utilities/adapter/responseUseCase";
import UserRepository from "@/repository/UserRepository";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import Logger from "@/utilities/logger/logger";
import LogUseCase from "@/utilities/logger/useCaseDecorator";
import bcrypt from "bcryptjs";
import User from "@/entitys/User";
import { openConnection, closeConnection } from "@/utilities/shopiaDB";

@injectable()
export default class CreateUserUseCase implements IUseCase<ICreateUserUseCase, ResponseUseCase<User>> {
  @LogUseCase
  async execute(data: ICreateUserUseCase): Promise<ResponseUseCase<User>> {
    const db = await openConnection([User]);
    try {
      const userRepository = new UserRepository(db.connection);
      const existing = await userRepository.findOneByParam({ email: data.email });
      if (existing) {
        Logger.warn(messages.log.DUPLICATE_ENTITY, existing);
        return {
          statusCode: statusCodes.BAD_REQUEST,
          data: existing,
          message: messages.api.EXIST,
        };
      }
      await db.startTransaction();
      const password_hash = await bcrypt.hash(data.password, 10);
      const user = await userRepository.create({
        name: data.name,
        email: data.email,
        password_hash,
        role: data.role,
        status: true,
      });
      Logger.info(messages.log.ENTITY_CREATED, user);
      await db.commitTransaction();
      return {
        statusCode: statusCodes.SUCCESS,
        data: user,
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
