export default interface IUseCase<T, U> {
  execute(input: T): Promise<U>;
}
