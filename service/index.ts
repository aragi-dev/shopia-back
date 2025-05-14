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
    "name": "register",
    "handler": "service/register/handler.handler",
    "path": "/register",
    "method": "post",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "product-create",
    "handler": "service/productCreate/handler.handler",
    "path": "product",
    "method": "post",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "login",
    "handler": "service/login/handler.handler",
    "path": "/login",
    "method": "post",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "products-get",
    "handler": "service/productsGet/handler.handler",
    "path": "product",
    "method": "get",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "product-get",
    "handler": "service/productGet/handler.handler",
    "path": "product/{code}",
    "method": "get",
    "cors": true,
    "timeout": 10
  }
];
