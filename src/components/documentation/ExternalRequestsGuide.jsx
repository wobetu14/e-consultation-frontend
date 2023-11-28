import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@emotion/react";

import ExternalRequestsListScreen from "./docImages/ExternalRequestsListScreen.png";
import ExternalRequestsAcceptanceDialogScreen from "./docImages/ExternalRequestsAcceptanceDialogScreen.png";

import Box from "@mui/material/Box";
import { tokens } from "../../theme";

const ExternalRequestsGuide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        External requests are invitations to other institutions to let them
        contribute in the consultation process by assigning their legal experts
        to provide comments on a specific draft document. As we have seen above,
        while we <strong>accept</strong> and <strong>open</strong> the document
        for comment, we can send invitations to other institutions to comment on
        the document. After sending invitations, the receiving institution can{" "}
        <strong>accept</strong> or <strong>reject</strong> the invitation as
        well as assign their experts to comment on the specific document. The{" "}
        <strong>Approver</strong> of the receiving institution is responsible
        for
        <strong>accepting</strong>, <strong>rejecting</strong> as well as{" "}
        <strong>assigning commenters</strong>.
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Steps to accept External Invitations / Requests:
      </Typography>

      <ol type="A" style={{ marginLeft: "30px" }}>
        <li>
          <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
            Go to “External Requests” menu item on the Approvers dashboard. The
            following screen will appear.
          </Typography>
          <Box m="0 30px">
            <img
              src={ExternalRequestsListScreen}
              alt="External Requests List Screen"
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
            To accept, click on “Accept” action button. An acceptance dialog box
            will appear. Here we can write acceptance message. We can also,
            choose from our experts and assign to comment on the document. After
            writing and selecting commenters, click on “Accept and Close” action
            button to complete the acceptance process.
          </Typography>
          <Box m="0 30px">
            <img
              src={ExternalRequestsAcceptanceDialogScreen}
              alt="External Requests Acceptance Dialog Screen"
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

export default ExternalRequestsGuide;
