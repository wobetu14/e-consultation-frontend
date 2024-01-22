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

/**
 * This component is used to send draft opening requests from the uploader to the approver user, 
 * allowing them to review, approve the document, and subsequently publish it for public commenting.
 */

/**
 * Create a functional component named "DraftApprovalRequest"
 */

const DraftApprovalRequest = () => {
  /**
   * Create theme variable to set base applicationtheme
   */
  const theme = useTheme();

  /**
   * Create colors variable and assign from theme colors based on the theme mode. 
   * Colors are defined from theme.js file with tokens() method and color codes 
   * are defined based on wheteher we are in dark or light color mode
   */
  const colors = tokens(theme.palette.mode);
  const [draftsData, setDraftsData] = useState(null);

  /**
   * Create variable to store information related to error or success messages
   */
  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  /**
   * Create variable to store message related to http network communication exceptions
   */
  const [networkErrorMessage, setNetworkErrorMessage] = useState(null);
  const [errorSendingRequest, setErrorSendingRequest] = useState(null);

  /**
   * Create a variable to store information used to indicate a loading state 
   * to set to true or false. This variable is used to show / hide a progress bar that shows 
   * the request processing under progress
   */
  const [loading, setLoading] = useState(false);

  /**
   * Destructure translation object from useTranslation hook of i18next language library
   */
  const { t } = useTranslation();

  /**
   * Create objects to store CSS values used to mark the error message displayed
   */
  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  /**
   * Create objects to store CSS values used to mark the success message displayed
   */
  const successStyle = {
    color: "green",
    fontWeight: "400",
    fontSize: "18px",
  };

  /**
   * Destructure userRole value to get access to user's role value from "UserContext"
   */
  const { userRole } = useContext(UserContext);

  /**
   * Method definition to fetch all drafts list that owned by the institution this uploader / approver user belongs. 
   * That means only list of drafts owned by the same institution as uploader / approver will be fetched and displayed 
   * to the user. Note that this component accessible to both uploaders and approvers, but different or separate 
   * action buttons will be available for each user role. For exampe "Send Request" action button is available only
   * to uploader role but, to the approver user, only "Detail" action button is available and when clicked will redirect 
   * to detail of the draft document where the approver can "Accept" or "Reject" the draft.
   */
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

  /**
   * Call fetchDrafts method with the useEffect hook
   */
  useEffect(() => {
    fetchDrafts();
  }, []);

  /**
   * Call the fetchDrafts method when user clicks "Try agin" button. This operation is used 
   * to allow the end user to try reload list of drafts if exception happened related to
   * http network communication.
   */
  const handleNetworkStatus = () => {
    fetchDrafts();
  };

  return (
    /**
     * Create UI used to render list of drafts. Here we have created a parent box, then rendered user defined 
     * Header component, then defined Grid, then a Typography to display error or success messages.
     * 
     */
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

          {/**
           * Show progress bar if "loading" variable is true, means action is triggered. Here action may be "Send Request".
           * i.e. if "Send Request" button clicked, "loading" variable will be set true, and then if it is true 
           * Progress bar will be displayed.
           */}

          {loading && <LinearProgress size="small" color="info" />}
        </motion.span>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "50px", marginBottom: "350px" }}
      >

        {/**
         * Create DataTable to render list of fetched drafts
         */}
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

                  {/**
                   * Add a column and display document status (either "New", "Requested", "Rejected")
                   */}
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

                    {/**
                     * Display document consultation status as under progress or closed / ended
                     */}
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

                  {/**
                   * Create "Detail" action button to redirect to details page
                   */}
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

                    {/**
                     * Render child component named 'SendApprovalRequest' passing important data as props to trigger
                     * a "Send Request" action. This component is rendered only if the logged in user is 'Uploader'. 
                     * The "SendApprovalRequest" is a functional component defined inside this same file.
                     */}
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
            ) : 
            /**
             * Display network error information if http exception cathced while drafts list is tried and unable to load 
             * along with a retry button
             */
            networkErrorMessage !== null ? (
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


/**
 * Definition of "SendApprovalRequest" child component as we have discussed on the line above.
 * We have tried to explain the component.
 */
export default DraftApprovalRequest;

/**
 * Create a functional component named "SendApprovalRequest"
 */
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

  /**
   * Method definition to call an API that is used to send draft opening request
   */
  const sendRequestForApproval = async () => {
    /**
     * Set intial values to null for success and error messages as well as loading variable to true so that 
     * the values will be updated as the results from the API calls changed
     */
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
    {/**
     * Create an action button to trigger "Send Request" or to call the method named sendRequestForApproval which is 
     * a definition for API call to send draft request
     */}
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
