export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/getProductsById/handler.handler",
  timeout: 10,
  name: "product-get-by-id",
  awsName: "shopia-back-product-get-by-id",
  events: [
    {
      http: {
        path: "products/{id}",
        method: "get",
        cors: true,
      },
    },
  ],
};

export default functionConfig;
