export { handler } from "./handler.js";

const functionConfig = {
  handler: "service/createUser/handler.handler",
  timeout: 10,
  name: "user-create",
  awsName: "shopia-back-user-create",
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
