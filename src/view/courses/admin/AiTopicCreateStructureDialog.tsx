import DialogComponent from "@/components/DialogComponent";
import AiTopicCreateStructureForm from "@/forms/AiTopicCreateStructureForm";
import { ICourse } from "@/shared/interfaces/courses/Course";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface AiTopicCreateCourseDialogProps {
  setCourseData: Dispatch<SetStateAction<ICourse | null>>;
  courseData: ICourse | null;
}
const AiTopicCreateStructureDialog = ({setCourseData, courseData}: AiTopicCreateCourseDialogProps) => {
  return (
    <DialogComponent
      Toggler={(props) => (
        <Button variant="contained" sx={{width: "fit-content"}} disabled={!!courseData} {...props}>
          Сгенерировать курс по теме
        </Button>
      )}
      title="Распишите тему курса, на основе которой ИИ сгенерирует курс"
      Content={(props) => <AiTopicCreateStructureForm setCourseData={setCourseData} {...props} />}
    />
  );
};

export default AiTopicCreateStructureDialog;
