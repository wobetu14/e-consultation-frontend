import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

/**
 *
 * Image Resources
 */
import RequestdListsWithDetailButtonScreen from "./docImages/RequestdListsWithDetailButtonScreen.png";
import DraftDetailsForReviewScreen from "./docImages/DraftDetailsForReviewScreen.png";
import DocumentPreviewScreen from "./docImages/DocumentPreviewScreen.png";
import DraftAcceptanceDialogScreen from "./docImages/DraftAcceptanceDialogScreen.png";
import FilledOpeningRequestScreen from "./docImages/FilledOpeningRequestScreen.png";
import NewDetailedStatusScreen from "./docImages/NewDetailedStatusScreen.png";
import InviteesListScreen from "./docImages/InviteesListScreen.png";
import EmailNotificationScreen from "./docImages/EmailNotificationScreen.png";

const AcceptOpeningRequestGuide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        To accept the opening request of the document, we need to login as
        “Approver” account. Now let’s login as an Approver and accept the
        request.
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Steps to Accept Draft Opening Request
      </Typography>

      <ol type="A" style={{ marginLeft: "30px" }}>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Login as <strong>Approver</strong>
          </Typography>
        </li>

        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Go to <strong>“Opening Request”</strong> menu item on the main menu
            of the Approver account. A screen with list of uploaded documents
            with their status will appear as shown below.
          </Typography>
          <Box m="0 30px">
            <img
              src={RequestdListsWithDetailButtonScreen}
              alt="Requested Draft Lists Screen"
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
            Click the <strong>“Detail”</strong> action button to review the
            document details and to take action accordingly. The following
            screen will appear which shows the document details and action
            buttons to <strong>accept</strong> or
            <strong>reject</strong> the opening request. On the screen below,
            since we have clicked the document detail whose status is{" "}
            <strong>“Requested”</strong>, available buttons are{" "}
            <strong>“Accept”</strong> and <strong>“Reject”</strong>.
          </Typography>
          <Box m="0 30px">
            <img
              src={DraftDetailsForReviewScreen}
              alt="Requested Draft Lists Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>

          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            The main detailed attributes of the document are displayed. Also, if
            we want to see the reading content of the document, we can click on
            the
            <strong>“Document Review”</strong> button, so that, all contents of
            the document will be displayed as shown below.
          </Typography>
          <Box m="0 30px">
            <img
              src={DocumentPreviewScreen}
              alt="Draft Document Preview Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>

          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            When we are done reviewing the document detail info and its
            contents, then we can take action{" "}
            <strong>(Accept or Reject)</strong>. For this demonstration, let us
            assume everything is ok and let us accept the request.
          </Typography>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Click the <strong>“Accept”</strong> button. An{" "}
            <strong>“acceptance and opening”</strong> dialog box will appear as
            shown on below.
          </Typography>
          <Box m="0 30px">
            <img
              src={DraftAcceptanceDialogScreen}
              alt="Draft Acceptance Dialog Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>

          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Let us see each form element of this dialog box one by one. There
            are 3 main actions we can accomplish on the dialog box shown. On the
            first element labeled by #1, we can set opening and closing date of
            the document. The draft document will be available for commenting
            only within the opening and closing date of the document. On the
            second form element labeled by #2, we will assign repliers who can
            provide a reply information on the comments provided by commenters.
            Repliers are staffs from the institution who initiated the draft
            legal document. Institutional commenters can be assigned to provide
            expert level reply to comments. Also in #2, we can invite other
            institutions to provide their professional consultations on the
            draft document via their legal expert staffs. On the third form
            element labeled by #3, we can invite individual commenters via their
            email so that they can provide professional consultations on the
            legal document.
          </Typography>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Now let’s fill the appropriate data on each field and open it for
            comment by clicking
            <strong>“Publish Draft for Comment”</strong>.
          </Typography>
          <Box m="0 30px">
            <img
              src={FilledOpeningRequestScreen}
              alt="Draft Acceptance Dialog Screen"
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
            Now the document has been opened / published for comment
            successfully. The detail information with the new status of the
            document is shown below.
          </Typography>
          <Box m="0 30px">
            <img
              src={NewDetailedStatusScreen}
              alt="New Detailed Satus Dialog Screen"
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
            Now that the status of the document has changed to “Open” and
            opening and closing dates for commenting are set. Also, action
            buttons has changes based on the status of the document. Once we set
            the status of the document to <strong>“Open”</strong>, action
            buttons are changed into
            <strong>“Invite”</strong>, <strong>“Assign Repliers”</strong> or{" "}
            <strong>“Close commenting”</strong> so that we can again invite,
            assign repliers or close commenting at anytime later. This is
            important because at the time accepting and opening the draft
            document, we may miss to assign repliers or invite people or
            institutions, so we can do it at anytime later.
          </Typography>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Below the documents detail description, we also can find list of
            peoples and institutions we have assigned or sent an invite. Here is
            the screenshot.
          </Typography>
          <Box m="0 30px">
            <img
              src={InviteesListScreen}
              alt="Invitees List Screen"
              style={{
                maxWidth: "80%",
                height: "auto",
                marginTop: "15px",
                border: `1.5px solid ${colors.brandColor[200]}`,
              }}
            />
          </Box>

          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            People and institutions will receive their invitation and assignment
            via their email addresses as shown below.
          </Typography>
          <Box m="0 30px">
            <img
              src={EmailNotificationScreen}
              alt="Email Notifications Screen"
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

export default AcceptOpeningRequestGuide;