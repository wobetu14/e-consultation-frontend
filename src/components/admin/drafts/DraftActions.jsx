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
import { useTranslation } from "react-i18next";

const DraftActions = ({
  draftID,
  documentDetail,
  serverErrorMsg,
  serverSuccessMsg,
  setServerErrorMsg,
  setServerSuccessMsg,
  setDocumentDetail,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,

  loading,
  setLoading,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openRejectionDialog, setOpenRejectionDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openAssignRepliersDialog, setOpenAssignRepliersDialog] =
    useState(false);

  const { userRole } = useContext(UserContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { t } = useTranslation();

  const closeCommenting = async (draftID) => {
    setLoading(true);
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    return await axios
      .post(`close-comment/draft/${draftID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        fetchDocumentDetails();
        fetchDocumentSections();
        fetchDocumentComments();

        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setLoading(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setLoading(false);
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
                draftID={draftID}
                documentDetail={documentDetail}
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                t={t}
                fetchDocumentDetails={fetchDocumentDetails}
                fetchDocumentSections={fetchDocumentSections}
                fetchDocumentComments={fetchDocumentComments}
              />
              <RejectApprovalRequest
                draftID={draftID}
                documentDetail={documentDetail}
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                openRejectionDialog={openRejectionDialog}
                setOpenRejectionDialog={setOpenRejectionDialog}
                t={t}
                fetchDocumentDetails={fetchDocumentDetails}
                fetchDocumentSections={fetchDocumentSections}
                fetchDocumentComments={fetchDocumentComments}
              />
            </>
          ) : documentDetail.draft_status.name === "Open" ? (
            <>
              <InviteCommenters
                draftID={draftID}
                documentDetail={documentDetail}
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                openInviteDialog={openInviteDialog}
                setOpenInviteDialog={setOpenInviteDialog}
                t={t}
                fetchDocumentDetails={fetchDocumentDetails}
                fetchDocumentSections={fetchDocumentSections}
                fetchDocumentComments={fetchDocumentComments}
              />
              <AssignRepliers
                draftID={draftID}
                documentDetail={documentDetail}
                serverSuccessMsg={serverSuccessMsg}
                serverErrorMsg={serverErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                openAssignRepliersDialog={openAssignRepliersDialog}
                setOpenAssignRepliersDialog={setOpenAssignRepliersDialog}
                t={t}
                fetchDocumentDetails={fetchDocumentDetails}
                fetchDocumentSections={fetchDocumentSections}
                fetchDocumentComments={fetchDocumentComments}
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
                <Typography variant="body2">{t("end_consultation")}</Typography>
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
      .post(`request-for-comment/draft/${documentDetail.id}`, {
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
  draftID,
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openDialog,
  setOpenDialog,
  t,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
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
        {t("accept")}
      </Button>

      {openDialog && (
        <OutgoingCommentRequestsDialog
          draftID={draftID}
          key={documentDetail.id}
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
          title={t("accept_document_and_invite")}
        />
      )}
    </>
  );
};

const RejectApprovalRequest = ({
  draftID,
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openRejectionDialog,
  setOpenRejectionDialog,
  t,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
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
        {t("reject")}
      </Button>

      {openRejectionDialog && (
        <DraftOpeningRejectionDialog
          draftID={draftID}
          key={documentDetail.id}
          documentDetail={documentDetail}
          serverSuccessMsg={serverSuccessMsg}
          serverErrorMsg={serverErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}
          setServerErrorMsg={setServerErrorMsg}
          openRejectionDialog={openRejectionDialog}
          setOpenRejectionDialog={setOpenRejectionDialog}
          showRejectionDialog={showRejectionDialog}
          fetchDocumentDetails={fetchDocumentDetails}
          fetchDocumentSections={fetchDocumentSections}
          fetchDocumentComments={fetchDocumentComments}
          title={t("reject_opening_request")}
        />
      )}
    </>
  );
};

const InviteCommenters = ({
  draftID,
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openInviteDialog,
  setOpenInviteDialog,
  t,
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
        <Typography variant="body2">{t("invite")}</Typography>
      </Button>

      {openInviteDialog && (
        <>
          <InviteMoreDialog
            draftID={draftID}
            key={documentDetail.id}
            documentDetail={documentDetail}
            serverSuccessMsg={serverSuccessMsg}
            serverErrorMsg={serverErrorMsg}
            setServerSuccessMsg={setServerSuccessMsg}
            setServerErrorMsg={setServerErrorMsg}
            openInviteDialog={openInviteDialog}
            setOpenInviteDialog={setOpenInviteDialog}
            title={t("invite_more_people_and_institutions")}
          />
        </>
      )}
    </>
  );
};

const AssignRepliers = ({
  draftID,
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openAssignRepliersDialog,
  setOpenAssignRepliersDialog,
  t,
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
        <Typography variant="body2">{t("assign_repliers")}</Typography>
      </Button>

      {openAssignRepliersDialog && (
        <AssignMoreRepliersDialog
          draftID={draftID}
          key={documentDetail.id}
          documentDetail={documentDetail}
          serverSuccessMsg={serverSuccessMsg}
          serverErrorMsg={serverErrorMsg}
          setServerSuccessMsg={setServerSuccessMsg}
          setServerErrorMsg={setServerErrorMsg}
          openAssignRepliersDialog={openAssignRepliersDialog}
          setOpenAssignRepliersDialog={setOpenAssignRepliersDialog}
          title={t("assign_more_comment_repliers")}
        />
      )}
    </>
  );
};
