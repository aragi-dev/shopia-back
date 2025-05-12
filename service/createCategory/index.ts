export { handler } from "./handler.js";

const functionConfig = {
	handler: "service/createCategory/handler.handler",
	timeout: 10,
	name: "category-create",
	awsName: "shopia-back-product-create",
	events: [
		{
			http: {
				path: "category/create",
				method: "post",
				cors: true,
			},
		},
	],
};

export default functionConfig;
