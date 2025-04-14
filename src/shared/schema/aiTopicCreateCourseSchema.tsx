import * as yup from "yup";

export interface IAiTopicCreateCourse {
  topic: string;
}

const aiTopicCreateCourseSchema = yup.object().shape({
  topic: yup.string().required("Введите название"),
});

export default aiTopicCreateCourseSchema;
