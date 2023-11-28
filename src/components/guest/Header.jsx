import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";

const Header = ({ title, subtitle }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="0">
      <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "0px" }}>
        {t(title)}
      </Typography>
      <Typography variant="h5" color={colors.primary[700]}>
        {t(subtitle)}
      </Typography>
    </Box>
  );
};

export default Header;
