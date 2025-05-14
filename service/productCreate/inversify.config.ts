import "reflect-metadata";
import { Container } from "inversify";
import ProductRepository from "@/repository/ProductRepository";
import { getDataSource } from "@/utilities/shopiaDB";
import CreateProductUseCase from "@/usecase/createProductUseCase";
import { TYPES } from "@/utilities/types";
import Product from "@/entitys/Product";

const container = new Container();
container.bind(ProductRepository).toDynamicValue(() => new ProductRepository(getDataSource()));
container.bind(CreateProductUseCase).toSelf();
container.bind(TYPES.Entities).toConstantValue([Product]);

export default container;
