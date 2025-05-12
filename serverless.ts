import { endpoints } from './service/services';

export default {
  service: 'shopia-back',
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'us-east-1',
  },
  plugins: [
    'serverless-offline',
  ],
  functions: Object.fromEntries(
    endpoints.map(ep => [
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
    ])
  ),
};
