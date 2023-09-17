import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { ColorModeContext, useMode, tokens } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Topbar from "../components/admin/partials/global/Topbar";
import Sidebar from "../components/admin/partials/global/Sidebar";
import { UserContext } from "../contexts/UserContext";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ backgroundColor: colors.grey[100] }}>
          <Sidebar />
          <main className="content">
            <Topbar />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;