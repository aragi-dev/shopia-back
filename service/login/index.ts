export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/login/handler.handler",
  timeout: 10,
  name: "login",
  awsName: "shopia-back-login",
  events: [
    {
      http: {
        path: "/login",
        method: "post",
        cors: true,
      },
    },
  ],
};

export default functionConfig;
