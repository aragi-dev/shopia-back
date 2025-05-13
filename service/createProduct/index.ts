export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/createProduct/handler.handler",
  timeout: 10,
  name: "product-create",
  awsName: "shopia-back-product-create",
  events: [
    {
      http: {
        path: "product/create",
        method: "post",
        cors: true,
      },
    },
  ],
};

export default functionConfig;
