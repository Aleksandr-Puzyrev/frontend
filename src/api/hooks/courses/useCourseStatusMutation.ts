"use client";

import api from "@/api/api.config";
import { CourseStatusesType } from "@/shared/config/course-status.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface IBody {
  status: CourseStatusesType;
}

const useCourseStatusMutation = (id: number) => {
  const queryClient = useQueryClient();
  const request = async (body: IBody) => {
    const { data } = await api.put<ICourse>(`/courses/${id}/status`, body);
    return data;
  };

  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses", id] });
      toast.success("Статус изменен");
    },
    onError: (error: AxiosError<ApiErrorType>) =>
      toast.error(error.response?.data.message as string),
  });
};

export default useCourseStatusMutation;
