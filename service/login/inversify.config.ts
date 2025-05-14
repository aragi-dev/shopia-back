import "reflect-metadata";
import { Container } from "inversify";
import UserRepository from "@/repository/UserRepository";
import { getDataSource } from "@/utilities/shopiaDB";
import AuthUseCase from "@/usecase/authUseCase";
import { TYPES } from "@/utilities/types";
import User from "@/entitys/User";

const container = new Container();
container.bind(UserRepository).toDynamicValue(() => new UserRepository(getDataSource()));
container.bind(AuthUseCase).toSelf();
container.bind(TYPES.Entities).toConstantValue([User]);

export default container;
