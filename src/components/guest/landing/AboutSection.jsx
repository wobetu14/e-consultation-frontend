import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  Typography,
  Modal,
  Paper,
  styled,
} from "@mui/material";
import { FaClipboardList, FaInfoCircle } from "react-icons/fa";
import HeroImage from "../../../images/hero_image.png";
import StatsDashboard from "./StatsDashboard";

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "70vh",
  background: "linear-gradient(135deg, #ffffff 50%, #4cc9f0 50%)",
  padding: theme.spacing(4),
  display: "flex",
  alignItems: "center",
  color: "#000",
  border: "2px dotted #4cc9f0",
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(2),
  },
}));

//   background:
// "linear-gradient(135deg, rgba(26, 35, 126, 0.7) 0%, rgba(13, 71, 161, 0.5) 50%, rgba(26, 35, 126, 0.3) 100%)",
const ImageContent = styled(Box)(({ theme }) => ({
  flex: 1,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,

    zIndex: 1,
    mixBlendMode: "multiply",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    /*     background:
      "linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%)", */
    pointerEvents: "none",
    zIndex: 2,
  },
  "& img": {
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    borderRadius: theme.spacing(2),
    transform: "scale(1.02)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

const AboutSection = () => {
    const { t } = useTranslation();
  return (
    <HeroSection>
      <ContentWrapper maxWidth="lg">
        <ImageContent>
          <Typography variant="h1" color="initial" sx={{ color: "#0d47a1" }}>
            {t("e_consultation_moto")}
          </Typography>
        </ImageContent>
        <TextContent>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: "1rem", md: "2rem" },
              fontWeight: 500,
              marginBottom: 2,
              color: "#0d47a1",
            }}
          >
            {t("e_consultation_portal")}
          </Typography>

          <Typography
            variant="body1"
            sx={{ textAlign: "justify", fontSize: "1.5em" }}
          >
            {t("about_description")}
          </Typography>
        </TextContent>
      </ContentWrapper>
    </HeroSection>
  );
};

export default AboutSection;
