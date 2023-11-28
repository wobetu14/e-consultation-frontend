import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";

import OpenedDraftsHomeScreen from "./docImages/OpenedDraftsHomeScreen.png";
import DocumentDetailsScreen from "./docImages/DocumentDetailsScreen.png";
import InvitationsListScreen from "./docImages/InvitationsListScreen.png";
import InstitutionalInvitationScreen from "./docImages/InstitutionalInvitationScreen.png";
import AssignedStafftoReplyScreen from "./docImages/AssignedStafftoReplyScreen.png";
import CommentersDashboardScreen from "./docImages/CommentersDashboardScreen.png";
import ReflectionsOnCommentsScreen from "./docImages/ReflectionsOnCommentsScreen.png";

import Box from "@mui/material/Box";
import { tokens } from "../../theme";

const CommentingOnDraft = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Once the draft legal document is opened for comment, it will be
        available for the public on the portal’s homepage as shown below and any
        authenticated user can comment on it.
      </Typography>

      <Box m="0 30px">
        <img
          src={OpenedDraftsHomeScreen}
          alt="Opened Drafts Home Screen"
          style={{
            maxWidth: "80%",
            height: "auto",
            marginTop: "15px",
            border: `1.5px solid ${colors.brandColor[200]}`,
          }}
        />
      </Box>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        When we click on it, detail information of the document, a download link
        and the document’s detailed content will be displayed. And if we are
        logged in as a commenter account, we are able to provide a comment on
        the document.
      </Typography>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Now let’s login as a commenter account and explore the document and
        let’s provide a comment.
      </Typography>

      <Box m="0 30px">
        <img
          src={DocumentDetailsScreen}
          alt="Opened Drafts Home Screen"
          style={{
            maxWidth: "80%",
            height: "auto",
            marginTop: "15px",
            border: `1.5px solid ${colors.brandColor[200]}`,
          }}
        />
      </Box>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        So far, we have seen how to provide comment as an authenticated public
        user. However, as we might have discussed so far, comments can be
        provided through invitations to professional experts as well as by
        requesting other institutions to comment on the document. For example,
        remember that we have sent individual invitations for two people to
        provide their comment on this document (
        <strong>wobetushiferaw@gmail.com</strong> and{" "}
        <strong>rohatechshow@gmail.com</strong>). The people with these email
        addresses will receive an invitation email with the document URL (web
        link) to provide their expert comment on the document.
      </Typography>

      <Box m="0 30px">
        <img
          src={InvitationsListScreen}
          alt="Personal Invitations Screen"
          style={{
            maxWidth: "80%",
            height: "auto",
            marginTop: "15px",
            border: `1.5px solid ${colors.brandColor[200]}`,
          }}
        />
      </Box>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        In addition to personal invitation, we can also send requests to
        institutions (that we assume they are potential stakeholder) to assign
        their professional experts to comment on the document. The assigned
        experts can then comment on the draft document.
      </Typography>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        See the below example screenshot:
      </Typography>

      <Box m="0 30px">
        <img
          src={InstitutionalInvitationScreen}
          alt="Institutional Invitation Screen"
          style={{
            maxWidth: "80%",
            height: "auto",
            marginTop: "15px",
            border: `1.5px solid ${colors.brandColor[200]}`,
          }}
        />
      </Box>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Requested institituions can explore the invitation and they can accept
        or reject the invitation. If they accept the invitation, they can assign
        experts from their institution to provide expert comments on th draft
        document. Note that, in this process only assigned persons through their
        institution can access the document and can provide comments on the
        documents
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Reflections on Comments
      </Typography>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Now that let us see how an expert can provide replies to comments. Note
        that only the experts who are assigned by the <strong>Approver</strong>{" "}
        can provide a reply to comments. Let’s see who have been assigned to
        this document as a replier:
      </Typography>

      <Box m="0 30px">
        <img
          src={AssignedStafftoReplyScreen}
          alt="Assigned Staff to Reply Screen"
          style={{
            maxWidth: "80%",
            height: "auto",
            marginTop: "15px",
            border: `1.5px solid ${colors.brandColor[200]}`,
          }}
        />
      </Box>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        When we login as <strong>Solomon Habtu</strong> or{" "}
        <strong>Mekides Mekonnen</strong>, we can see list of documents we are
        assigned to reply on our dashboard. Let’s login as Solomon Habtu and see
        what how we can do this.
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Steps
      </Typography>

      <ol type="A" style={{ marginLeft: "30px" }}>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Click the <strong>“DASHBOARD”</strong> link on the homepage,
            commenters dashboard screen will appear
          </Typography>
        </li>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Click the <strong>“Assignments”</strong> menu item on the main menu
            list. A screen with list of assigned documents will display.
          </Typography>

          <Box m="0 30px">
            <img
              src={CommentersDashboardScreen}
              alt="Commenters Dashboard Screen"
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
            Click the <strong>“Reply to comments on this document”</strong>{" "}
            button found in front of the document you are interested in to
            comment. Then detail information of the document and its content
            will display with the ability to see the comments and a box to reply
            on each comment.
          </Typography>

          <Box m="0 30px">
            <img
              src={ReflectionsOnCommentsScreen}
              alt="Reflections on Comments Screen"
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

export default CommentingOnDraft;