"use client";

import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAbility } from "@/shared/providers/AbilityProvider";
import Routes from "@/shared/config/routes.config";
import { JwtType } from "@/shared/types/jwt.type";
import { DefaultRoleRoutes } from "@/shared/config/default-role-routes.config";
import { UserRoleEnum } from "@/shared/interfaces/user/User";

export default function Home() {
  const { token } = useAbility();

  if (!token) redirect(Routes.auth.login);
  else {
    const parsedJwt: JwtType = jwtDecode(token);
    redirect(DefaultRoleRoutes[parsedJwt.roles.length > 1 ? UserRoleEnum.ADMIN : UserRoleEnum.USER] || "");
  }
}
