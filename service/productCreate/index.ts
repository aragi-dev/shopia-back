export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/productCreate/handler.handler",
  timeout: 10,
  name: "product-create",
  awsName: "shopia-back-product-create",
  events: [
    {
      http: {
        path: "product",
        method: "post",
        cors: true,
      },
    },
  ],
};

export default functionConfig;
