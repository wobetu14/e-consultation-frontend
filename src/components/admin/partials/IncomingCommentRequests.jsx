import { Typography, Button, Grid, Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import axios from "../../../axios/AxiosGlobal";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import { motion } from "framer-motion";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserContext } from "../../../contexts/UserContext";
import AcceptExternalRequestDialog from "../drafts/external_requests/AcceptExternalRequestDialog";
import RejectExternalRequest from "../drafts/external_requests/RejectExternalRequest";
import AssignCommenters from "../drafts/external_requests/AssignCommenters";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";

const IncomingCommentRequests = ({ loading, setLoading }) => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const [incomingCommentData, setIncomingCommentData] = useState(null);

  const { t } = useTranslation();

  // Hide and show dialogs
  const [openExternalAcceptanceDialog, setOpenExternalAcceptanceDialog] =
    useState(false);
  const [openExternalRejectionDialog, setOpenExternalRejectionDialog] =
    useState(false);
  const [openAssignCommenterDialog, setOpenAssignCommenterDialog] =
    useState(false);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const [requestID, setRequestID] = useState(null);
  const [requestDocumentTitle, setRequestDocumentTitle] = useState(null);

  const [networkError, setNetworkError] = useState(null);

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

  const { userInfo, userRole } = useContext(UserContext);

  const showExternalAcceptanceDialog = (reqID, reqTitle) => {
    setRequestID(reqID);
    setRequestDocumentTitle(reqTitle);
    setOpenExternalAcceptanceDialog(true);
  };

  const showExternalRejectionDialog = (reqID, reqTitle) => {
    setRequestID(reqID);
    setRequestDocumentTitle(reqTitle);
    setOpenExternalRejectionDialog(true);
  };

  const showAssignCommenterDialog = (reqID, reqTitle) => {
    setRequestID(reqID);
    setRequestDocumentTitle(reqTitle);
    setOpenAssignCommenterDialog(true);
  };

  const incomingCommentRequests = async () => {
    setNetworkError(null);
    return await axios
      .get(
        `comment-request?commenter_institution_id=${userInfo.user.institution_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => res.data.data)
      .then((res) => {
        setIncomingCommentData(res);
        setNetworkError(null);
        setLoading(true);
      })
      .catch((error) => {
        setNetworkError(error.name);
        setLoading(false);
      });
  };

  useEffect(() => {
    incomingCommentRequests();
  }, []);

  const handleNetworkStatus = () => {
    incomingCommentRequests();
  };

  return (
    <Box>
      <Grid align="center" sx={{ paddingBottom: "15px", paddingTop: "15px" }}>
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

      <Paper
        elevation={1}
        sx={{ padding: "5px", backgroundColor: colors.grey[400] }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "600", color: colors.primary[200] }}
        >
          {t("incoming_comment_requests")}
        </Typography>
        <Typography variant="body1" sx={{ color: "#000" }}>
          {t("incoming_request_for_comment_from_other_institutions")}
        </Typography>
      </Paper>

      <TableContainer
        component={Paper}
        sx={{ marginTop: "20px", marginBottom: "50px" }}
      >
        <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {userRole === "Approver" ? (
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    {t("from")} ({t("institution")})
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  {t("short_title")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  {t("acceptance_status")}
                </Typography>
              </TableCell>
              <TableCell colSpan={4}>
                <Typography variant="h5" fontWeight={600}>
                  {t("actions")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomingCommentData !== null ? (
              incomingCommentData.map((incommingData) => (
                <TableRow
                  key={incommingData.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body1">
                      {incommingData.requester_institution_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {incommingData.draft_title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {incommingData.status === 0
                        ? "Pending"
                        : incommingData.status === 1
                        ? "Accepted"
                        : "Rejected"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      href={`/admin/external_request_details/${incommingData.draft_id}`}
                      sx={{ textTransform: "none", marginRight: "5px" }}
                    >
                      {t("detail")}
                    </Button>

                    {incommingData.status === 0 ? (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            showExternalAcceptanceDialog(
                              incommingData.id,
                              incommingData.draft_title
                            )
                          }
                          sx={{
                            textTransform: "none",
                            marginRight: "5px",
                            backgroundColor: colors.successColor[200],
                            color: colors.grey[300],
                          }}
                        >
                          {t("accept")}
                        </Button>

                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            showExternalRejectionDialog(
                              incommingData.id,
                              incommingData.draft_title
                            )
                          }
                          sx={{
                            textTransform: "none",
                            marginRight: "5px",
                            backgroundColor: colors.dangerColor[200],
                            color: colors.grey[300],
                          }}
                        >
                          {t("reject")}
                        </Button>
                      </>
                    ) : incommingData.status === 1 ? (
                      <>
                        <Button
                          size="small"
                          variant="contained"
                          color="info"
                          onClick={() =>
                            showAssignCommenterDialog(
                              incommingData.id,
                              incommingData.draft_title
                            )
                          }
                          sx={{ textTransform: "none", marginRight: "5px" }}
                        >
                          {t("assign_commenters")}
                        </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {openExternalAcceptanceDialog && (
                      <AcceptExternalRequestDialog
                        key={incommingData.id}
                        requestID={requestID}
                        requestTitle={requestDocumentTitle}
                        incomingCommentRequests={incomingCommentRequests}
                        serverSuccessMsg={serverSuccessMsg}
                        serverErrorMsg={serverErrorMsg}
                        setServerSuccessMsg={setServerSuccessMsg}
                        setServerErrorMsg={setServerErrorMsg}
                        openExternalAcceptanceDialog={
                          openExternalAcceptanceDialog
                        }
                        setOpenExternalAcceptanceDialog={
                          setOpenExternalAcceptanceDialog
                        }
                        title={t("accept_incoming_request")}
                      />
                    )}

                    {openExternalRejectionDialog && (
                      <RejectExternalRequest
                        key={incommingData.id}
                        requestID={requestID}
                        requestTitle={requestDocumentTitle}
                        incomingCommentRequests={incomingCommentRequests}
                        serverSuccessMsg={serverSuccessMsg}
                        serverErrorMsg={serverErrorMsg}
                        setServerSuccessMsg={setServerSuccessMsg}
                        setServerErrorMsg={setServerErrorMsg}
                        openExternalRejectionDialog={
                          openExternalRejectionDialog
                        }
                        setOpenExternalRejectionDialog={
                          setOpenExternalRejectionDialog
                        }
                        title={t("reject_incoming_request")}
                      />
                    )}
                    {openAssignCommenterDialog && (
                      <AssignCommenters
                        key={incommingData.id}
                        requestID={requestID}
                        requestTitle={requestDocumentTitle}
                        incomingCommentRequests={incomingCommentRequests}
                        serverSuccessMsg={serverSuccessMsg}
                        serverErrorMsg={serverErrorMsg}
                        setServerSuccessMsg={setServerSuccessMsg}
                        setServerErrorMsg={setServerErrorMsg}
                        openAssignCommenterDialog={openAssignCommenterDialog}
                        setOpenAssignCommenterDialog={
                          setOpenAssignCommenterDialog
                        }
                        title={t("assign_more_commenters")}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : networkError !== null ? (
              <Typography variant="body1">
                {t("network_error_message")} &nbsp;
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={handleNetworkStatus}
                >
                  {t("try_again")} <RefreshIcon />
                </Button>
              </Typography>
            ) : (
              // <CircularProgress color="secondary" />

              <Typography variant="body1">
                {`${t("please_wait")}...`}
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IncomingCommentRequests;