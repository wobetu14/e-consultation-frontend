import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import Footer from "../../partials/Footer";
import ConsultationHero from "./landing/HeroSection";
import StatsDashboard from "./landing/StatsDashboard";
import AboutSection from "./landing/AboutSection";
import HowToSection from "./landing/HowToSection";
import RecentDocs from "./landing/RecentDocs";

const About = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <AboutSection />

      <HowToSection />

      <RecentDocs />

      <Footer />
    </div>
  );
};

export default About;