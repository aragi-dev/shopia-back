export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/getProductsById/handler.handler",
  timeout: 10,
  name: "product-get",
  awsName: "shopia-back-product-get",
  events: [
    {
      http: {
        path: "product/{id}",
        method: "get",
        cors: true,
      },
    },
  ],
};

export default functionConfig;
