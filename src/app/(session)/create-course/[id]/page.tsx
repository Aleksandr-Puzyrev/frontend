"use client";

import useCoursesOneQuery from "@/api/hooks/courses/useCoursesOneQuery";
import useCourseStatusMutation from "@/api/hooks/courses/useCourseStatusMutation";
import LoadingNode from "@/components/LoadingNode";
import Routes from "@/shared/config/routes.config";
import { PageIdParams } from "@/shared/types/main.type";
import aclRoute from "@/shared/utils/aclRoute";
import CoursePublicConfirDialog from "@/view/courses/admin/CoursePublicConfirDialog";
import GenerateLesson from "@/view/courses/admin/GenerateLesson";
import CoursesImageChanger from "@/view/courses/CoursesImageChanger";
import { Card, CardContent, Skeleton, Stack, Typography } from "@mui/material";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateModules = () => {
  const { id } = useParams<PageIdParams>();
  const router = useRouter();
  const { data: course, isPending, isError } = useCoursesOneQuery(id);
  const [isLessonGeneration, setIsLessonGeneration] = useState<boolean>(false);
  const { mutate } = useCourseStatusMutation(Number(id));

  const onPublicCourse = () => {
    mutate(
      { status: "PUBLISHED" },
      {
        onSuccess() {
          router.push(Routes.courses.list);
        },
      }
    );
  };

  useEffect(() => {
    if (isError) return notFound();
  }, [isError]);

  return (
    <Stack spacing={4}>
      <LoadingNode
        isPending={isPending}
        skeletonSlot={
          <Stack spacing={2} width="100%">
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <Skeleton variant="rounded" height={40} key={index} />
              ))}
          </Stack>
        }
        nodeSlot={
          course && (
            <Stack spacing={2}>
              <Stack spacing={2}>
                <Typography variant="h3">Название курса: {course.title}</Typography>
                <Typography variant="h5">Краткое описание: {course.description}</Typography>
                <Typography variant="h5">Для кого предназначен курс: {course.audience}</Typography>
                <Typography variant="h5">Ожидаемое время прохождения: {course.duration}</Typography>
                <Typography variant="h5">Цели курса: {course.goals}</Typography>
              </Stack>
              <Card>
                <CardContent>
                  <Stack spacing={2} alignItems="center">
                    <Typography variant="h5">Изображение для курса</Typography>
                    {course && <CoursesImageChanger course={course} />}
                  </Stack>
                </CardContent>
              </Card>
              <Stack spacing={6}>
                {course.modules?.map((module, moduleIndex) => (
                  <Card key={module.id}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography variant="h5">
                          Модуль {moduleIndex + 1}: {module.title}
                        </Typography>
                        <Typography variant="h5">Краткое описание: {module.description}</Typography>
                        {module.lessons?.map((lesson) => (
                          <GenerateLesson
                            key={lesson.id}
                            structureCreatedData={course}
                            moduleId={module.id ?? 0}
                            lessonId={lesson.id ?? 0}
                            lessonTitle={lesson.title}
                            isLessonGeneration={isLessonGeneration}
                            setIsLessonGeneration={setIsLessonGeneration}
                            lesson={lesson}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
              <CoursePublicConfirDialog onHandle={onPublicCourse} disabled={!course.image} />
            </Stack>
          )
        }
      />
    </Stack>
  );
};

export default aclRoute(CreateModules, "read", "CreateCourse");
