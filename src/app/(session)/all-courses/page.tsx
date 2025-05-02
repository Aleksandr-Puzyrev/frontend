"use client";

import aclRoute from "@/shared/utils/aclRoute";
import CoursesTable from "@/view/courses/CoursesTable";
import { Stack, Typography } from "@mui/material";

const AllCourses = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" gutterBottom>
        Все курсы
      </Typography>
      <CoursesTable />
    </Stack>
  );
};

export default aclRoute(AllCourses, "read", "AllCourses");
