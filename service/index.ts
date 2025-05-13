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
    "name": "product-get-by-id",
    "handler": "service/getProductsById/handler.handler",
    "path": "products/{id}",
    "method": "get",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "product-get-list",
    "handler": "service/getProducts/handler.handler",
    "path": "products",
    "method": "get",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "product-create",
    "handler": "service/createProduct/handler.handler",
    "path": "product/create",
    "method": "post",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "auth-login",
    "handler": "service/auth/handler.handler",
    "path": "auth/login",
    "method": "post",
    "cors": true,
    "timeout": 10
  }
];
