import type Role from "@/utilities/enums/RoleEnum";

export default interface ICreateUserUseCase {
  name: string;
  email: string;
  password: string;
  role: Role;
}
