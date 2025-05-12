const api = {
  SUCCESS: "Operation successful.",
  ERROR: "An error has occurred.",
  INVALID_INPUT: "Invalid input data.",
  NOT_FOUND: "Resource not found.",
  EXIST: "Resource already exists.",
  UNAUTHORIZED: "Unauthorized.",
  FORBIDDEN: "Forbidden.",
  BAD_REQUEST: "Bad request.",
  SERVER_ERROR: "Server error.",
  CREATED: "Resource created successfully.",
  UPDATED: "Resource updated successfully.",
  DELETED: "Resource deleted successfully.",
  NO_CONTENT: "No content.",
  CONFLICT: "Conflict with the current state of the resource.",
  NOT_ACCEPTABLE: "Not acceptable.",
  REQUEST_TIMEOUT: "Request timeout.",
  UNSUPPORTED_MEDIA_TYPE: "Unsupported media type.",
  UNPROCESSABLE_ENTITY: "Unprocessable entity.",
  TOO_MANY_REQUESTS: "Too many requests.",
  BAD_GATEWAY: "Bad gateway.",
  SERVICE_UNAVAILABLE: "Service unavailable.",
  GATEWAY_TIMEOUT: "Gateway timeout.",
};

const apiValidation = {
  INVALID_EMAIL: "Invalid email address.",
  INVALID_PASSWORD: "Invalid password format.",
  REQUIRED_FIELD: "A required field is missing.",
  INVALID_UUID: "Invalid UUID format.",
};

const apiAuth = {
  LOGIN_SUCCESS: "Login successful.",
  LOGIN_FAILED: "Login failed.",
  TOKEN_EXPIRED: "Token expired.",
  TOKEN_INVALID: "Invalid token.",
};

const apiResource = {
  CATEGORY_CREATED: "Category created successfully.",
  CATEGORY_EXISTS: "Category already exists.",
  PRODUCT_CREATED: "Product created successfully.",
};

export default {
  ...api,
  validation: apiValidation,
  auth: apiAuth,
  resource: apiResource,
};
