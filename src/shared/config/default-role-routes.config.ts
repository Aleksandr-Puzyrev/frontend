import { UserRoleEnum } from "../interfaces/user/User";
import Routes from "./routes.config";

export const DefaultRoleRoutes: Record<UserRoleEnum, string> = {
  [UserRoleEnum.ADMIN]: Routes.users.list,
  [UserRoleEnum.USER]: Routes.courses.list,
};
