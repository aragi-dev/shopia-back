export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/productGet/handler.handler",
  timeout: 10,
  name: "product-get",
  awsName: "shopia-back-product-get",
  events: [
    {
      http: {
        path: "product/{code}",
        method: "get",
        cors: true,
      },
    },
  ],
};

export default functionConfig;
