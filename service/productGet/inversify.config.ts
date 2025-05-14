import "reflect-metadata";
import { Container } from "inversify";
import ProductRepository from "@/repository/ProductRepository";
import { getDataSource } from "@/utilities/shopiaDB";
import { TYPES } from "@/utilities/types";
import Product from "@/entitys/Product";
import GetProductsByIdUseCase from "@/usecase/getProductsByIdUseCase";

const container = new Container();
container.bind(ProductRepository).toDynamicValue(() => new ProductRepository(getDataSource()));
container.bind(TYPES.Entities).toConstantValue([Product]);
container.bind(GetProductsByIdUseCase).toSelf();

export default container;
