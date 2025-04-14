"use client";

import Icon from "@/components/Icon";
import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Fragment, JSX, useCallback, useState } from "react";

interface IDialogComponent {
  Toggler: ({ onClick }: { onClick: () => void }) => JSX.Element;
  title: string;
  subtitle?: string;
  Content: ({ closeDialog }: { closeDialog: () => void }) => JSX.Element;
  width?: string;
  additionalAction?: () => void;
  dialogSize?: Breakpoint;
}

const DialogComponent = ({
  Content,
  Toggler,
  title,
  subtitle,
  width,
  additionalAction,
  dialogSize = "md",
}: IDialogComponent) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onOpenClick = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (additionalAction) {
      additionalAction();
    }
  }, [additionalAction]);

  return (
    <Fragment>
      <Toggler onClick={onOpenClick} />
      <Dialog
        open={isOpen}
        maxWidth={dialogSize}
        fullWidth
        disableScrollLock
        onClose={() => setIsOpen(false)}
        sx={
          width
            ? {
                "& .MuiDialog-paper": {
                  width: width,
                  maxWidth: "none",
                },
              }
            : {}
        }
      >
        <DialogTitle align="right" sx={{ pb: 0 }}>
          <IconButton onClick={() => setIsOpen(false)}>
            <Icon icon="mdi:close" />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{ mt: "-5px", px: isSmallScreen ? 3 : 15, pb: isSmallScreen ? "12px" : "47px" }}
        >
          <DialogContentText variant="h5" align="center">
            {title}
          </DialogContentText>
          {subtitle && (
            <DialogContentText variant="body2" align="center" mt={3}>
              {subtitle}
            </DialogContentText>
          )}
          <Content closeDialog={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DialogComponent;
