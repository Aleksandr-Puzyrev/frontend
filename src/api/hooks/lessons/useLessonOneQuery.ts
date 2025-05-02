"use client";

import api from "@/api/api.config";
import { ILesson } from "@/shared/interfaces/courses/Course";
import { useQuery } from "@tanstack/react-query";

const useLessonOneQuery = (courseId: string, moduleId: string, lessonId: string) => {
  return useQuery({
    queryKey: ["lesson", courseId, moduleId, lessonId],
    queryFn: () => api.get<ILesson>(`/lessons/${lessonId}/courses/${courseId}/modules/${moduleId}`),
    retry: false,
    staleTime: 1000,
    select: (res) => res.data,
  });
};

export default useLessonOneQuery;
