import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Grid, useTheme, ButtonGroup, Button } from "@mui/material";
import { styled } from "@mui/system";
import { FaUsers, FaFileAlt, FaBuilding, FaComments } from "react-icons/fa";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, timelineItemClasses, TimelineSeparator } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StatsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  transition: "all 0.3s ease",
  height: "100%",
  cursor: "pointer",
  // backgroundColor: "#ffffff",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[8],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  fontSize: "2.5rem",
  marginBottom: theme.spacing(2),
  color: "#0d47a1",
}));

const HowToSection = ({
  userCount = 1234,
  documentCount = 230,
  institutionCount = 27,
  commentsCount = 2468,
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const { t } = useTranslation();


  useEffect(() => {
    setIsVisible(true);
  }, []);

      const navigate = useNavigate();
     const openVideoTutorial = () => {
       window.open("https://youtu.be/SgH5c3S9Ol0", "_blank");
    };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        minHeight: "60vh",
        background: "linear-gradient(90deg, #4cc9f0,  10%, #ffffff 90%)",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          // fontWeight: 600,
          marginBottom: 2,
          color: "#0d47a1",
          paddingTop: "50px",
          paddingBottom: "50px",
          textAlign: "center",
        }}
      >
        {t("how_it_works")}
      </Typography>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ fontSize: "1.5em" }}>
              {`${t("sign_up")} / ${t("register_and_login")}`}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ fontSize: "1.5em" }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t("browse_draft_list"),
                }}
              />
              {/*               Browse list of draft laws by clicking on{" "}
              <strong>Review Draft Laws</strong> button here on the home page */}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ fontSize: "1.5em" }}>
              {t("open_interested_draft_law")}
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="body1" sx={{ fontSize: "1.5em" }}>
              {t("provide_comment")}
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              variant="body1"
              sx={{ fontSize: "1.5em", color: "#118B50" }}
            >
              <strong>{t("done")}</strong>
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>

      <Box display="flex" justifyContent="flex-center">
        <ButtonGroup>
          <Button
            variant="contained"
            size="large"
            color="primary"
            // startIcon={<FaClipboardList />}
            onClick={openVideoTutorial}
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
            {t("check_short_video_tutorial")}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default HowToSection;
