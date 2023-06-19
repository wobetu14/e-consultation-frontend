import { Box } from "@mui/system";
import React from "react";
import Header from "../AdminHeader";
import IncomingCommentRequests from "../partials/IncomingCommentRequests";

const ExternalCommentRequests = () => {
  return (
    <Box m="0 20px" width={"95%"}>
      <Header
        title="External Comment Requests"
        subtitle="Receive Request for Comment from other Institutions"
      />
      <IncomingCommentRequests />
    </Box>
  );
};

export default ExternalCommentRequests;