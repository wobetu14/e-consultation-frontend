import { useTheme } from "@emotion/react";
import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../partials/Footer";
import { tokens } from "../../theme";
import AccordionContainer from "./AccordionContainer";

const HelpCenter = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Grid
            container
            sx={{
              paddingTop: "100px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                margin: {
                  xs: "0 20px",
                  sm: "0 20px",
                  md: "0 100px",
                  lg: "0 250px",
                  xl: "0 300px",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "600",
                  marginBottom: "20px",
                  color: colors.brandColor[100],
                }}
              >
                {t("user_guide")}
              </Typography>
              <AccordionContainer />
            </Box>
          </Grid>
        </motion.span>
      </Box>

      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default HelpCenter;
