"use client";

import TokenService from "@/api/services/token.service";
import { authNavigation, defaultNavigation } from "@/shared/config/navigation.config";
import Routes from "@/shared/config/routes.config";
import { useLDTheme } from "@/shared/theme/ThemeProvider";
import { Button, IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import { useEffect, useState } from "react";
import LogoutConfirmationDialog from "@/view/auth/LogoutConfirmationDialog";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  marginRight: theme.spacing(8),
}));

const Navigation = () => {
  const router = useRouter();
  const theme = useTheme();
  const { toggleMode, mode } = useLDTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(TokenService.isAuthorized());
  const isDarkMode = mode === "dark";
  const logoSrc = isDarkMode ? "/logo-dark.svg" : "/logo.svg";
  const navigation = isLoggedIn ? authNavigation : defaultNavigation;

  const logout = () => {
    TokenService.removeTokens();
    window.dispatchEvent(new Event("authChange"));
    router.push("/auth/login");
  };

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(TokenService.isAuthorized());
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  return (
    <Stack
      direction="row"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      paddingX={3}
      borderBottom={`2px solid ${theme.palette.background.paper}`}
      position="sticky"
    >
      <LinkStyled href={Routes.mainPage}>
        <Image width={100} height={80} src={logoSrc} alt="company logo" />
      </LinkStyled>
      <Stack spacing={2} direction="row">
        {navigation.map((item) => (
          <Button variant="outlined" LinkComponent={Link} href={item.path} key={item.title}>
            {item.title}
          </Button>
        ))}
      </Stack>
      <Stack direction="row" spacing={4}>
        <Tooltip title="Сменить тему">
          <IconButton onClick={toggleMode}>
            <Icon icon="mdi:theme-light-dark" />
          </IconButton>
        </Tooltip>
        {isLoggedIn && <LogoutConfirmationDialog handleLogout={logout} />}
      </Stack>
    </Stack>
  );
};

export default Navigation;
