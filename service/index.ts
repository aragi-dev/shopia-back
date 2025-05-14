// Archivo generado automáticamente. No editar manualmente

export interface Endpoint {
  name: string;
  handler: string;
  path: string;
  method: string;
  cors?: boolean;
  timeout?: number;
}

export const services: Endpoint[] = [
  {
    "name": "user-create",
    "handler": "service/createUser/handler.handler",
    "path": "/register",
    "method": "post",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "product-create",
    "handler": "service/createProduct/handler.handler",
    "path": "product",
    "method": "post",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "auth-login",
    "handler": "service/auth/handler.handler",
    "path": "/login",
    "method": "post",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "product-get-list",
    "handler": "service/getProducts/handler.handler",
    "path": "product",
    "method": "get",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "product-get-by-id",
    "handler": "service/getProductsById/handler.handler",
    "path": "product/{id}",
    "method": "get",
    "cors": true,
    "timeout": 10
  }
];
