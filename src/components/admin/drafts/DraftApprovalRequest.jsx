import {
  Typography,
  Button,
  Chip,
  Grid,
  Alert,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import axios from "../../../axios/AxiosGlobal";
import Header from "../AdminHeader";
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
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";

const DraftApprovalRequest = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const [draftsData, setDraftsData] = useState(null);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const [networkErrorMessage, setNetworkErrorMessage] = useState(null);
  const [errorSendingRequest, setErrorSendingRequest] = useState(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

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

  const { userRole } = useContext(UserContext);

  const fetchDrafts = async () => {
    setNetworkErrorMessage(null);
    return await axios
      .get("mydrafts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setDraftsData(res.data.data);
        setNetworkErrorMessage(null);
      })
      .catch((error) => {
        setNetworkErrorMessage(error.name);
      });
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleNetworkStatus = () => {
    fetchDrafts();
  };

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
      <Header title={t("draft_approval_request")} />
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

          <Typography variant="h1">
            {errorSendingRequest === "ERR_NETWORK" ? (
              <Alert severity="error" style={errorStyle}>
                Something went wrong. Check your network.
              </Alert>
            ) : null}
          </Typography>

          {loading && <LinearProgress size="small" color="info" />}
        </motion.span>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "50px", marginBottom: "350px" }}
      >
        <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {userRole === "Approver" ? (
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    {t("uploader")}
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
                  {t("description")}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  {t("draft_status")}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  {t("actions")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {draftsData ? (
              draftsData.map((draft) => (
                <TableRow
                  key={draft.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {userRole === "Approver" ? (
                    <TableCell>
                      <Typography variant="body1">
                        {draft.uploader.first_name +
                          " " +
                          draft.uploader.middle_name}
                      </Typography>
                    </TableCell>
                  ) : (
                    ""
                  )}
                  <TableCell>
                    <Typography variant="body1">
                      {draft.short_title.substr(0, 30)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {draft.summary.substr(0, 20)}...
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {draft.draft_status !== null &&
                    draft.draft_status.name === "New" ? (
                      <Chip
                        label={draft.draft_status.name}
                        size="small"
                        sx={{
                          backgroundColor: colors.successColor[200],
                          color: colors.grey[300],
                        }}
                      />
                    ) : (
                      ""
                    )}

                    {draft.draft_status !== null &&
                    draft.draft_status.name === "Requested" ? (
                      <Chip
                        label={draft.draft_status.name}
                        size="small"
                        sx={{
                          backgroundColor: "orange",
                          color: colors.grey[300],
                        }}
                      />
                    ) : (
                      ""
                    )}
                    {draft.draft_status !== null &&
                    draft.draft_status.name === "Rejected" ? (
                      <Tooltip title={draft.request_rejection_message} arrow>
                        <Chip
                          label={draft.draft_status.name}
                          size="small"
                          sx={{
                            backgroundColor: "orangered",
                            color: colors.grey[300],
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    ) : (
                      ""
                    )}

                    {draft.draft_status !== null &&
                    draft.draft_status.name === "Open" ? (
                      <Chip
                        label={draft.draft_status.name}
                        size="small"
                        sx={{
                          backgroundColor: colors.successColor[100],
                          color: colors.grey[300],
                        }}
                      />
                    ) : (
                      ""
                    )}

                    {draft.draft_status !== null &&
                    draft.draft_status.name === "Closed" ? (
                      <Chip
                        label={draft.draft_status.name}
                        size="small"
                        sx={{
                          backgroundColor: colors.dangerColor[200],
                          color: colors.grey[300],
                        }}
                      />
                    ) : (
                      ""
                    )}

                    <span>&nbsp;</span>

                    {draft &&
                    draft.draft_status !== null &&
                    draft.draft_status.name === "Closed" ? (
                      <Chip
                        label="Consultation ended"
                        size="small"
                        sx={{
                          backgroundColor: colors.dangerColor[500],
                          color: colors.grey[300],
                        }}
                      />
                    ) : (
                      <Chip
                        label="Consultation in Progress"
                        size="small"
                        sx={{
                          backgroundColor: colors.successColor[500],
                          color: colors.grey[300],
                        }}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      href={`/admin/document_details/${draft.id}`}
                      sx={{ textTransform: "none", marginRight: "5px" }}
                    >
                      {t("detail")}
                    </Button>

                    {userRole === "Uploader" ? (
                      draft.draft_status !== null &&
                      (draft.draft_status.name === "New" ||
                        draft.draft_status.name === "Rejected") ? (
                        <SendApprovalRequest
                          loading={loading}
                          setLoading={setLoading}
                          draftID={draft.id}
                          fetchDrafts={fetchDrafts}
                          setServerSuccessMsg={setServerSuccessMsg}
                          setServerErrorMsg={setServerErrorMsg}
                          errorSendingRequest={errorSendingRequest}
                          setErrorSendingRequest={setErrorSendingRequest}
                          t={t}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : networkErrorMessage !== null ? (
              <Typography variant="body1">
                Something went wrong. Your internet connection may be unstable.
                You can &nbsp;
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={handleNetworkStatus}
                >
                  {t("try again")} <RefreshIcon />
                </Button>
              </Typography>
            ) : (
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

export default DraftApprovalRequest;

const SendApprovalRequest = ({
  loading,
  setLoading,
  draftID,
  fetchDrafts,
  setServerSuccessMsg,
  setServerErrorMsg,
  errorSendingRequest,
  setErrorSendingRequest,
  t,
}) => {
  const sendRequestForApproval = async () => {
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setErrorSendingRequest(null);
    setLoading(true);
    return await axios
      .post(`request-for-comment/draft/${draftID}`, draftID, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setLoading(false);
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setErrorSendingRequest(null);
        fetchDrafts();
      })
      .catch((errors) => {
        setLoading(false);
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setErrorSendingRequest(errors.code);
      });
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="secondary"
        sx={{ textTransform: "none", marginRight: "5px" }}
        onClick={sendRequestForApproval}
      >
        {t("send_request")}
      </Button>
    </>
  );
};
