"use client";

import api from "@/api/api.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const useCourseCreateMutation = () => {
  const queryClient = useQueryClient();
  const request = async (body: Omit<ICourse, "id">) => {
    const { data } = await api.post<ICourse>("/courses", body);
    return data;
  };

  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Создание курса прошла успешно");
    },
    onError: (error: AxiosError<ApiErrorType>) =>
      toast.error(error.response?.data.message as string),
  });
};

export default useCourseCreateMutation;
