"use client";

import api from "@/api/api.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { useQuery } from "@tanstack/react-query";

const useCoursesOneQuery = (id: string) => {
  console.log("id", id)
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => api.get<ICourse>(`/courses/${id}`),
    retry: false,
    staleTime: 1000,
    select: (res) => res.data,
  });
};

export default useCoursesOneQuery;
