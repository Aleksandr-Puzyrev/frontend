"use client";

import aclRoute from "@/shared/utils/aclRoute";
import CoursesTable from "@/view/courses/CoursesTable";
import { Stack, Typography } from "@mui/material";

const Courses = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" gutterBottom>
        Курсы
      </Typography>
      <CoursesTable />
    </Stack>
  );
};

export default aclRoute(Courses, "read", "Courses");
