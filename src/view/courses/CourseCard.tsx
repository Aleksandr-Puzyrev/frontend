"use client";

import Routes from "@/shared/config/routes.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import Link from "next/link";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card sx={{ 
      width: "100%", 
      height: "550px",
      display: "flex",
      flexDirection: "column"
    }} component={Link} href={Routes.courses.detail(course.id)}>
      <CardContent sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        "&:hover": {
          overflow: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "3px"
          },
        }
      }}>
        <Stack 
          alignItems="center" 
          spacing={2}
          sx={{
            minHeight: "min-content"
          }}
        >
          <Avatar
            variant="rounded"
            src={course?.image ?? "/avatar.png"}
            alt="Avatar"
            sx={{ width: 200, height: 200 }}
          />
          <Typography variant="h6" textAlign="center">
            {course.title}
          </Typography>
          {course.description && <Typography variant="body1">
            Описание курса: {course.description}
          </Typography>}
          {course.goals && <Typography variant="body1">
            Цели курса: {course.goals}
          </Typography>}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CourseCard;