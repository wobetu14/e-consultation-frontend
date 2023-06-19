import React from "react";
import { Outlet } from "react-router-dom";

import { ColorModeContext, useMode, tokens } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "../components/admin/partials/global/Topbar";
import CommenterSidebar from "../components/guest/CommenterSidebar";

function CommenterLayout() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ backgroundColor: colors.grey[100] }}>
          <CommenterSidebar />
          <main className="content">
            <Topbar />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default CommenterLayout;