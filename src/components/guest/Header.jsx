import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";

/**
 * This component is used for rendering header title and subtitle 
 * about the functions of the rendered UI on the body section of the admin panel
 */

/**
 * Create a functional component named Header
 */
const Header = ({ title, subtitle }) => {
  /**
   * Destructure translation value from the useTranslation hook of the i18next internationalization library
   */
  const { t } = useTranslation();

  /**
   * Access theme object from the useTheme user defined hook
   */
  const theme = useTheme();

  /**
   * Access color mode for dark and light themes.
   */
  const colors = tokens(theme.palette.mode);

  return (
    /**
     * Create UI for rendering title and subtitle values. Enclose the UI with Box element of Material UI
     */
    <Box mb="0">
      {/**
       * Render title with Typography of h5 variant
       */}
      <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "0px" }}>
        {t(title)}
      </Typography>

      {/**
       * Render subtitle value with Typography of h5 variant
       */}
      <Typography variant="h5" color={colors.primary[700]}>
        {t(subtitle)}
      </Typography>
    </Box>
  );
};

export default Header;
