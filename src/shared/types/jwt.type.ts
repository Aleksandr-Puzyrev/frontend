import { UserRoleEnum } from "../interfaces/user/User";

interface IRole {
  id: number;
  value: UserRoleEnum;
}

export type JwtType = {
  id: string;
  email: string;
  roles: IRole[];
  iat: number;
  exp: number;
};
