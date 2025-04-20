import { ChipProps } from "@mui/material";

type ChipColor = ChipProps["color"];

interface CourseStatus {
  label: string;
  color: ChipColor;
}

type CourseStatusType = {
  CREATED: CourseStatus;
  FILLED: CourseStatus;
  PUBLISHED: CourseStatus;
};

export const CourseStatuses: CourseStatusType = {
  CREATED: {
    label: "Создан",
    color: "default",
  },
  FILLED: {
    label: "Заполнен",
    color: "secondary",
  },
  PUBLISHED: {
    label: "Опубликован",
    color: "success",
  },
};

export type CourseStatusesType = "CREATED" | "FILLED" | "PUBLISHED";
