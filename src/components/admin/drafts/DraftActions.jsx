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

/**
 * This component is a child component of <DraftMetaInfo /> component. 
 * It is used to define action buttons to execute actions on the draft document. 
 * This includes actions such as "Accept draft opening", "Reject Draft Opening", 
 * "Assign Replier", "Invite People and Institutions", "End Consultation"
 */

/**
 * Create a functional component named "DraftActions".
 */
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
  /**
   * Create variable for opening dialog box for draft "Accept", "Reject", "Invite", "Assign Replier" operation.
   * This variables are booleand variables with a default value "false" and when it is true, a dialog box will be opened.
   * For example when user clicks "Accept" button, the "openDialog" value will be true and hence, a dialog box to 
   * accept and open the draft document for commenting will be displayed so that user can set values and open the document
   * for comment.
   */
  const [openDialog, setOpenDialog] = useState(false);
  const [openRejectionDialog, setOpenRejectionDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openAssignRepliersDialog, setOpenAssignRepliersDialog] =
    useState(false);

    /**
     * Accessing role name of the logged in user from the UserContext
     */
  const { userRole } = useContext(UserContext);

  /**
   * Access application level variables such as theme and color
   */
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /**
   * Access translation object from the useTranslation hook of i18next React language translation (localization) library
   */
  const { t } = useTranslation();

  /**
   * Method definition for an API call to close commenting or to "End Consultation"
   */
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
      {/**
       * UI definition for action buttons
       */}
      <Stack
        direction="row"
        spacing={1}
        justifyContent="end"
        sx={{ marginRight: "20px" }}
      >
        {/**
         * Render the <AcceptApprovalRequest /> and <RejectApprovalRequest /> component if the role of the logged in user is
         * "Approver"
         * and the status of the document is "Requested". 
         * The <AcceptApprovalRequest /> is a simple button definition whose implementation is located 
         * at the bottom of this file. 
         */}
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
            /**
             * Show or render <InviteCommenters /> and <AssignReplier /> components if the user role is "Approver" and request status is "Open"
             */
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

            {/**
             * Button definition for close commenting or to end consultation
             */}
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
          /**
           * Render <SendApprovalRequest /> component if user role is "Uploader" and request status is "Pending"
           */
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

/**
 * Implementation for <SendApprovalRequest /> or to send document opening request
 * @param {*} documentDetail - Prop for document detail info 
 * @param {*} setServerSuccessMsg - Prop method to set server success message 
 * @param {*} setServerErrorMsg - Prop method to set server error message
 * @returns 
 */
const SendApprovalRequest = ({
  documentDetail,
  setServerSuccessMsg,
  setServerErrorMsg,
}) => {
  /**
   * 
   * @returns server success or error message
   */
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
    {/**
     * Button definition for sending opening request
     */}
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

/**
 * Implementation for <AcceptApprovalRequest /> component to accept the 
 * opening request coming from the Uploader user role
 */
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
    /**
     * Set openDialog variable to true so that upon clicking, the dialog box to approve opening of th document 
     * will be shown 
     */
    setOpenDialog(true);
  };

  return (
    <>
    {/**
     * Button definition to "Accept" the opening request
     */}
      <Button
        size="small"
        variant="contained"
        color="success"
        sx={{ textTransform: "none", marginRight: "5px" }}
        onClick={showDialog}
      >
        {t("accept")}
      </Button>

     {/**
      * Display / show document opening dialog box (acceptance dialog box). Note that the naming here is not 
      * similar to the function of the component but it is meant to be a dialog box to accepting opening request.
      */}
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

/**
 * Implementation for <RejectApprovalRequest /> to reject the document opening
 * @param {*} param0 
 * @returns 
 */
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
     /** Set openRejectDialog variable to true so that upon clicking, the dialog box to reject opening of th document 
     * will be shown 
     */
    setOpenRejectionDialog(true);
  };

  return (
    <>
    {/**
     * Button definition to "Reject" the opening request
     */}
      <Button
        size="small"
        variant="contained"
        color="warning"
        sx={{ textTransform: "none" }}
        onClick={showRejectionDialog}
      >
        {t("reject")}
      </Button>

     {/**
      * Display / show document rejection dialog box. 
      */}
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


/**
 * Implementation for <InviteCommenters /> component to invite individual commenters and institutions
 * @param {*} param0 
 * @returns 
 */
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
    /**
     * Set openInviteDialog to true so that upon clicking, a dialog box for sending invitation will be dispaled
     */
    setOpenInviteDialog(true);
  };

  return (
    <>
    {/**
     * Button definition for sending an invite
     */}
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
        {/**
         * Show <InviteMoreDialog /> component if the value of openInviteDialog is true so that user can send invitation 
         * via the dialog box
         */}
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

/**
 * Implementation for <AssignRepliers /> component to assign comment 
 * repliers to reply to comments provided on the document
 * @param {*} param0 
 * @returns 
 */
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
    /**
     * Set <openAssignRepliersDialog /> variable to true so that upon clicking the repliers dialog will be shown
     */
    setOpenAssignRepliersDialog(true);
  };

  return (
    <>
    {/**
     * Button definition to assign repliers 
     */}
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

        /**
         * Show <AssignMoreRepliersDialog /> component if the value of openAssignRepliersDialog is true 
         * so that user can complete assign operation
         */
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
