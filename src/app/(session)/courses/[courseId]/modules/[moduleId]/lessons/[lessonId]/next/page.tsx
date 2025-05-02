"use client";

import useCoursesOneQuery from "@/api/hooks/courses/useCoursesOneQuery";
import Routes from "@/shared/config/routes.config";
import { GetLessonType } from "@/shared/interfaces/courses/Course";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const NextLessonPage = () => {
  const { courseId, moduleId, lessonId } = useParams<GetLessonType>();
  const router = useRouter();
  const { data: course } = useCoursesOneQuery(courseId);

  useEffect(() => {
    if (!course) return;

    const currentModule = course.modules?.find((m) => m.id === Number(moduleId));
    const currentLesson = currentModule?.lessons?.find((l) => l.id === Number(lessonId));

    if (!currentModule || !currentLesson) {
      router.push(Routes.courses.detail(Number(courseId)));
      return;
    }

    const lessonIndex = currentModule.lessons?.findIndex((l) => l.id === currentLesson.id) ?? -1;

    if (
      lessonIndex >= 0 &&
      currentModule.lessons &&
      lessonIndex < currentModule.lessons.length - 1
    ) {
      const nextLesson = currentModule.lessons[lessonIndex + 1];
      router.push(
        Routes.courses.lessonCourseDetail({ courseId, moduleId, lessonId: String(nextLesson.id) })
      );
      return;
    }

    const moduleIndex = course.modules?.findIndex((m) => m.id === currentModule.id) ?? -1;

    if (moduleIndex >= 0 && course.modules && moduleIndex < course.modules.length - 1) {
      const nextModule = course.modules[moduleIndex + 1];
      if (nextModule.lessons && nextModule.lessons.length > 0) {
        router.push(
          Routes.courses.lessonCourseDetail({
            courseId,
            moduleId: String(nextModule.id),
            lessonId: String(nextModule.lessons[0].id),
          })
        );
        return;
      }
    }

    router.push(Routes.courses.lessonComplete(courseId));
  }, [course, courseId, moduleId, lessonId, router]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h5">Загружаем следующий урок...</Typography>
      </Box>
    </Box>
  );
};

export default NextLessonPage;
