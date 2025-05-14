export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/register/handler.handler",
  timeout: 10,
  name: "register",
  awsName: "shopia-back-register",
  events: [
    {
      http: {
        path: "/register",
        method: "post",
        cors: true,
      },
    },
  ],
};

export default functionConfig;
