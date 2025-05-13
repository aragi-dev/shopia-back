import "reflect-metadata";
import { Container } from "inversify";
import CategoryRepository from "@/repository/CategoryRepository";
import { getDataSource } from "@/utilities/shopiaDB";
import { TYPES } from "@/utilities/types";
import Category from "@/entitys/Category";
import GetCategoriesUseCase from "@/usecase/getCategoriesUseCase";

const container = new Container();
container.bind(CategoryRepository).toDynamicValue(() => new CategoryRepository(getDataSource()));
container.bind(TYPES.Entities).toConstantValue([Category]);
container.bind(GetCategoriesUseCase).toSelf();

export default container;
