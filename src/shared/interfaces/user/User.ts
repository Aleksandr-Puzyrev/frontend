export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const USER_ROLES: Record<UserRoleEnum, string> = {
  [UserRoleEnum.ADMIN]: "Администратор",
  [UserRoleEnum.USER]: "Пользователь",
};

export interface IUser {
  id: number;
  email: string;
  password: string;
  banned: boolean;
  banReason: string;
}
