import { Box, Stack, Typography, useTheme, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { tokens } from "../../../theme";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../../contexts/UserContext";
import OutgoingCommentRequestsDialog from "../partials/OutgoingCommentRequestsDialog";
import DraftOpeningRejectionDialog from "./DraftOpeningRejectionDialog";
import InviteMoreDialog from "../../admin/drafts/InviteMoreDialog";
import AssignMoreRepliersDialog from "./AssignMoreRepliersDialog";

const DraftActions = ({
  documentDetail,
  serverErrorMsg,
  serverSuccessMsg,
  setServerErrorMsg,
  setServerSuccessMsg,
  setDocumentDetail,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openRejectionDialog, setOpenRejectionDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openAssignRepliersDialog, setOpenAssignRepliersDialog] =
    useState(false);

  const { userRole } = useContext(UserContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const closeCommenting = async (draftID) => {
    return await axios
      .post(`close-comment/draft/${draftID}`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
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
    <Box>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="end"
        sx={{ marginRight: "20px" }}
      >
        {userRole === "Approver" ? (
          documentDetail && documentDetail.draft_status.name === "Requested" ? (
            <>
              <AcceptApprovalRequest
                documentDetail={documentDetail}
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
              />
              <RejectApprovalRequest
                documentDetail={documentDetail}
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                openRejectionDialog={openRejectionDialog}
                setOpenRejectionDialog={setOpenRejectionDialog}
              />
            </>
          ) : documentDetail.draft_status.name === "Open" || documentDetail.draft_status.name === "Closed" ? (
            <>
              <InviteCommenters
                documentDetail={documentDetail}
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                openInviteDialog={openInviteDialog}
                setOpenInviteDialog={setOpenInviteDialog}
              />
              <AssignRepliers
                documentDetail={documentDetail}
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                openAssignRepliersDialog={openAssignRepliersDialog}
                setOpenAssignRepliersDialog={setOpenAssignRepliersDialog}
              />

              <Button
                size="small"
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  marginRight: "5px",
                  backgroundColor: colors.dangerColor[200],
                  color: colors.grey[300],
                }}
                onClick={() => closeCommenting(documentDetail.id)}
              >
                <Typography variant="body2">End Consultation</Typography>
              </Button>
            </>
          ) : (
            ""
          )
        ) : userRole === "Uploader" ? (
          documentDetail && documentDetail.draft_status.name === "Pending" ? (
            <>
              <SendApprovalRequest
                documentDetail={documentDetail}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
              />
              {/* <Button variant="contained" color="warning" size="small" sx={{ textTransform:"none" }}>Reject</Button> */}
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default DraftActions;

const SendApprovalRequest = ({
  documentDetail,
  setServerSuccessMsg,
  setServerErrorMsg,
}) => {
  const sendOpeningRequest = async () => {
    return await axios
      .post(`request-for-comment/draft/${documentDetail.id}`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
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
        variant="contained"
        color="secondary"
        sx={{ textTransform: "none" }}
        onClick={sendOpeningRequest}
      >
        <Typography variant="body1">Send opening request &nbsp;</Typography>
        <SendIcon fontSize="small" />
      </Button>
    </>
  );
};

const AcceptApprovalRequest = ({
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

const RejectApprovalRequest = ({
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

const InviteCommenters = ({
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openInviteDialog,
  setOpenInviteDialog,
}) => {
  const showInviteDialog = () => {
    setOpenInviteDialog(true);
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="success"
        sx={{ textTransform: "none", marginRight: "5px" }}
        onClick={showInviteDialog}
      >
        <Typography variant="body2">Invite</Typography>
      </Button>

      {openInviteDialog && (
        <>
          <InviteMoreDialog
            key={documentDetail.id}
            documentDetail={documentDetail}
            serverSuccessMsg={serverSuccessMsg}
            serverErrorMsg={serverErrorMsg}
            setServerSuccessMsg={setServerSuccessMsg}
            setServerErrorMsg={setServerErrorMsg}
            openInviteDialog={openInviteDialog}
            setOpenInviteDialog={setOpenInviteDialog}
            title="Invite more people and institutions for commenting."
          />
        </>
      )}
    </>
  );
};

const AssignRepliers = ({
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