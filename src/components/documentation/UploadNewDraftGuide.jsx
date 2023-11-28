import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

/**
 *
 * Image Resources
 */
import DraftManagementScreen from "./docImages/DraftManagementScreen.png";
import SaveDraftButtonScreen from "./docImages/SaveDraftButtonScreen.png";
import UploadingDraftProgressScreen from "./docImages/UploadingDraftProgressScreen.png";

const UploadNewDraftGuide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Now that we have created all the required data necessary to upload a
        draft law document. It is time to upload a new draft document. Let’s get
        started. To upload a document, we need to have{" "}
        <strong>“Uploader”</strong> user account of a specific organization. Let
        us create a document owned by <strong>FDRE Ministry of Justice</strong>{" "}
        for this demonstration.
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Steps to Upload New Document
      </Typography>

      <ol type="A" style={{ marginLeft: "30px" }}>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Assume we have Uploader account from the Ministry of Justice.
          </Typography>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Login as an <strong>Uploader</strong>
          </Typography>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            <strong>Uploader</strong> dashboard screen will appear as shown
            below. The documents management screen is just on the dashboard of
            the <strong>Uploader</strong> account.
          </Typography>
          <Box m="0 30px">
            <img
              src={DraftManagementScreen}
              alt="Drafts Management Screen"
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
            Click on the <strong>“+ Add New Draft”</strong> button. A new draft
            law uploader form will appear as shown below.
          </Typography>
          <Box m="0 30px">
            <img
              src={SaveDraftButtonScreen}
              alt="Save Draft Information Screen"
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
            Fill appropriate data on the given form fields and then click{" "}
            <strong>“Save”</strong>. Note that the fields that are indicated
            with “*” symbol are required fields. Then the system starts to
            upload the document. Here we need to understand one important point.
            The system is not simply uploading the document for download
            availability. Instead, it extracts its contents article by article
            and makes it easy to display the content on the web page so that
            viewers can explore the document article by article and they will be
            able to provide document level comments (general comments), as well
            as section / article level comments. The document will also be
            available for download as MS Word document.
          </Typography>

          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            When you click, it starts to extract and upload the document at the
            same time. A loading progress bar will be displayed to indicate the
            process.
          </Typography>
          <Box m="0 30px">
            <img
              src={UploadingDraftProgressScreen}
              alt="Upload Draft Progress Screen"
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
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Important notes about preparing and uploading document
      </Typography>

      <ul type="square">
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "5px" }}>
            We are allowed to upload only MS Word documents (.doc or .docx files
            - .docx is highly recommended).
          </Typography>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            We have to prepare the draft document in such a way that titles and
            subtitles should be formatted as <strong>“Heading 1”</strong>,{" "}
            <strong>“Heading 2”</strong>, <strong>“Heading 3”</strong>
            etc in <strong>Microsoft Word</strong>.
          </Typography>
        </li>
      </ul>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Now that we have successfully uploaded the draft document. Yet the
        uploaded document could not be automatically available for commenters.
        At this time, it will be at <strong>“New / Pending”</strong> state to be
        approved and opened for comment. It needs to pass some validation
        process. After the <strong>Uploader</strong> uploads the document, he /
        she will send a request to the <strong>approver</strong> so that the{" "}
        <strong>approver</strong> reviews the document info and approves it to
        be published and open for comment.
      </Typography>
    </>
  );
};

export default UploadNewDraftGuide;
