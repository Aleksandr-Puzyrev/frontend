import DialogComponent from "@/components/DialogComponent";
import Icon from "@/components/Icon";
import { Button, Stack } from "@mui/material";

interface LogoutConfirmationDialogProps {
  handleLogout: () => void;
}

const LogoutConfirmationDialog = ({ handleLogout }: LogoutConfirmationDialogProps) => {

  const onHandler = (props: { closeDialog: () => void }) => {
    handleLogout();
    props.closeDialog();
  };

  return (
    <DialogComponent
      Toggler={(props) => (
        <Button endIcon={<Icon icon="mdi:logout-variant" />} {...props}>
          Выйти
        </Button>
      )}
      title="Вы действительно хотите выйти?"
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

export default LogoutConfirmationDialog;
