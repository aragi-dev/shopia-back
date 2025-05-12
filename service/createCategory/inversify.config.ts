import "reflect-metadata";
import { Container } from "inversify";
import CategoryRepository from "@/repository/CategoryRepository";
import { getDataSource } from "@/utilities/shopiaDB";
import CreateCategoryUseCase from "@/usecase/createCategoryUseCase";
import { TYPES } from "@/utilities/types";
import Category from "@/entitys/Category";

const container = new Container();
container.bind(CategoryRepository).toDynamicValue(() => new CategoryRepository(getDataSource()));
container.bind(CreateCategoryUseCase).toSelf();
container.bind(TYPES.Entities).toConstantValue([Category]);

export default container;
