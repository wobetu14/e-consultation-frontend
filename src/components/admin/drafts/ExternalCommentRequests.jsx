import { Box } from "@mui/system";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../AdminHeader";
import IncomingCommentRequests from "../partials/IncomingCommentRequests";

/**
 * This component is used to render incoming comment requests from other external organizations 
 */
const ExternalCommentRequests = () => {
  /**
   * Create state to store a boolean values and based on it, display a progressbar 
   */
  const [loading, setLoading] = useState(false);

  /**
   * Destructure the translation object from i18next internationalization API using the useTranslation() hook
   */
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
      {/**
       * Render Incoming requests. 
       * Render Heading text
       */}
      <Header
        title={t("external_comment_requests")}
        subtitle={t("receive_request_for_comment_from_external_institutions")}
      />

      {/**
       * Render IncomingCommentRequests component. Go to the component definition to understand more
       */}
      <IncomingCommentRequests loading={loading} setLoading={setLoading} />
    </Box>
  );
};

export default ExternalCommentRequests;
