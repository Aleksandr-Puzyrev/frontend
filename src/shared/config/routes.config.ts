import { GetLessonType } from "../interfaces/courses/Course";

const Routes = {
    mainPage: "/",
    auth: {
      login: "/auth/login",
      registration: "/auth/registration",
      recovery: "/auth/recovery",
    },
    courses: {
      list: "/all-courses",
      clientList: "/courses",
      detail: (id: number) => `/courses/${id}`,
      lessonComplete: (courseId: string) => `/courses/${courseId}/complete`,
      create: "/create-course",
      createCourseModules: (id: string) => `/create-course/${id}`,
      lessonCourseDetail: ({courseId, moduleId, lessonId}: GetLessonType) => `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
      lessonCourseNext: ({courseId, moduleId, lessonId}: GetLessonType) => `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/next`,
    },
    users: {
      list: "/users",
      detail: (id: string) => `/users/${id}`,
    },
    account: {
      profile: "/profile",
      settings: "/settings",
    },
    forbidden: "/forbidden",
  };
  
  export default Routes;
  