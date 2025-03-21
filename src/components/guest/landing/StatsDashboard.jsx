import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Grid, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { FaUsers, FaFileAlt, FaBuilding, FaComments } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const StatsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(5),
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

const StatsDashboard = ({
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

  const statsData = [
    {
      icon: <FaUsers />,
      value: userCount,
      label: t("total_users"),
    },
    {
      icon: <FaFileAlt />,
      value: documentCount,
      label: t("total_documents"),
    },
    {
      icon: <FaBuilding />,
      value: institutionCount,
      label: t("institutions_info"),
    },
    {
      icon: <FaComments />,
      value: commentsCount,
      label: t('total_comments'),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3, minHeight: "60vh" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2rem", md: "2rem" },
          // fontWeight: 600,
          marginBottom: 2,
          color: "#0d47a1",
          paddingTop: "50px",
          paddingBottom: "20px",
          textAlign: "center",
        }}
      >
        {t("stat_numbers")}
      </Typography>
      <Grid container spacing={4}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatsCard
              aria-label={`${stat.label} statistics card`}
              elevation={0}
              variant="outlined"
            >
              <IconWrapper>{stat.icon}</IconWrapper>
              <Typography
                variant="h3"
                component="div"
                gutterBottom
                sx={{ color: "#0d47a1" }}
              >
                {isVisible && stat.value.toLocaleString()}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "medium",
                  color: "#0d47a1",
                }}
              >
                {stat.label}
              </Typography>
            </StatsCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsDashboard;
