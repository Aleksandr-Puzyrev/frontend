"use client";

import useCourseCreateMutation from "@/api/hooks/courses/useCourseCreateMutation";
import Icon from "@/components/Icon";
import Routes from "@/shared/config/routes.config";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { CreateStructureCourseSchema } from "@/shared/schema/CreateStructureCourseSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

type ICourseForm = Omit<ICourse, "id">;

interface ICreateStructureCourseForm {
  courseData: ICourseForm;
}

const CreateStructureCourseForm = ({ courseData }: ICreateStructureCourseForm) => {
  const { mutate } = useCourseCreateMutation();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ICourseForm>({
    resolver: yupResolver(CreateStructureCourseSchema),
    defaultValues: courseData,
  });

  // Управление модулями курса
  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  });

  const onSubmit = (data: ICourseForm) => {
    mutate(data, {
      onSuccess: (data) => {
        router.push(Routes.courses.createCourseModules(String(data.id)));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Stack spacing={2}>
        <TextField
          label="Название курса"
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          size="small"
        />
        <TextField
          label="Описание курса"
          fullWidth
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          size="small"
        />
        <TextField
          label="Для кого предназначен курс"
          fullWidth
          {...register("audience")}
          error={!!errors.audience}
          helperText={errors.audience?.message}
          size="small"
        />
        <TextField
          label="Ожидаемое время прохождения"
          fullWidth
          {...register("duration")}
          error={!!errors.duration}
          helperText={errors.duration?.message}
          size="small"
        />
        <TextField
          multiline
          label="Цели курса"
          fullWidth
          {...register("goals")}
          error={!!errors.goals}
          helperText={errors.goals?.message}
          size="small"
        />
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Модули курса
          </Typography>
          <Stack spacing={3}>
            {moduleFields.map((module, moduleIndex) => (
              <Box key={module.id} p={2} border={1} borderRadius={1} borderColor="divider">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Модуль {moduleIndex + 1}</Typography>
                  <IconButton onClick={() => removeModule(moduleIndex)} color="error">
                    <Icon icon="mdi:delete" />
                  </IconButton>
                </Box>
                <Stack spacing={2} mt={2}>
                  <TextField
                    label="Название модуля"
                    fullWidth
                    {...register(`modules.${moduleIndex}.title`)}
                    error={!!errors.modules?.[moduleIndex]?.title}
                    helperText={errors.modules?.[moduleIndex]?.title?.message}
                    size="small"
                  />
                  <TextField
                    label="Описание модуля"
                    fullWidth
                    multiline
                    rows={3}
                    {...register(`modules.${moduleIndex}.description`)}
                    error={!!errors.modules?.[moduleIndex]?.description}
                    helperText={errors.modules?.[moduleIndex]?.description?.message}
                    size="small"
                  />
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Уроки модуля
                    </Typography>
                    <Stack spacing={2}>
                      {module.lessons?.map((lesson, lessonIndex) => (
                        <Box
                          key={lessonIndex}
                          p={2}
                          border={1}
                          borderRadius={1}
                          borderColor="divider"
                        >
                          <TextField
                            label="Название урока"
                            fullWidth
                            {...register(`modules.${moduleIndex}.lessons.${lessonIndex}.title`)}
                            error={!!errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.title}
                            helperText={
                              errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.title?.message
                            }
                            size="small"
                            sx={{ mb: 2 }}
                          />

                          <TextField
                            label="Описание урока"
                            fullWidth
                            multiline
                            rows={4}
                            {...register(
                              `modules.${moduleIndex}.lessons.${lessonIndex}.description`
                            )}
                            error={
                              !!errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.description
                            }
                            helperText={
                              errors.modules?.[moduleIndex]?.lessons?.[lessonIndex]?.description
                                ?.message
                            }
                            size="small"
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            ))}
            <Button
              onClick={() => appendModule({ title: "", description: "", lessons: [] })}
              variant="outlined"
            >
              Добавить модуль
            </Button>
          </Stack>
        </Box>
        <Button type="submit" variant="contained" size="large">
          Сохранить курс
        </Button>
      </Stack>
    </form>
  );
};

export default CreateStructureCourseForm;
