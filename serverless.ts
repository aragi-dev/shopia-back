import { services } from "./service/index";
import dotenv from "dotenv";

const stage = process.env.STAGE || "local";

dotenv.config({ path: `.env.${stage}` });

export default {
  service: "shopia-back",
  provider: {
    name: "aws",
    runtime: "nodejs20.x",
    region: "us-east-1",
    environment: {
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_NAME: process.env.DB_NAME,
    },
  },
  plugins: ["serverless-offline"],
  functions: Object.fromEntries(
    services.map((ep) => [
      ep.name,
      {
        handler: ep.handler,
        timeout: ep.timeout,
        events: [
          {
            http: {
              path: ep.path,
              method: ep.method,
              cors: ep.cors,
            },
          },
        ],
      },
    ]),
  ),
};
