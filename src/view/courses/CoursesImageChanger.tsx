"use client";

import useUploadCourseImageMutation from "@/api/hooks/courses/useUploadCourseImageMutation";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";

const isValidFileUploaded = (file: File) => {
  const validExtensions = ["png", "jpeg", "jpg"];
  const fileExtension = file.type.split("/")[1];
  return validExtensions.includes(fileExtension);
};

interface CoursesImageChangerProps {
  course: ICourse;
}

const CoursesImageChanger = ({ course }: CoursesImageChangerProps) => {
  const { mutate } = useUploadCourseImageMutation(course.id);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (!isValidFileUploaded(selectedFile))
        return toast.error("Файл не соответствует разрешениям");
      if (selectedFile.size > 1 * 1000 * 1024)
        return toast.error("Файл превышает максимально допустимый размер изображения");
      mutate({ file: selectedFile });
    }
  };
  return (
    <Stack alignItems="center" spacing={4}>
      <Avatar
        variant="rounded"
        src={course?.image ?? "/avatar.png"}
        alt="Avatar"
        sx={{ width: 200, height: 200 }}
      />
      <Stack alignItems="center">
        <Button
          component="label"
          variant="contained"
          htmlFor="account-settings-upload-image"
          sx={{ borderRadius: 50 }}
        >
          Изменить
          <input
            hidden
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            id="account-settings-upload-image"
            onChange={handleAvatar}
          />
        </Button>
        <Typography
          variant="caption"
          sx={{ mt: 4, display: "block", color: "text.disabled", textAlign: "center" }}
        >
          Разрешенные форматы JPEG, JPG или PNG. Максимальный размер файла (1) МБ
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CoursesImageChanger;
