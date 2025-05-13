export interface IAuthUseCaseRequest {
  email: string;
  password: string;
}

export interface IAuthUseCaseResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}
