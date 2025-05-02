"use client";

import api from "@/api/api.config";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface IBody {
  userId: number;
  courseId: number;
}

const useAssignCourseMutation = () => {
  const queryClient = useQueryClient();
  const request = async (body: IBody) => {
    const { data } = await api.post<IBody>(`users/assign-course`, body);
    return data;
  };

  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Курс сохранен");
    },
    onError: (error: AxiosError<ApiErrorType>) =>
      toast.error(error.response?.data.message as string),
  });
};

export default useAssignCourseMutation;
