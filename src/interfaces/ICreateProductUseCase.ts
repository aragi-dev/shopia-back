export default interface ICreateProductUseCase {
  code: string;
  name: string;
  description?: string;
  price: number;
  purchase_price: number;
  stock: number;
}
