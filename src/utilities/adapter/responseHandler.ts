// biome-ignore lint/suspicious/noExplicitAny: false
export default function response({ statusCode, message, data, errors }: { statusCode: number; message: string; data?: any; errors?: any }) {
  return {
    statusCode,
    body: JSON.stringify({ message, data, errors }),
  };
}
