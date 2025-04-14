import { IToken } from "../../shared/types/auth/sign-in.type";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export default class TokenService {
  static setTokens(tokens: IToken, saveExpires?: boolean) {
    const today = new Date();
    setCookie("token", tokens.token, {
      expires: saveExpires ? new Date(today.getTime()) : undefined,
    });
    setCookie("refresh", tokens.token, {
      expires: saveExpires ? new Date(today.getTime()) : undefined,
    });
  }

  static removeTokens() {
    deleteCookie("token");
    deleteCookie("refresh");
  }

  static isAuthorized(): boolean {
    const token = getCookie("token");
    return Boolean(token);
  }
}
