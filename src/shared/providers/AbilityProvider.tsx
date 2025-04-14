"use client";

import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AppAbility } from "../types/acl.type";
import { JwtType } from "../types/jwt.type";
import { defineAbilitiesFor } from "../config/acl.config";
import { UserRoleEnum } from "../interfaces/user/User";

interface IContext {
  ability: AppAbility;
  updateAbilityToken: (token: string) => void;
  token?: string;
}

const AbilityContext = createContext<IContext | null>(null);

interface IAbilityProvider extends React.PropsWithChildren {
  accessToken?: string;
}

export const AbilityProvider = ({ children, accessToken }: IAbilityProvider) => {
  const [token, setToken] = useState(accessToken);
  const ability = defineAbilitiesFor(token ? ((jwtDecode(token) as JwtType).roles.length > 1 ? UserRoleEnum.ADMIN : UserRoleEnum.USER) : "");

  const updateAbilityToken = (token: string) => {
    setToken(token);
  };

  return (
    <AbilityContext.Provider value={{ ability, updateAbilityToken, token }}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error("useAbility must be used within an AbilityProvider");
  }
  return context;
};
