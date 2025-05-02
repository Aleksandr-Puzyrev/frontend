import Routes from "./routes.config";

export const authNavigation = [
  {
    title: "Пользователи",
    path: Routes.users.list,
  },
  {
    title: "Все курсы",
    path: Routes.courses.list,
  },
  {
    title: "Курсы",
    path: Routes.courses.clientList,
  },
  {
    title: "Создать курс",
    path: Routes.courses.create,
  },
  {
    title: "Профиль",
    path: Routes.account.profile,
  },
];

export const defaultNavigation = [
  {
    title: "Главная",
    path: Routes.mainPage,
  },
  {
    title: "Авторизация",
    path: Routes.auth.login,
  },
  {
    title: "Регистрация",
    path: Routes.auth.registration,
  },
];
