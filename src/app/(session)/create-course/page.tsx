"use client";

import aclRoute from "@/shared/utils/aclRoute";
import CreateStructureCourse from "@/view/courses/admin/CreateStructureCourse";
import { Stack, Typography } from "@mui/material";

const CreateCourse = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="h4" gutterBottom>
        Курсы
      </Typography>
      <CreateStructureCourse />
    </Stack>
  );
};

export default aclRoute(CreateCourse, "read", "CreateCourse");
