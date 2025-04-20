"use client";

import api from "@/api/api.config";
import { ICourse, IUpdateLesson } from "@/shared/interfaces/courses/Course";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface IRequest {
  moduleId: number;
  lessonId: number;
  query: ICourse;
}

const useAiCreateLessonMutation = () => {
  const request = async (body: IRequest) => {
    const { data } = await api.post<IUpdateLesson>("/ai/generate-lesson", {
      query: body.query,
      moduleId: body.moduleId,
      lessonId: body.lessonId,
    });
    return data;
  };

  return useMutation({
    mutationFn: request,
    onError: (error: AxiosError<ApiErrorType>) =>
      toast.error(error.response?.data.message as string),
  });
};

export default useAiCreateLessonMutation;
