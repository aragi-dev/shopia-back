import "reflect-metadata";
import { Container } from "inversify";
import ProductRepository from "@/repository/ProductRepository";
import { getDataSource } from "@/utilities/shopiaDB";
import { TYPES } from "@/utilities/types";
import Product from "@/entitys/Product";
import GetProductsUseCase from "@/usecase/getProductsUseCase";

const container = new Container();
container.bind(ProductRepository).toDynamicValue(() => new ProductRepository(getDataSource()));
container.bind(TYPES.Entities).toConstantValue([Product]);
container.bind(GetProductsUseCase).toSelf();

export default container;
