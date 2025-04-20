import { Button, Chip, Grid2 as Grid } from "@mui/material";
import React from "react";

interface SuccessGenerateProps {
  lessonTitle: string;
  onGenerate: () => void;
  isDisabled?: boolean;
}

const SuccessGenerate = ({ lessonTitle, onGenerate, isDisabled }: SuccessGenerateProps) => {
  return (
    <Grid container spacing={4}>
      <Grid size={6}>
        <Chip
          label={`Урок сгенерирован! Тема: ${lessonTitle}`}
          color="success"
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid size={6}>
        <Button variant="outlined" onClick={onGenerate} disabled={isDisabled} fullWidth>
          Сгенерировать повторно
        </Button>
      </Grid>
    </Grid>
  );
};

export default SuccessGenerate;
