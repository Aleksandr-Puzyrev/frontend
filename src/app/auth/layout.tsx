"use client";

import Icon from "@/components/Icon";
import { useLDTheme } from "@/shared/theme/ThemeProvider";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Tooltip,
} from "@mui/material";
import Image from "next/image";

const WrapperSx: SxProps<Theme> = {
  width: "100vw",
  height: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  const { toggleMode, mode } = useLDTheme();
  const isDarkMode = mode === "dark";
  const logoSrc = isDarkMode ? "/logo-dark.svg" : "/logo.svg";

  return (
    <Box sx={WrapperSx}>
      <Card sx={{ width: 450, borderRadius: "20px" }} variant="outlined">
        <CardHeader
          sx={{ p: 8, pb: 0, pt: 2 }}
          title={
            <Box textAlign="center">
              <Stack alignItems="end">
                <Tooltip title="Сменить тему" placement="top">
                  <IconButton onClick={toggleMode}>
                    <Icon icon="mdi:theme-light-dark" />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Image width={164} height={110} src={logoSrc} alt="logo" />
            </Box>
          }
        />
        <CardContent sx={{ px: 8 }} style={{ paddingBottom: 28 }}>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthLayout;
