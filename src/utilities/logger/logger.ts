class Logger {
  static info(message: string, ...args: any[]) {
    console.info(`🔵 - [INFO] ${message}`, ...args);
  }

  static warn(message: string, ...args: any[]) {
    console.warn(`🟠 - [WARN] ${message}`, ...args);
  }

  static error(message: string, ...args: any[]) {
    console.error(`🔴 - [ERROR] ${message}`, ...args);
  }

  static critical(message: string, ...args: any[]) {
    console.error(`🟣 - [CRITICAL] ${message}`, ...args);
  }
}
export default Logger;
