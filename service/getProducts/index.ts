export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/getProducts/handler.handler",
  timeout: 10,
  name: "product-get-list",
  awsName: "shopia-back-product-get-list",
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
