import React, { useContext } from "react";
import { Box, Button, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Logout from "../../../../Logout";
import { useTranslation } from "react-i18next";
import HomeIcon from "@mui/icons-material/Home";
import CachedIcon from "@mui/icons-material/Cached";
import { useNavigate } from "react-router-dom";
import LanguageButton from "../../../../partials/LanguageButton";
import ChangeAccess from "../../../guest/auth/ChangeAccess";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const reloadPage = () => {
    navigate(0);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.grey[400]}
        borderRadius="3px"
      ></Box>

      <Box display="flex">
        <Button variant="text" onClick={reloadPage}>
          <CachedIcon />
        </Button>
        <Button
          variant="text"
          color="primary"
          size="small"
          href="/"
          sx={{ textTransform: "none" }}
        >
          <HomeIcon fontSize="small" color="primary" /> &nbsp; {t("home")}
        </Button>

        <LanguageButton />

        <ChangeAccess />

        <Logout />
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;