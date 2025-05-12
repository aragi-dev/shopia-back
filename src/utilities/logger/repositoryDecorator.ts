import Logger from "@/utilities/logger/logger";

function LogRepository(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    Logger.info(`🚍 [REPO] Entering: ${propertyKey}`, ...args);
    try {
      const result = await originalMethod.apply(this, args);
      Logger.info(`🚍 [REPO] Return: ${propertyKey}`, result);
      return result;
    } catch (error) {
      Logger.error(`🚍 [REPO] Error in: ${propertyKey}`, error);
      throw error;
    }
  };
}

export default LogRepository;