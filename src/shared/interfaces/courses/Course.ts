import { CourseStatusesType } from "@/shared/config/course-status.config";

export interface IQuestion {
  id?: number;
  questionText: string;
  options: string[];
  answer: string;
}

export interface ILesson {
  id?: number;
  title: string;
  description: string;
  content?: string;
  questions?: IQuestion[];
}

export interface IUpdateLesson extends Omit<ILesson, "id" | "content" | "questions"> {
  content: string;
  questions: IQuestion[];
}

export interface IModules {
  id?: number;
  title: string;
  description: string;
  lessons?: ILesson[];
}

export interface ICourse {
  id: number;
  title: string;
  description: string;
  audience: string;
  duration: string;
  goals: string;
  modules: IModules[];
  status?: CourseStatusesType;
  image?: string;
}

export type GetLessonType = {
  courseId: string;
  moduleId: string;
  lessonId: string;
}
