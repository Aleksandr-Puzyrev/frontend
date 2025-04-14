import * as yup from "yup";
import getNoun from "../utils/getNoun";

export const rulesMessages = {
  emptyValue: "Поле не должно быть пустым",
};

export const yupRules = {
  email: yup
    .string()
    .required(rulesMessages.emptyValue)
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Email введен не корректный",
    }),
  stringLongerThen: (length: number) =>
    yup
      .string()
      .required(rulesMessages.emptyValue)
      .min(length, `Минимальная длина текста ${length} симво${getNoun(length, "л", "ла", "лов")}`),
  requiredString: yup.string().required(rulesMessages.emptyValue),
  number: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value)),
  string: yup.string().nullable(),
  requiredNumber: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(rulesMessages.emptyValue),
  password: yup
    .string()
    .required(rulesMessages.emptyValue)
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну прописную латинскую букву")
    .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную латинскую букву")
    .matches(/\d/, "Пароль должен содержать хотя бы одну цифру"),
  passwordConfirmation: yup
    .string()
    .required(rulesMessages.emptyValue)
    .oneOf([yup.ref("password")], "Пароли не совпадают"),
  boolean: yup.boolean().nullable(),
  phone: yup
    .string()
    .required(rulesMessages.emptyValue)
    .min(16, "Номер телефона введен не полностью"),
};

export default yupRules;
