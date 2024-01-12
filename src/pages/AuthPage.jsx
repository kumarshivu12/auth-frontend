import React from "react";
import Wrapper from "../features/Wrapper";
import { Outlet } from "react-router-dom";
import { Fab, Stack } from "@mui/material";
import { useSettings } from "../context/SettingsContext";
import { Moon, Sun } from "phosphor-react";

const AuthPage = () => {
  const { themeMode, onToggleMode } = useSettings();
  return (
    <Wrapper>
      <Stack
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Fab
          sx={{ position: "absolute", bottom: 20, right: 20 }}
          color="primary"
          aria-label="add"
          onClick={onToggleMode}
        >
          {themeMode === "light" ? <Sun size={"24"} /> : <Moon size={"24"} />}
        </Fab>
        <Outlet />
      </Stack>
    </Wrapper>
  );
};

export default AuthPage;
