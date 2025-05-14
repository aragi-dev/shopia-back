export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/auth/handler.handler",
  timeout: 10,
  name: "auth-login",
  awsName: "shopia-back-auth-login",
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
