"use client";

import useCoursesOneQuery from "@/api/hooks/courses/useCoursesOneQuery";
import useAssignCourseMutation from "@/api/hooks/users/useAssignCourseMutation";
import useSessionQuery from "@/api/hooks/users/useSessionQuery";
import Routes from "@/shared/config/routes.config";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid2 as Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: session, isPending: isSessionPending } = useSessionQuery();
  const { data: course, isLoading, isError, error } = useCoursesOneQuery(courseId);
  const { mutate } = useAssignCourseMutation();
  const router = useRouter();

  if (isLoading || isSessionPending) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography color="error" variant="h6">
        Ошибка загрузки курса: {error?.message}
      </Typography>
    );
  }

  if (!course) {
    return <Typography variant="h6">Курс не найден</Typography>;
  }

  const onHandler = () => {
    if (session?.courses.find((course) => course.id === Number(courseId))) {
      router.push(
        Routes.courses.lessonCourseDetail({
          courseId,
          moduleId: String(course.modules?.at(0)?.id),
          lessonId: String(course.modules.at(0)?.lessons?.at(0)?.id),
        })
      );
      return;
    }
    
    mutate(
      { userId: session?.id || 0, courseId: Number(courseId) },
      {
        onSuccess() {
          router.push(
            Routes.courses.lessonCourseDetail({
              courseId,
              moduleId: String(course.modules?.at(0)?.id),
              lessonId: String(course.modules.at(0)?.lessons?.at(0)?.id),
            })
          );
        },
      }
    );
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: 3 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
            >
              <Avatar
                src={course.image || "/course-placeholder.jpg"}
                alt={course.title}
                sx={{ width: 200, height: 200 }}
                variant="rounded"
              />
              <Typography variant="h4" align="center">
                {course.title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={onHandler}
              >
                Начать курс
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Описание курса
              </Typography>
              <Typography>{course.description}</Typography>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h5" gutterBottom>
                Для кого этот курс
              </Typography>
              <Typography>{course.audience}</Typography>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h5" gutterBottom>
                Цели курса
              </Typography>
              <Typography>{course.goals}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Модули курса
        </Typography>
        <List sx={{ width: "100%" }}>
          {course.modules?.map((module, index: number) => (
            <Card key={module.id} sx={{ mb: 2 }}>
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {index + 1}. {module.title}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {module.description}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Уроки:
                </Typography>
                <List dense>
                  {module.lessons?.map((lesson, lessonIndex) => (
                    <ListItem key={lesson.id}>
                      <ListItemText
                        primary={`${index + 1}.${lessonIndex + 1} ${lesson.title}`}
                        secondary={`${lesson.description}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CoursePage;
