import { Box } from "@mui/system";
import React, { useState } from "react";
import Header from "../AdminHeader";
import IncomingCommentRequests from "../partials/IncomingCommentRequests";

const ExternalCommentRequests = () => {
  const [loading, setLoading]=useState(false);
  return (
    <Box m="0 20px"  sx={{ width:{
      xs:300, sm:500, md:700, lg:1000, xl:1200
    } }}>
      <Header
        title="External Comment Requests"
        subtitle="Receive Request for Comment from other Institutions"
      />
      <IncomingCommentRequests loading={loading} setLoading={setLoading} />
    </Box>
  );
};

export default ExternalCommentRequests;