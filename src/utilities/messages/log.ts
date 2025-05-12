const logGeneral = {
  REQUEST_RECEIVED: "Request received",
  REQUEST_COMPLETED: "Request completed",
  SERVER_START: "Server started",
  SERVER_STOP: "Server stopped",
  UNKNOWN_ERROR: "Unknown error occurred",
};

const logDatabase = {
  DATABASE_CONNECTION_OPEN: "Database connection opened",
  DATABASE_CONNECTION_CLOSE: "Database connection closed",
  DATABASE_CONNECTION_ERROR: "Database connection error",
};

const logEntity = {
  ENTITY_NOT_FOUND: "Entity not found",
  ENTITY_CREATED: "Entity created successfully",
  ENTITY_UPDATED: "Entity updated successfully",
  ENTITY_DELETED: "Entity deleted successfully",
  DUPLICATE_ENTITY: "Duplicate entity detected",
};

const logValidation = {
  VALIDATION_ERROR: "Validation error",
  VALIDATION_SUCCESS: "Validation success",
};

const logSecurity = {
  UNAUTHORIZED: "Unauthorized access attempt",
  FORBIDDEN: "Forbidden operation",
};

const logExternal = {
  EXTERNAL_API_CALL: "External API call",
  EXTERNAL_API_ERROR: "External API error",
};

const logUseCase = {
  USE_CASE_RESULT: "Use case result",
  EXECUTING_USE_CASE: "Executing use case",
  HANDLER_ERROR: "Error in handler",
};

export default {
  ...logGeneral,
  ...logDatabase,
  ...logEntity,
  ...logValidation,
  ...logSecurity,
  ...logExternal,
  ...logUseCase,
  general: logGeneral,
  database: logDatabase,
  entity: logEntity,
  validation: logValidation,
  security: logSecurity,
  external: logExternal,
  useCase: logUseCase,
};
