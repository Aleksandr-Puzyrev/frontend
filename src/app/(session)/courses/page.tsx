"use client";

import aclRoute from "@/shared/utils/aclRoute";
import CoursesList from "@/view/courses/CoursesList";
import { Stack, Typography } from "@mui/material";

const Courses = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" gutterBottom>
        Курсы
      </Typography>
      <CoursesList />
    </Stack>
  );
};

export default aclRoute(Courses, "read", "Courses");
