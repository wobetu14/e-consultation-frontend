import { Box } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../AdminHeader";
import IncomingCommentRequests from "../partials/IncomingCommentRequests";

const ExternalCommentRequests = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  return (
    <Box
      m="0 20px"
      sx={{
        width: {
          xs: 300,
          sm: 500,
          md: 700,
          lg: 1000,
          xl: 1200,
        },
      }}
    >
      <Header
        title={t("external_comment_requests")}
        subtitle={t("receive_request_for_comment_from_external_institutions")}
      />
      <IncomingCommentRequests loading={loading} setLoading={setLoading} />
    </Box>
  );
};

export default ExternalCommentRequests;
