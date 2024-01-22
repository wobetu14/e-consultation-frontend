import {
  Box,
  Collapse,
  Grid,
  Typography,
  useTheme,
  ListItemButton,
  ListItemText,
  Alert,
  LinearProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axios/AxiosGlobal";
import { tokens } from "../../../theme";
import { motion } from "framer-motion";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import DraftMetaInfo from "./DraftMetaInfo";
import DocumentPreview from "./DocumentPreview";

import PersonalInvitations from "./Personalnvitations";
import InstitutionInvitations from "./InstitutionInvitations";
import CommentRepliers from "./CommentRepliers";
import { useTranslation } from "react-i18next";

/**
 * This component is used to see detail information of the documnet along with action buttons to 
 * "Accept", "Reject" etc that allows to "Accept" or "Reject" the document 
 */

/**
 * Create a functional component named "DocumentDetails"
 */
const DocumentDetails = () => {
  /**
   * Create a variable "params" used to access value from the useParams hook. The useParams hook is used to 
   * access parameter values from the page URL
   */
  const params = useParams();

  /**
   * Create variable to store values about the document, its section comments as well as document level comments
   */
  const [documentDetail, setDocumentDetail] = useState(null);
  const [documentSections, setDocumentSections] = useState(null);
  const [documentComments, setDocumentComments] = useState(null);

  /**
   * Access theme object from the useTheme user defined hook
   */
  const theme = useTheme();

  /**
   * Access color mode for dark and light themes.
   */
  const colors = tokens(theme.palette.mode);

  /**
   * Create variable to store and access error and success information 
   * of https request and response results
   */
  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  /**
   * Create variable to show a progressbar to indicate whether the 
   * http request is completed or not
   */
  const [loading, setLoading] = useState(false);

  /**
   * Destructure and access the translation object from the useTranslation hook 
   * from the i18next internationalization library.
   */
  const { t } = useTranslation();

  /**
   * Create CSS style to markup the error and success message information
   */
  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  const successStyle = {
    color: "green",
    fontWeight: "400",
    fontSize: "18px",
  };

  /**
   * Create a variable used in a toggle button used to show and hide the document preview. 
   * This functionality is used to show or hide the document content is the user wants to preview 
   * it used to decide before going to take action. The initial value for this variable is false, means, 
   * it is hidden by default.
   */
  const [previewOpen, setPreviewOpen] = React.useState(false);

  /**
   * a method to toggle the preview button
   */
  const handlePreviewCollapse = () => {
    setPreviewOpen(!previewOpen);
  };

  /**
   * Method call to fetch document details with the useEffect hook
   */
  useEffect(() => {
    fetchDocumentDetails();
  }, []);

  /**
   * A method call to fetch document sections with their comments with the useEffect hook
   */
  useEffect(() => {
    fetchDocumentSections();
  }, []);

  /**
   * Method call to fetch document level comments with the useEffect hook
   */
  useEffect(() => {
    fetchDocumentComments();
  }, []);

  /**
   * Method definition for "fetchDocumentDetails" which is an API call to fetch document detail info
   */
  const fetchDocumentDetails = async () => {
    return await axios
      .get(`drafts/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDocumentDetail(response.data.data);
      });
  };

  /**
   * Method definition for "fetchDocumentSection" which is an API call to fetch document sections
   */
  const fetchDocumentSections = async () => {
    return await axios
      .get(`draft/${params.id}/draft-sections`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDocumentSections(response.data.data);
      })
      .catch((error) => {
        <p color="red">{error.response.message}</p>;
      });
  };

  /**
   * Method definition for "fetchDocumentComments" which is an API call to fetch document level comments
   */
  const fetchDocumentComments = async () => {
    return await axios
      .get(`draft/${params.id}/general-comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDocumentComments(response.data.data);
      })
      .catch((error) => {
        <p color="red">{error.response.message}</p>;
      });
  };

  return (
    /**
     * Create the document details UI. Start with a Box component as parent
     */
    <Box m="0 20">

      {/**
       * Create a Grid and render information related to messages that show success, errors or network exceptions
       */}
      <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/**
           * Render server success message
           */}
          <Typography variant="h1">
            {serverSuccessMsg ? (
              <Alert severity="success" style={successStyle}>
                {serverSuccessMsg}
              </Alert>
            ) : null}
          </Typography>

          {/**
           * Render server error message
           */}
          <Typography variant="h1">
            {serverErrorMsg ? (
              <Alert severity="error" style={errorStyle}>
                {serverErrorMsg}
              </Alert>
            ) : null}
          </Typography>

          {/**
           * Render the loading progressbar indicator
           */}
          <Typography variant="h1">
            {loading && <LinearProgress size="small" color="info" />}
          </Typography>
        </motion.span>
      </Grid>

      {/**
       * Render a child component called "DraftMetaInfo". This componet displays the drafts meta information 
       * such as short title, summary, description, onpening and closing dates, document access, download link etc.
       * You can see the detail documention available in the file named "DraftMetaInfo.jsx", read it there for 
       * a better understanding
       */}
      <DraftMetaInfo
        documentDetail={documentDetail}
        setDocumentDetail={setDocumentDetail}
        serverErrorMsg={serverErrorMsg}
        serverSuccessMsg={serverSuccessMsg}
        setServerErrorMsg={setServerErrorMsg}
        setServerSuccessMsg={setServerSuccessMsg}
        fetchDocumentDetails={fetchDocumentDetails}
        fetchDocumentSections={fetchDocumentSections}
        fetchDocumentComments={fetchDocumentComments}
        loading={loading}
        setLoading={setLoading}
      />

{/** 
 * A collapsable list item button used to hide and show the document content for preview
 */}
      <ListItemButton
        onClick={handlePreviewCollapse}
        color="secondary"
        sx={{
          marginLeft: "40px",
          marginRight: "40px",
          marginBottom: "100px",
          height: "40px",
          backgroundColor: colors.brandColor[200],
          width: "20%",
          alignSelf: "right",
          borderRadius: "20px 20px",
        }}
      >
        <ListItemText
          variant="button"
          primary={
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                color: colors.grey[600],
              }}
            >
              {t("document_preview")}
            </Typography>
          }
        />
        {previewOpen ? (
          <ExpandLess sx={{ color: colors.grey[300] }} />
        ) : (
          <ExpandMore sx={{ color: colors.grey[300] }} />
        )}
      </ListItemButton>

      <Collapse
        in={previewOpen}
        timeout="auto"
        unmountOnExit
        sx={{ marginLeft: "30px", marginRight: "30px" }}
      >
        {/**
         * Render the DocumentPreview component inside the "Collapse" component of the Material UI collapse component.
         * The DocumentPreview component is the component used to render the document content
         */}
        <DocumentPreview
          documentDetail={documentDetail}
          setDocumentDetail={setDocumentDetail}
          documentSections={documentSections}
          setDocumentSections={setDocumentSections}
          documentComments={documentComments}
          setDocumentComments={setDocumentComments}
          fetchDocumentDetails={fetchDocumentDetails}
          fetchDocumentSections={fetchDocumentSections}
          fetchDocumentComments={fetchDocumentComments}
        />
      </Collapse>

      <>
      {/**
       * Render InstitutionInvitations component which is a definition to render list of invited institutions to 
       * provide their consultation on the current document
       */}
        <InstitutionInvitations documentDetail={documentDetail} />

        {/**
         * Render CommentRepliers component which is a definition to render list of users assigned to provide replies to 
         * comments provided by commenters
         */}
        <CommentRepliers documentDetail={documentDetail} />

        {/**
         * Render PersonalInvitations component which is a definition to render list of emails to which individual invitations sent
         */}
        <PersonalInvitations documentDetail={documentDetail} />
      </>
    </Box>
  );
};

export default DocumentDetails;
