import {
  Box,
  Collapse,
  Grid,
  Typography,
  useTheme,
  ListItemButton,
  ListItemText,
  Alert,
} from "@mui/material";
import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../axios/AxiosGlobal";
import { motion } from "framer-motion";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import DocumentPreview from "../DocumentPreview";

import PersonalInvitations from "../Personalnvitations";
import ExternalRequestMetaInfo from "./ExternalRequestMetaInfo";
import { tokens } from "../../../../theme";

const ExternalRequestDetails = () => {
  const params = useParams();
  const [documentDetail, setDocumentDetail] = useState(null);
  const [documentSections, setDocumentSections] = useState(null);
  const [documentComments, setDocumentComments] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

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

  // Menu collapse functionality
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const handlePreviewCollapse = () => {
    setPreviewOpen(!previewOpen);
  };

  useEffect(() => {
    fetchDocumentDetails();
  }, [documentDetail]);

  useEffect(() => {
    fetchDocumentSections();
  }, [documentSections]);

  useEffect(() => {
    fetchDocumentComments();
  }, [documentComments]);

  const fetchDocumentDetails = async () => {
    return await axios.get(`drafts/${params.id}`,
    {headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json;",
      "Content-Type": "multipart/form-data"
    }}).then((response) => {
      setDocumentDetail(response.data.data);
    });
  };

  const fetchDocumentSections = async () => {
    return await axios
      .get(`draft/${params.id}/draft-sections`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((response) => {
        setDocumentSections(response.data.data);
      })
      .catch((error) => {
        <p color="red">{error.response.message}</p>;
      });
  };

  const fetchDocumentComments = async () => {
    return await axios
      .get(`draft/${params.id}/general-comments`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((response) => {
        setDocumentComments(response.data.data);
      })
      .catch((error) => {
        <p color="red">{error.response.message}</p>;
      });
  };

  return (
    <Box>
      <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h1">
            {serverSuccessMsg ? (
              <Alert severity="success" style={successStyle}>
                {serverSuccessMsg}
              </Alert>
            ) : null}
          </Typography>

          <Typography variant="h1">
            {serverErrorMsg ? (
              <Alert severity="error" style={errorStyle}>
                {serverErrorMsg}
              </Alert>
            ) : null}
          </Typography>
        </motion.span>
      </Grid>

      {/* <Button variant="contained" color="success" size="small" onClick={handleAcceptanceDialog}>Accept</Button> */}

      <ExternalRequestMetaInfo
        documentDetail={documentDetail}
        setDocumentDetail={setDocumentDetail}
        serverErrorMsg={serverErrorMsg}
        serverSuccessMsg={serverSuccessMsg}
        setServerErrorMsg={setServerErrorMsg}
        setServerSuccessMsg={setServerSuccessMsg}
      />

      <ListItemButton
        onClick={handlePreviewCollapse}
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
          primary={
            <Typography
              variant="body1"
              sx={{
                fontWeight: "500",
                textAlign: "center",
                color: colors.grey[300],
              }}
            >
              Document Preview
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
        <DocumentPreview
          documentDetail={documentDetail}
          setDocumentDetail={setDocumentDetail}
          documentSections={documentSections}
          setDocumentSections={setDocumentSections}
          documentComments={documentComments}
          setDocumentComments={setDocumentComments}
        />
      </Collapse>

      <>
        <PersonalInvitations documentDetail={documentDetail} />
      </>
    </Box>
  );
};

export default ExternalRequestDetails;