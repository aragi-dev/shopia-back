interface ResponseUseCase<T> {
  statusCode: number;
  message: string;
  data: T;
}
export default ResponseUseCase;
