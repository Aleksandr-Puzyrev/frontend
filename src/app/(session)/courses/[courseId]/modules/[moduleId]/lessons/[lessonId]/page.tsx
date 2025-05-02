"use client";

import useLessonOneQuery from "@/api/hooks/lessons/useLessonOneQuery";
import { AIAssistant } from "@/components/AIAssistant";
import Routes from "@/shared/config/routes.config";
import { GetLessonType } from "@/shared/interfaces/courses/Course";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const LessonPage = () => {
  const { courseId, moduleId, lessonId } = useParams<GetLessonType>();
  const router = useRouter();
  const {
    data: lesson,
    isLoading,
    isError,
    error,
  } = useLessonOneQuery(courseId, moduleId, lessonId);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return (
      <Typography color="error" variant="h6">
        Ошибка загрузки урока: {error?.message}
      </Typography>
    );
  }

  if (!lesson) {
    return <Typography variant="h6">Урок не найден</Typography>;
  }

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const isAnswerCorrect = (questionId: number) => {
    if (!showResults) return false;
    const question = lesson.questions?.find((q) => q.id === questionId);
    return question && selectedAnswers[questionId] === question.answer;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h3" gutterBottom>
        {lesson.title}
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1" paragraph>
            {lesson.description}
          </Typography>
          {lesson.content && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" whiteSpace="pre-line">
                {lesson.content}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      {lesson.questions && lesson.questions.length > 0 ? (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Тест по уроку
          </Typography>
          <List>
            {lesson.questions.map((question, index) => (
              <Card key={question.id} sx={{ mb: 2 }}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        Вопрос {index + 1}: {question.questionText}
                      </Typography>
                    }
                  />
                </ListItem>
                <CardContent>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={selectedAnswers[question.id!] || ""}
                      onChange={(e) => handleAnswerSelect(question.id!, e.target.value)}
                    >
                      {question.options.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={option}
                          control={<Radio />}
                          label={option}
                          sx={{
                            ...(showResults && {
                              color: isAnswerCorrect(question.id!)
                                ? "success.main"
                                : selectedAnswers[question.id!] === option
                                ? "error.main"
                                : "inherit",
                            }),
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {showResults && (
                    <Alert
                      severity={isAnswerCorrect(question.id!) ? "success" : "error"}
                      sx={{ mt: 1 }}
                    >
                      {isAnswerCorrect(question.id!)
                        ? "Правильный ответ!"
                        : `Правильный ответ: ${question.answer}`}
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </List>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            {!showResults ? (
              <Button
                variant="contained"
                size="large"
                onClick={checkAnswers}
                disabled={Object.keys(selectedAnswers).length !== lesson.questions.length}
              >
                Проверить ответы
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  router.push(Routes.courses.lessonCourseNext({courseId, moduleId, lessonId}))
                }
              >
                Следующий урок
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        <Button
          variant="contained"
          size="large"
          onClick={() =>
            router.push(Routes.courses.lessonCourseNext({courseId, moduleId, lessonId}))
          }
        >
          Следующий урок
        </Button>
      )}
      <AIAssistant lessonId={lessonId} />
    </Box>
  );
};

export default LessonPage;
