import React, { useEffect, useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
  Box,
  DialogActions,
  Grid,
  Alert,
  LinearProgress,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { EtCalendar } from "et-calendar-react";
import OutgoingCommentRequestsDialog from "../partials/OutgoingCommentRequestsDialog";
import ExtendDeadlineDialog from "../partials/ExtendDeadlineDialog";

const ExtendConsultationDeadline = ({
  draftID,
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openDialog,
  setOpenDialog,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  
     const showDialog = () => {
       setOpenDialog(true);
     };

  return (
    <>
      {/**
       * Button definition to "Accept" the opening request
       */}
      <Button
        size="small"
        variant="outlined"
        color="primary"
        sx={{ textTransform: "none", marginRight: "5px" }}
        onClick={showDialog}
      >
       {"Extend Deadline"}
      </Button>

      {/**
       * Display / show document opening dialog box (acceptance dialog box). Note that the naming here is not
       * similar to the function of the component but it is meant to be a dialog box to accepting opening request.
       */}

      {openDialog && (
        <ExtendDeadlineDialog
          draftID={draftID}
          draftInfo={documentDetail}
          serverSuccessMsg={serverSuccessMsg}
          serverErrorMsg={serverErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}
          setServerErrorMsg={setServerErrorMsg}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          showDialog={showDialog}
          fetchDocumentDetails={fetchDocumentDetails}
          fetchDocumentSections={fetchDocumentSections}
          fetchDocumentComments={fetchDocumentComments}
          title={"Extend Consultation Deadline"}
        />
      )}
    </>
  );
};

export default ExtendConsultationDeadline;
