import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";

import CommentInsightsScreen from "./docImages/CommentInsightsScreen.png";
import CommentReportsPDFScreen from "./docImages/CommentReportsPDFScreen.png";

import Box from "@mui/material/Box";
import { tokens } from "../../theme";

const GettingCommentInsightsGuide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Once the document is closed for comment, a comment insight and report
        will be available for download. This report is available for everyone
        who want for taking further action or just to have a general
        understanding about the document.
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        To access this report:
      </Typography>

      <ol type="A" style={{ marginLeft: "30px" }}>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Go to homepage of the portal
          </Typography>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Click on the document you want to see the details from the list on
            the homepage
          </Typography>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            The document’s detail screen will appear as shown below. Here, if
            the document is “closed for comment”, a card labeled as Document
            Insight” will be available.
          </Typography>

          <Box m="0 30px">
            <img
              src={CommentInsightsScreen}
              alt="Comment Insights Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Click the <strong>“Comment reports”</strong> button to download the
            comment report. A PDF document with the following format will
            appear.
          </Typography>

          <Box m="0 30px">
            <img
              src={CommentReportsPDFScreen}
              alt="Comment Requests PDF file Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>
        </li>
      </ol>
    </>
  );
};

export default GettingCommentInsightsGuide;
