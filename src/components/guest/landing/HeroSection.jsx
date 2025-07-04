import React, { useState } from "react";
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
import HeroImage from "../../../images/hero_image.png"
import StatsDashboard from "./StatsDashboard";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "60vh",
  background:
    "linear-gradient(135deg, #01579b 0%, rgba(76, 201, 240, 0.7) 100%)",
  padding: theme.spacing(4),
  display: "flex",
  alignItems: "center",
  color: "#1a237e",
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
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

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ModalContent = styled(Paper)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(4),
  maxWidth: "600px",
  maxHeight: "80vh",
  overflow: "auto",
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

const ConsultationHero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

    const navigate = useNavigate();
   const navigateToDraftsList = () => {
     navigate("/drafts");
  };
  
     const navigateToSignup = () => {
       navigate("/create-account");
     };

  return (
    <HeroSection>
      <ContentWrapper maxWidth="lg">
        <TextContent>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "1rem", md: "2rem" },
              fontWeight: 600,
              marginBottom: 2,
              color: "#fff",
            }}
          >
            {t("e_consultation_moto")}
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "0.75rem", md: "1.25rem" },
              fontWeight: 500,
              marginBottom: 3,
              color: "#fff",
            }}
          >
            {t("motto_shape_future")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.1rem" },
              marginBottom: 2,
              color: "#c1cad9",
            }}
          >
            {t('motto_description')}
          </Typography>
          <ButtonGroup>
            <Button
              variant="contained"
              size="large"
              color="primary"
              startIcon={<FaClipboardList />}
              onClick={navigateToDraftsList}
              sx={{
                padding: "12px 24px",
                fontWeight: 600,
                backgroundColor: "#0056D2",
                "&:hover": {
                  transform: "translateY(-2px)",
                  backgroundColor: "#4cc9f0",
                },
                transition: "transform 0.2s",
              }}
            >
              {t('review_draft_laws')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              // startIcon={<FaInfoCircle />}
              onClick={navigateToSignup}
              sx={{
                padding: "12px 24px",
                fontWeight: 600,
                color: "#0056D2",
                borderColor: "#0056D2",
                "&:hover": {
                  borderColor: "#0056D2",
                  backgroundColor: "rgba(13, 71, 161, 0.1)",
                },
              }}
            >
              {t('sign_up')}
            </Button>
          </ButtonGroup>
        </TextContent>
        <ImageContent>
          <img
            src={HeroImage}
            alt="Diverse citizens collaborating on consultation"
            loading="lazy"
          />
        </ImageContent>
      </ContentWrapper>
    </HeroSection>
  );
};

export default ConsultationHero;
