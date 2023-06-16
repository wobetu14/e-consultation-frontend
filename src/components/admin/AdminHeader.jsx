import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useTranslation } from "react-i18next";

const Header = ({ title, subtitle }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="20px">
      <Typography
        variant="h5"
        color={colors.headerText[100]}
        sx={{ mb: "5px", fontWeight: 600 }}
      >
        {t(title)}
      </Typography>
      <Typography variant="h5" color={colors.headerText[100]}>
        {t(subtitle)}
      </Typography>
    </Box>
  );
};

export default Header;