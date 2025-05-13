import { services } from "./service/index";

export default {
    service: "shopia-back",
    provider: {
        name: "aws",
        runtime: "nodejs20.x",
        region: "us-east-1",
    },
    plugins: ["serverless-offline"],
    functions: Object.fromEntries(
        services.map((ep) => [
            ep.name,
            {
                handler: ep.handler,
                timeout: ep.timeout,
                events: [
                    {
                        http: {
                            path: ep.path,
                            method: ep.method,
                            cors: ep.cors,
                        },
                    },
                ],
            },
        ]),
    ),
};
