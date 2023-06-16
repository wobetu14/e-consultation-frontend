import React, { useContext } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Logout from "../../../../Logout";
import { useTranslation } from "react-i18next";
import HomeIcon from "@mui/icons-material/Home";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { t } = useTranslation();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.grey[400]}
        borderRadius="3px"
      ></Box>

      <Box display="flex">
        <Button
          variant="text"
          color="primary"
          size="small"
          href="/"
          sx={{ textTransform: "none" }}
        >
          <HomeIcon fontSize="small" color="primary" /> &nbsp; {t("home")}
        </Button>
        <Logout />
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;