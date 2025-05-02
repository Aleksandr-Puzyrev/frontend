"use client";

import api from "@/api/api.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { ApiErrorType } from "@/shared/types/api.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface IUploadImage {
  file: File;
}

const useUploadCourseImageMutation = (id: number) => {
  const queryClient = useQueryClient();
  const request = async (body: IUploadImage) => {
    const formData = new FormData();
    formData.append("file", body.file);
    const { data } = await api.post<ICourse>(`/courses/${id}/image`, formData);
    return data;
  };

  return useMutation({
    mutationFn: request,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Изображение сохранено");
    },
    onError: (error: AxiosError<ApiErrorType>) =>
      toast.error(error.response?.data.message as string),
  });
};

export default useUploadCourseImageMutation;
