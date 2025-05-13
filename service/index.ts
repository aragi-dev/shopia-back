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
    "name": "category-create",
    "handler": "service/createCategory/handler.handler",
    "path": "category/create",
    "method": "post",
    "cors": true,
    "timeout": 10
  },
  {
    "name": "category-list",
    "handler": "service/getCategories/handler.handler",
    "path": "category/list",
    "method": "get",
    "cors": true,
    "timeout": 10
  }
];
