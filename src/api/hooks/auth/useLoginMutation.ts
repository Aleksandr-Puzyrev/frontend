"use client";

import TokenService from "@/api/services/token.service";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import api from "@/api/api.config";
import { ISignIn } from "@/shared/interfaces/auth/SignIn";
import { useAbility } from "@/shared/providers/AbilityProvider";
import { IToken } from "@/shared/types/auth/sign-in.type";

const useLoginMutation = (
  settings?: Omit<
    UseMutationOptions<IToken, AxiosError<ApiErrorType>, ISignIn>,
    "mutationFn" | "mutationKey" | "onSuccess"
  >
) => {
  const router = useRouter();
  const { updateAbilityToken } = useAbility();

  const request = async (body: ISignIn & { rememberMe: boolean }) => {
    const { data } = await api.post<IToken>("/auth/login", {
      email: body.email,
      password: body.password,
    });

    TokenService.setTokens(data, body.rememberMe);
    updateAbilityToken(data.token);

    return data;
  };

  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      window.dispatchEvent(new Event("authChange"));
      router.push("/");
    },
    ...settings,
  });
};

export default useLoginMutation;
