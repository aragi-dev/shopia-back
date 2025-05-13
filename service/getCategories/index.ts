export { handler } from "./handler.js";

const functionConfig = {
    handler: "service/getCategories/handler.handler",
    timeout: 10,
    name: "category-list",
    awsName: "shopia-back-category-list",
    events: [
        {
            http: {
                path: "category/list",
                method: "get",
                cors: true,
            },
        },
    ],
};

export default functionConfig;
