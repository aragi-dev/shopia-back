import { injectable } from "inversify";
import type IUseCase from "@/interfaces/IUseCase";
import type ResponseUseCase from "@/utilities/responseUseCase";
import UserRepository from "@/repository/UserRepository";
import statusCodes from "@/utilities/statusCodes";
import messages from "@/utilities/messages";
import Logger from "@/utilities/logger/logger";
import LogUseCase from "@/utilities/logger/useCaseDecorator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import type { IAuthUseCaseResponse, IAuthUseCaseRequest } from "@/interfaces/IAuthUseCase";
import { closeConnection, openConnection } from "@/utilities/shopiaDB";
import User from "@/entitys/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

@injectable()
export default class AuthUseCase implements IUseCase<IAuthUseCaseRequest, ResponseUseCase<IAuthUseCaseResponse>> {
  @LogUseCase
  async execute(data: IAuthUseCaseRequest): Promise<ResponseUseCase<IAuthUseCaseResponse>> {
    const db = await openConnection([User]);
    try {
      const userRepository = new UserRepository(db.connection);
      const user = await userRepository.findOneByParam({ email: data.email });
      if (!user || !user.status) {
        Logger.warn(messages.log.UNKNOWN_ERROR, data.email);
        return {
          statusCode: statusCodes.UNAUTHORIZED,
          message: messages.api.validation.INVALID_EMAIL,
          data: undefined as unknown as IAuthUseCaseResponse,
        };
      }
      const match = await bcrypt.compare(data.password, user.password_hash);
      if (!match) {
        Logger.warn(messages.log.UNKNOWN_ERROR, data.email);
        return {
          statusCode: statusCodes.UNAUTHORIZED,
          message: messages.api.validation.NOT_MATCH,
          data: undefined as unknown as IAuthUseCaseResponse,
        };
      }
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
      return {
        statusCode: statusCodes.SUCCESS,
        message: messages.api.SUCCESS,
        data: {
          token,
          user: {
            id: user.id,
            name: user.name,
            role: user.role,
          },
        },
      };
    } catch (error) {
      Logger.error(messages.log.UNKNOWN_ERROR, error);
      throw new Error(messages.api.SERVER_ERROR);
    } finally {
      await closeConnection(db);
    }
  }
}
