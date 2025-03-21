import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Container,
  Typography,
  Modal,
  Paper,
  styled,
  ButtonGroup,
} from "@mui/material";
import { FaClipboardList, FaInfoCircle } from "react-icons/fa";
import axios from "../../../axios/AxiosGlobal";
import { RefreshOutlined } from "@mui/icons-material";
import Loading from "../../../Loading";
import { Link, useNavigate } from "react-router-dom";
import RecentDocsList from "./RecentDocsList";

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(4),
  display: "flex",
  alignItems: "center",
  color: "#000",
  //   border: "2px dotted #4cc9f0",
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

// background: "linear-gradient(90deg, #4cc9f0,  10%, #ffffff 90%)",
const RecentDocs = () => {
  const { t } = useTranslation();

  // Define variable for retrieving and setting document data
  const [drafts, setDrafts] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  // Define variable for setting 'loading' state while app is in progress requesting API data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrafts();
  }, []);

   const navigate = useNavigate();

   const navigateToDraftsList = () => {
     window.open("/drafts", "_parent");
  };


   const handleNetworkStatus = () => {
     fetchDrafts();
   };

  const fetchDrafts = async () => {
    setNetworkError(null);
    return await axios
      .get(`drafts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setDrafts(res.data.data.data.slice(0, 3));
        setNetworkError(null);
      })
      .catch((error) => {
        setNetworkError(error.name);
      });
  };

  return (
    <HeroSection>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontWeight: 500,
          marginBottom: 2,
          color: "#0d47a1",
          textAlign: "center",
        }}
      >
        {t("recently_opened_laws")}
      </Typography>
      <ContentWrapper
        maxWidth="md"
        sx={{
          background: "linear-gradient(135deg, #ffffff,  90%, #4cc9f0  100%)",
          borderRadius: "20px 20px",
          padding: "50px",
          overflow: "50px",
          boxShadow: "4px 5px #e0e0e0",
        }}
      >
        <TextContent>
          <Box>
            {drafts ? (
              drafts.map((draft) => (
                <Link
                  to={`/draft/${draft.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <RecentDocsList
                    deadline={"May 02, 2023"}
                    draft={draft}
                    setDrafts={setDrafts}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </Link>
              ))
            ) : networkError === "AxiosError" ? (
              // Display error info to the user if there is an exception in an http axios request.
              <Typography variant="body1">
                Your internet connection may be unstable. You can &nbsp;
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={handleNetworkStatus}
                >
                  Try again <RefreshOutlined />
                </Button>
              </Typography>
            ) : (
              <>
                {/* Render <Loading /> component if drafts value is empty */}
                <Loading />
                <Loading />
                <Loading />
              </>
            )}
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <ButtonGroup>
              <Button
                variant="contained"
                size="large"
                color="primary"
                // startIcon={<FaClipboardList />}
                onClick={navigateToDraftsList}
                sx={{
                  // textTransform:"none",
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
                {t("explore_more")}
              </Button>
            </ButtonGroup>
          </Box>
        </TextContent>
      </ContentWrapper>
    </HeroSection>
  );
};

export default RecentDocs;
