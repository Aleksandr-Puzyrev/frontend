"use client";

import useUpdateLessonMutation from "@/api/hooks/courses/useUpdateLessonMutation";
import Icon from "@/components/Icon";
import { IQuestion, IUpdateLesson } from "@/shared/interfaces/courses/Course";
import { UpdateLessonSchema } from "@/shared/schema/CreateStructureCourseSchema";
import SuccessGenerate from "@/view/courses/admin/SuccessGenerate";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface IUpdateModuleForm {
  generateData: IUpdateLesson;
  moduleId: number;
  lessonId: number;
  setIsLessonGeneration: Dispatch<SetStateAction<boolean>>;
  onGenereteModule: () => void;
}

const UpdateLessonForm = ({
  generateData,
  moduleId,
  lessonId,
  setIsLessonGeneration,
  onGenereteModule,
}: IUpdateModuleForm) => {
  const { mutate } = useUpdateLessonMutation(moduleId, lessonId);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<IQuestion[]>(generateData.questions);
  const [updateLessonTitle, setUpdateLessonTitle] = useState<string>(generateData.title);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IUpdateLesson>({
    resolver: yupResolver(UpdateLessonSchema),
    defaultValues: generateData,
  });

  const newQuestion = {
    questionText: "",
    options: ["", "", "", ""],
    answer: "",
  };

  const addNewQuestion = () => {
    const currentQuestions = watch("questions") || [];
    setValue("questions", [...currentQuestions, newQuestion]);
    setQuestionData([...currentQuestions, newQuestion]);
  };

  const removeQuestion = (questionIndex: number) => {
    const currentQuestions = watch("questions") || [];
    const updatedQuestions = currentQuestions.filter((_, index) => index !== questionIndex);
    setValue("questions", updatedQuestions);
    setQuestionData(updatedQuestions);
  };

  // Обновление варианта ответа
  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const currentQuestions = watch("questions") || [];
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setValue("questions", updatedQuestions);
    setQuestionData(updatedQuestions);
  };

  const onSubmit = (data: IUpdateLesson) => {
    mutate(data, {
      onSuccess() {
        setIsUpdateSuccess(true);
        setIsLessonGeneration(false);
        setUpdateLessonTitle(data.title);
      },
    });
  };

  if (isUpdateSuccess) {
    return (
      <SuccessGenerate
        lessonTitle={updateLessonTitle}
        onGenerate={onGenereteModule}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Stack spacing={2}>
        <TextField
          label="Название урока"
          fullWidth
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          size="small"
        />
        <TextField
          label="Описание урока"
          fullWidth
          multiline
          rows={4}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          size="small"
        />
        <TextField
          label="Содержание урока"
          fullWidth
          multiline
          {...register("content")}
          error={!!errors.content}
          helperText={errors.content?.message}
          size="small"
        />
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Вопросы к уроку
          </Typography>
          <Stack spacing={3}>
            {!!questionData.length ? questionData?.map((question, questionIndex) => (
              <Box key={questionIndex} p={2} border={1} borderRadius={1} borderColor="divider">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">Вопрос {questionIndex + 1}</Typography>
                  <IconButton onClick={() => removeQuestion(questionIndex)} color="error">
                    <Icon icon="mdi:delete" />
                  </IconButton>
                </Box>
                <TextField
                  label="Вопрос"
                  fullWidth
                  {...register(`questions.${questionIndex}.questionText`)}
                  error={!!errors.questions?.[questionIndex]?.questionText}
                  helperText={errors.questions?.[questionIndex]?.questionText?.message}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Варианты ответов:
                </Typography>
                <Stack spacing={1}>
                  {question.options?.map((option, optionIndex) => (
                    <TextField
                      key={optionIndex}
                      label={`Вариант ${optionIndex + 1}`}
                      fullWidth
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(questionIndex, optionIndex, e.target.value)
                      }
                      size="small"
                      helperText={errors.questions?.[questionIndex]?.options?.message}
                    />
                  ))}
                </Stack>
                <TextField
                  label="Правильный ответ"
                  fullWidth
                  {...register(`questions.${questionIndex}.answer`)}
                  error={!!errors.questions?.[questionIndex]?.answer}
                  helperText={errors.questions?.[questionIndex]?.answer?.message}
                  size="small"
                  sx={{
                    mt: 2,
                    "& .MuiInputLabel-root": {
                      color: "success.main",
                    },
                    "& .MuiInputBase-input": {
                      color: "success.main",
                    },
                  }}
                />
              </Box>
            )) : <Typography variant="h6" color="error">Нет вопросов</Typography>}
            <Button onClick={addNewQuestion} variant="outlined" sx={{ mt: 2 }}>
              Добавить вопрос
            </Button>
          </Stack>
        </Box>
        <Button type="submit" variant="contained" size="large">
          Сохранить изменения
        </Button>
        <Button type="button" variant="outlined" onClick={onGenereteModule}>
          Сгенерировать повторно
        </Button>
      </Stack>
    </form>
  );
};

export default UpdateLessonForm;
