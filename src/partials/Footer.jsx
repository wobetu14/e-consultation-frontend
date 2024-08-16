import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkIcon from "@mui/icons-material/Link";
import BusinessIcon from '@mui/icons-material/Business';
import EULogo from './../images/sponsers_logo/European-Union_flag.png';
import GIZLogo from './../images/sponsers_logo/giz-logo.gif'

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();
  
  // Get Date and time
  const date = new Date();
  const year = date.getFullYear();
  return (
    <Box
      sx={{
        backgroundColor: colors.grey[100],
        zIndex: 0,
        position: "bottom",
        marginTop: "100px",
        width: "100%",
        left: 0,
        bottom: 0,
      }}
    >
      <Grid
        container
        sx={{
          display: {
            xs: "flex", // Hide on extra-small screens
            sm: "flex", // Display as flex on small screens
            md: "flex", // Display as flex on medium screens
            lg: "flex", // Display as flex on large screens
            xl: "flex", // Display as flex on extra-large screens
          },
          flexDirection: {
            xs: "column", // Column direction on extra-small screens
            sm: "column", // Column direction on small screens
            md: "row", // Row direction on medium screens
            lg: "row", // Row direction on large screens
            xl: "row", // Row direction on extra-large screens
          },
        }}
      >
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Box
            sx={{
              paddingRight: "20px",
              paddingTop: "100px",
              marginRight: "20px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 600, color: colors.headerText[100] }}
            >
              {t("ethiopia")}
            </Typography>
            <Typography variant="h4">{t("fdre")}</Typography>
            <Typography variant="subtitle">
              {t("e_consultation_portal")}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
        >
          <Typography
            variant="h4"
            sx={{
              paddingTop: "30px",
              fontWeight: 500,
              color: colors.headerText[100],
              width: {
                xs: "100%", // 100% width on extra-small screens
                sm: "100%", // 75% width on small screens
              },
              textAlign: {
                xs: "center",
                sm: "center",
              },
            }}
          >
            {t("address")}
          </Typography>
          <br />
          <Box
            sx={{
              height: "30vh",
              paddingRight: "25px",
              marginRight: "20px",
              textAlign: {
                xs: "center",
                sm: "center",
              },
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              <BusinessIcon sx={{ color: colors.primary[100] }} />
              &nbsp; {t("ministry_of_justice")}
            </Typography>

            <br />
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              <LocationOnIcon sx={{ color: colors.primary[100] }} />
              &nbsp; {t("physical_address")}
            </Typography>

            <br />
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              <EmailIcon sx={{ color: colors.primary[100] }} />
              &nbsp; info@eag.gov.et
            </Typography>
            <br />

            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              <PhoneIcon sx={{ color: colors.primary[100] }} />
              &nbsp; +251 11 551 5099
            </Typography>
            <br />

            <br />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Typography
            variant="h4"
            sx={{
              paddingTop: "30px",
              fontWeight: 500,
              color: colors.headerText[100],
              textAlign: {
                xs: "center",
                sm: "center",
              },
            }}
          >
            {t("social_media")}
          </Typography>
          <br />
          <Box
            sx={{
              // height:"50vh",
              paddingRight: "25px",
              marginRight: "20px",
              textAlign: {
                xs: "center",
                sm: "center",
              },
            }}
          >
            {/* <Typography variant='h1' sx={{ fontWeight:600 }}> */}
            <FacebookIcon
              sx={{
                fontSize: "30px",
                paddingRight: "5px",
                color: colors.headerText[100],
              }}
            />
            <TwitterIcon
              sx={{
                fontSize: "30px",
                paddingRight: "5px",
                color: colors.headerText[100],
              }}
            />
            <LinkedInIcon
              sx={{
                fontSize: "30px",
                paddingRight: "5px",
                color: colors.headerText[100],
              }}
            />
            <YouTubeIcon
              sx={{
                fontSize: "30px",
                paddingRight: "5px",
                color: colors.headerText[100],
              }}
            />
            {/* </Typography> */}
          </Box>

          <Box
            sx={{
              // height:"50vh",
              paddingRight: "25px",
              marginRight: "20px",
              textAlign: {
                xs: "center",
                sm: "center",
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                paddingTop: "15px",
                fontWeight: 500,
                color: colors.headerText[100],
              }}
            >
              <a
                href="https://www.giz.de/en/html/index.html"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: colors.primary[200] }}
              >
                Developed by <strong>GIZ International Services</strong>
              </a>
            </Typography>
            <a
              href="https://www.giz.de/en/html/index.html"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: colors.primary[200] }}
            >
              <img src={GIZLogo} alt="" />
            </a>

            <Typography
              variant="h5"
              sx={{
                paddingTop: "15px",
                fontWeight: 500,
                color: colors.headerText[100],
              }}
            >
              <a
                href="https://www.eeas.europa.eu/delegations/ethiopia_en"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: colors.primary[200] }}
              >
                Funded by the <strong>European Union</strong>
              </a>
            </Typography>

            <a
              href="https://www.eeas.europa.eu/delegations/ethiopia_en"
              target="_blank"
              rel="noreferrer"
            >
              <img src={EULogo} alt="" />
            </a>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        {/* <Grid item={12}> */}
        <Box
          sx={{
            padding: "25px",
            backgroundColor: colors.primary[200],
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "white" }}>
            &copy; {year} {t("ministry_of_justice")}
          </Typography>
        </Box>
        {/* </Grid> */}
      </Grid>
    </Box>
  );
};

export default Footer;