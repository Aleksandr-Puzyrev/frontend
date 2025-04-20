"use client";

import useAiCreateLessonMutation from "@/api/hooks/ai/useAiLessonCreateMutation";
import UpdateLessonForm from "@/forms/UpdateLessonForm";
import { ICourse, ILesson, IUpdateLesson } from "@/shared/interfaces/courses/Course";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import SuccessGenerate from "./SuccessGenerate";

interface GenerateLessonProps {
  structureCreatedData: ICourse;
  moduleId: number;
  lessonId: number;
  lessonTitle: string;
  isLessonGeneration: boolean;
  setIsLessonGeneration: Dispatch<SetStateAction<boolean>>;
  lesson: ILesson;
}

const GenerateLesson = ({
  structureCreatedData,
  moduleId,
  lessonId,
  lessonTitle,
  isLessonGeneration,
  setIsLessonGeneration,
  lesson,
}: GenerateLessonProps) => {
  const { mutate, isPending } = useAiCreateLessonMutation();
  const [generateData, setGenerateData] = useState<IUpdateLesson | null>(null);

  const genereteModule = () => {
    setIsLessonGeneration(true);
    mutate(
      {
        query: structureCreatedData,
        moduleId,
        lessonId,
      },
      {
        onSuccess(data) {
          setGenerateData(data);
        },
        onError(error) {
          toast.error(`Произошла ошибка при генерации урока: ${error.message}`);
          setIsLessonGeneration(false);
        },
      }
    );
  };

  if (isPending) {
    return (
      <Stack spacing={2} direction="row" alignItems="center">
        <CircularProgress />
        <Typography variant="h6" color="primary">
          Идет генерация урока, пожалуйста подождите...
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={4}>
      {generateData ? (
        <UpdateLessonForm
          generateData={generateData}
          moduleId={moduleId}
          lessonId={lessonId}
          setIsLessonGeneration={setIsLessonGeneration}
          onGenereteModule={genereteModule}
        />
      ) : !!lesson.questions && !!lesson.content ? (
        <SuccessGenerate
          lessonTitle={lessonTitle}
          onGenerate={genereteModule}
          isDisabled={isLessonGeneration}
        />
      ) : (
        <Button variant="contained" onClick={genereteModule} disabled={isLessonGeneration}>
          Сгенерировать урок на тему: {lessonTitle}
        </Button>
      )}
    </Stack>
  );
};

export default GenerateLesson;
