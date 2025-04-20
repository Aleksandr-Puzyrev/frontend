import * as yup from "yup";

const QuestionSchema = yup.object().shape({
  questionText: yup.string().required("Текст вопроса обязателен"),
  options: yup
    .array()
    .of(yup.string().required("Вариант ответа не может быть пустым"))
    .min(3, "Должно быть минимум 3 варианта ответа")
    .required("Варианты ответов обязательны"),
  answer: yup
    .string()
    .required("Правильный ответ обязателен")
    .test("is-in-options", "Правильный ответ должен быть среди вариантов", function (value) {
      return this.parent.options.includes(value);
    }),
});

const LessonSchema = yup.object().shape({
  title: yup.string().required("Название урока обязательно"),
  description: yup.string().required("Описание урока обязательно"),
  questions: yup.array().of(QuestionSchema).optional(),
});

export const UpdateLessonSchema = LessonSchema.shape({
  content: yup.string().required("Контент урока обязателен"),
  questions: yup.array().of(QuestionSchema).required("Вопросы урока обязательны"),
});

export const ModuleSchema = yup.object().shape({
  title: yup.string().required("Название модуля обязательно"),
  description: yup.string().required("Описание модуля обязательно"),
  lessons: yup.array().of(LessonSchema).optional(),
});

export const CreateStructureCourseSchema = yup.object().shape({
  title: yup.string().required("Название курса обязательно"),
  description: yup.string().required("Описание курса обязательно"),
  audience: yup.string().required("Целевая аудитория обязательна"),
  duration: yup.string().required("Длительность курса обязательна"),
  goals: yup.string().required("Цели курса обязательны"),
  modules: yup
    .array()
    .of(ModuleSchema)
    .min(1, "Должен быть хотя бы один модуль")
    .required("Модули курса обязательны"),
});
