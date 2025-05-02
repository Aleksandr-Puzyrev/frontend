"use client";

import api from "@/api/api.config";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface IRequest {
  message: string;
  lessonId: string;
}

const useAiAssistantMutation = () => {
  const request = async (body: IRequest) => {
    const { data } = await api.post<IRequest>(`/ai/assistant`, body);
    return data;
  };

  return useMutation({
    mutationFn: request,
    onError: (error: AxiosError<ApiErrorType>) =>
      toast.error(error.response?.data.message as string),
  });
};

export default useAiAssistantMutation;
