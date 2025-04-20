"use client";

import api from "@/api/api.config";
import { IUpdateLesson } from "@/shared/interfaces/courses/Course";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

const useUpdateLessonMutation = (moduleId: number, lessonId: number) => {
  const queryClient = useQueryClient();
  const request = async (body: IUpdateLesson) => {
    const { data } = await api.put<IUpdateLesson>(`/courses/module/${moduleId}/lesson/${lessonId}`, body);
    return data;
  };

  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Урок сохранен");
    },
    onError: (error: AxiosError<ApiErrorType>) =>
      toast.error(error.response?.data.message as string),
  });
};

export default useUpdateLessonMutation;
