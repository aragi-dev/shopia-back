import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import type { DataSourceOptions, QueryRunner } from "typeorm";
import { DataSource } from "typeorm";

type EntitiesList = NonNullable<DataSourceOptions["entities"]>;

let dataSource: DataSource | undefined;
let currentEntities: EntitiesList | undefined;

export async function initializeConnection(entities: EntitiesList): Promise<DataSource> {
  if (!dataSource || currentEntities !== entities) {
    const options: DataSourceOptions = {
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities,
      synchronize: true,
    };

    dataSource = new DataSource(options);
    currentEntities = entities;
  }

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return dataSource;
}

export function getDataSource(): DataSource {
  if (!dataSource?.isInitialized) {
    throw new Error("Database not connected. Call initializeConnection() first.");
  }
  return dataSource;
}

export async function close(): Promise<void> {
  if (dataSource?.isInitialized) {
    await dataSource.destroy();
    dataSource = undefined;
    currentEntities = undefined;
  }
}

export async function openConnection(entities: EntitiesList): Promise<QueryRunner> {
  const ds = await initializeConnection(entities);
  const runner = ds.createQueryRunner();
  await runner.connect();
  return runner;
}

export async function closeConnection(runner: QueryRunner, shutdown = true): Promise<void> {
  await runner.release();
  if (shutdown) {
    await close();
  }
}
