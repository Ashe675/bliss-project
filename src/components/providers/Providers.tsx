"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/config/theme/MUITheme";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};
