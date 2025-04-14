"use client";

import useAiCreateStructurMutation from "@/api/hooks/ai/useAiCourseCreateMutation";
import { ICourse } from "@/shared/interfaces/courses/Course";
import aiTopicCreateCourseSchema, {
  IAiTopicCreateCourse,
} from "@/shared/schema/aiTopicCreateCourseSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IAiTopicCreateStructureForm {
  closeDialog: () => void;
  setCourseData: Dispatch<SetStateAction<ICourse | null>>;
}

const AiTopicCreateStructureForm = ({
  closeDialog,
  setCourseData,
}: IAiTopicCreateStructureForm) => {
  const { mutate } = useAiCreateStructurMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IAiTopicCreateCourse>({
    resolver: yupResolver(aiTopicCreateCourseSchema),
  });

  const onSubmit = (data: IAiTopicCreateCourse) => {
    mutate(data, {
      onSuccess: (data) => {
        setCourseData(data);
        toast.success("Генерация структуры курса прошла успешно");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <TextField
        sx={{ marginTop: "20px" }}
        label="Название курса"
        fullWidth
        {...register("topic")}
        error={!!errors.topic}
        helperText={errors.topic?.message}
        size="small"
      />
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ p: 0, pt: 3 }}>
        <Button fullWidth variant="outlined" color="secondary" onClick={closeDialog} type="reset">
          Отмена
        </Button>
        <Button fullWidth variant="contained" type="submit">
          Подтвердить
        </Button>
      </Stack>
    </form>
  );
};

export default AiTopicCreateStructureForm;
