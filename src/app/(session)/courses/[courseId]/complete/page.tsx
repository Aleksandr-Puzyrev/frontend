"use client";

import useCoursesOneQuery from "@/api/hooks/courses/useCoursesOneQuery";
import Icon from "@/components/Icon";
import Routes from "@/shared/config/routes.config";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

const CourseCompletePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, isLoading, isError } = useCoursesOneQuery(courseId);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Ошибка загрузки данных курса</Typography>;

  return (
    <Stack justifyContent="center" alignItems="center">
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
          p: 4,
        }}
      >
        <CardContent>
          <Stack alignItems="center" spacing={3}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "success.main",
                mb: 2,
              }}
            >
              <Icon icon="mdi:celebration" />
            </Avatar>
            <Typography variant="h3" component="h1" gutterBottom>
              Поздравляем!
            </Typography>
            {course?.image && (
              <Avatar
                src={course.image}
                alt={course.title}
                sx={{ width: 120, height: 120 }}
                variant="rounded"
              />
            )}
            <Typography variant="h5" component="h2">
              Вы успешно завершили курс:
            </Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {course?.title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              Теперь вы освоили все материалы этого курса. Применяйте полученные знания на практике!
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href={Routes.courses.detail(Number(courseId))}
                sx={{ px: 4 }}
              >
                К странице курса
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href={Routes.courses.clientList}
                sx={{ px: 4 }}
              >
                К списку курсов
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CourseCompletePage;
