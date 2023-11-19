import {
  Typography,
  Button,
  Chip,
  Grid,
  Alert,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import React, {
  useEffect,
  useState,
  useContext,
} from "react";
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

const DraftApprovalRequest = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const [draftsData, setDraftsData] = useState(null);

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

  const {userRole} =
    useContext(UserContext);

  const fetchDrafts = async () => {
    return await axios
      .get("mydrafts", 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setDraftsData(res.data.data);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <Box m="0 20px" width={"95%"}>
      <Header title="Draft Approval Request" />
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
                    Uploader
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Draft Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Actions
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
                    {draft.draft_status.name === "New" ? (
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

                    {draft.draft_status.name === "Requested" ? (
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
                    {draft.draft_status.name === "Rejected" ? (
                      <Chip
                        label={draft.draft_status.name}
                        size="small"
                        sx={{
                          backgroundColor: "orangered",
                          color: colors.grey[300],
                        }}
                      />
                    ) : (
                      ""
                    )}

                    {draft.draft_status.name === "Open" ? (
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

                    {draft.draft_status.name === "Closed" ? (
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
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      href={`/admin/document_details/${draft.id}`}
                      sx={{ textTransform: "none", marginRight: "5px" }}
                    >
                      {/* <PreviewIcon size="small"/> */}
                      Detail
                    </Button>

                    {userRole === "Uploader" ? (
                      draft.draft_status.name === "New" ? (
                        // <TableCell align="right">
                        <SendApprovalRequest
                          draft={draft}
                          setServerSuccessMsg={setServerSuccessMsg}
                          setServerErrorMsg={setServerErrorMsg}
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
            ) : (
              <TableRow>
                <TableCell colsPan={5}>
                  <CircularProgress color="secondary" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DraftApprovalRequest;

const SendApprovalRequest = ({
  draft,
  setServerSuccessMsg,
  setServerErrorMsg,
}) => {
  const sendRequestForApproval = async () => {
    return await axios
      .post(`request-for-comment/draft/${draft.id}`, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }}
      )
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
        color="secondary"
        sx={{ textTransform: "none", marginRight: "5px" }}
        onClick={sendRequestForApproval}
      >
        Send Request
      </Button>
    </>
  );
};