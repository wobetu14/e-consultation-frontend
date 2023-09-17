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
        width:'100%',
        left:0,
        bottom:0,
      }}
    >
      <Grid container>
        <Grid item xs={5}>
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
        <Grid item xs={4}>
          <Typography
            variant="h4"
            sx={{
              paddingTop: "30px",
              fontWeight: 500,
              color: colors.headerText[100],
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
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              <LocationOnIcon 
                sx={{ color:colors.primary[100] }}
               />
              &nbsp; Bambis, Jomo Kenyatta Avenue, Addis Ababa, Ethiopia
            </Typography>

            <br />
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              <EmailIcon sx={{ color:colors.primary[100] }}/>
              &nbsp; info@eag.gov.et
            </Typography>
            <br />

            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              <PhoneIcon sx={{ color:colors.primary[100] }}/>
              &nbsp; +251 11 551 5099
            </Typography>
            <br />

            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              <LinkIcon sx={{ color:colors.primary[100] }}/>
              &nbsp; https://www.eag.gov.et/
            </Typography>
            <br />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h4"
            sx={{
              paddingTop: "30px",
              fontWeight: 500,
              color: colors.headerText[100],
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
        </Grid>
      </Grid>

      <Grid container>
        {/* <Grid item={12}> */}
        <Box
          sx={{
            padding: "25px",
            backgroundColor: colors.primary[100],
            width: "100%",
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