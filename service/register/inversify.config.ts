import "reflect-metadata";
import { Container } from "inversify";
import UserRepository from "@/repository/UserRepository";
import { getDataSource } from "@/utilities/shopiaDB";
import CreateUserUseCase from "@/usecase/createUserUseCase";
import { TYPES } from "@/utilities/types";
import User from "@/entitys/User";

const container = new Container();
container.bind(UserRepository).toDynamicValue(() => new UserRepository(getDataSource()));
container.bind(CreateUserUseCase).toSelf();
container.bind(TYPES.Entities).toConstantValue([User]);

export default container;
