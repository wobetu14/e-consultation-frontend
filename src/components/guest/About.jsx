import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import Footer from "../../partials/Footer";

const About = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  return (
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
              sx={{
                fontWeight: "600",
                marginBottom: "20px",
                color: colors.brandColor[100],
              }}
              variant="h3"
            >
              {t("about_title")}
            </Typography>
            <Typography variant="body1" textAlign={"justify"}>
              {t("about_description")}
            </Typography>
          </Box>
        </Grid>
      </motion.span>

      <Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default About;