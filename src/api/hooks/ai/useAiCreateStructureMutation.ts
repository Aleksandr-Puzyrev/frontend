"use client";

import api from "@/api/api.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface IRequest {
  topic: string;
}

const useAiCreateStructureMutation = () => {
  const request = async (body: IRequest) => {
    const { data } = await api.post<ICourse>("/ai/generate-structure", {
      topic: body.topic,
    });
    return data;
  };

  return useMutation({
    mutationFn: request,
    onError: (error: AxiosError<ApiErrorType>) =>
      toast.error(error.response?.data.message as string),
  });
};

export default useAiCreateStructureMutation;
