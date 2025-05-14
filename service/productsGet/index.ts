export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/productsGet/handler.handler",
  timeout: 10,
  name: "products-get",
  awsName: "shopia-back-product-get",
  events: [
    {
      http: {
        path: "product",
        method: "get",
        cors: true,
      },
    },
  ],
};

export default functionConfig;
