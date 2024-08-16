import { Box, Typography, useTheme, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "../../../../axios/AxiosGlobal";

import OutgoingCommentRequestsDialog from "../../partials/OutgoingCommentRequestsDialog";
import DraftOpeningRejectionDialog from "../DraftOpeningRejectionDialog";
import AssignMoreRepliersDialog from "../AssignMoreRepliersDialog";
import { tokens } from "../../../../theme";

const ExternalRequestActions = ({
  documentDetail,
  serverErrorMsg,
  serverSuccessMsg,
  setServerErrorMsg,
  setServerSuccessMsg,
  setDocumentDetail,
}) => {
  const params = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  return <Box></Box>;
};

export default ExternalRequestActions;

const AcceptCommentInvitation = ({
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openDialog,
  setOpenDialog,
}) => {
  const showDialog = () => {
    setOpenDialog(true);
  };

  const acceptInvitation = async () => {
    return await axios
      .post(`approve-comment-opening/draft/${documentDetail.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
      });
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="success"
        sx={{ textTransform: "none", marginRight: "5px" }}
        onClick={showDialog}
      >
        Accept
      </Button>

      {openDialog && (
        <OutgoingCommentRequestsDialog
          key={documentDetail.id}
          draftInfo={documentDetail}
          serverSuccessMsg={serverSuccessMsg}
          serverErrorMsg={serverErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}
          setServerErrorMsg={setServerErrorMsg}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          showDialog={showDialog}
          title="Accept and Invite Document for Comment."
        />
      )}
    </>
  );
};

const RejectCommentInvitation = ({
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openRejectionDialog,
  setOpenRejectionDialog,
}) => {
  const showRejectionDialog = () => {
    setOpenRejectionDialog(true);
  };

  const rejectCommentOpening = async () => {
    return await axios
      .post(`request-rejection/draft/${documentDetail.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
      });
  };
  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="warning"
        sx={{ textTransform: "none" }}
        onClick={showRejectionDialog}
      >
        Reject
      </Button>

      {openRejectionDialog && (
        <DraftOpeningRejectionDialog
          key={documentDetail.id}
          documentDetail={documentDetail}
          serverSuccessMsg={serverSuccessMsg}
          serverErrorMsg={serverErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}
          setServerErrorMsg={setServerErrorMsg}
          openRejectionDialog={openRejectionDialog}
          setOpenRejectionDialog={setOpenRejectionDialog}
          showRejectionDialog={showRejectionDialog}
          title="Reject Draft Opening Request."
        />
      )}
    </>
  );
};

const AssignCommenters = ({
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openAssignRepliersDialog,
  setOpenAssignRepliersDialog,
}) => {
  const showAssignRepliersDialog = async () => {
    setOpenAssignRepliersDialog(true);
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ textTransform: "none", marginRight: "5px" }}
        onClick={showAssignRepliersDialog}
      >
        <Typography variant="body2">Assign Repliers</Typography>
      </Button>

      {openAssignRepliersDialog && (
        <AssignMoreRepliersDialog
          key={documentDetail.id}
          documentDetail={documentDetail}
          serverSuccessMsg={serverSuccessMsg}
          serverErrorMsg={serverErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}
          setServerErrorMsg={setServerErrorMsg}
          openAssignRepliersDialog={openAssignRepliersDialog}
          setOpenAssignRepliersDialog={setOpenAssignRepliersDialog}
          title="Assign more comment repliers to reply on comments provided on this document."
        />
      )}
    </>
  );
};
