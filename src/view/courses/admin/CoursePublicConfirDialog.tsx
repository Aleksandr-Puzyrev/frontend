import DialogComponent from "@/components/DialogComponent";
import { Button, Stack } from "@mui/material";

interface CoursePublicConfirDialogProps {
  disabled: boolean;
  onHandle: () => void;
}

const CoursePublicConfirDialog = ({ onHandle, disabled }: CoursePublicConfirDialogProps) => {
  const onHandler = (props: { closeDialog: () => void }) => {
    onHandle();
    props.closeDialog();
  };

  return (
    <DialogComponent
      Toggler={(props) => (
        <Button variant="contained" disabled={disabled} {...props}>
          Опубликовать курс
        </Button>
      )}
      title="Вы действительно хотите опубликовать данный курс?"
      Content={(props) => (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4} sx={{ p: 0, pt: 6 }}>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={props.closeDialog}
            type="reset"
          >
            Отмена
          </Button>
          <Button fullWidth variant="contained" onClick={() => onHandler(props)}>
            Подтвердить
          </Button>
        </Stack>
      )}
    />
  );
};

export default CoursePublicConfirDialog;
