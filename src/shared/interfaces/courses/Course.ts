export interface IQuestion {
  questionText: string;
  options: string[];
  answer: string;
}

export interface ILesson {
  title: string;
  content: string;
  questions?: IQuestion[];
}

export interface IModules {
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
}