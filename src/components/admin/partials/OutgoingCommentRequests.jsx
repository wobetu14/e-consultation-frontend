import { Typography, Button, Chip, Grid, Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import axios from "../../../axios/AxiosGlobal";
import { useTheme } from "@emotion/react";
import { tokens } from "../../../theme";
import { motion } from "framer-motion";
import "../../Table.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserContext } from "../../../contexts/UserContext";
import OutgoingCommentRequestsDialog from "./OutgoingCommentRequestsDialog";

const OutgoingCommentRequests = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const colors = tokens(theme.palette.mode);
  const [draftsData, setDraftsData] = useState(null);

  const [draftInfo, setDraftInfo] = useState(null);

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  const showDialog = (draft) => {
    setDraftInfo(draft);
    setOpenDialog(true);
  };

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
    return await axios
      .get(`drafts`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setDraftsData(res.data);
      })
      .catch((error) => {
        
      });
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{ padding: "5px", backgroundColor: colors.grey[400] }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "600", color: colors.primary[200] }}
        >
          Outgoing Comment Requests
        </Typography>
        <Typography variant="body1" sx={{ color: "#000" }}>
          Outgoing request for comment to other institutions.
        </Typography>
      </Paper>

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
        sx={{ marginTop: "20px", marginBottom: "100px" }}
      >
        <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {userRole === "Approver" ? (
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    To (Institution)
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
            {draftsData
              ? draftsData.map((draft) => (
                  <TableRow
                    key={draft.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="body1">{draft.id}</Typography>
                    </TableCell>
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
                      {draft.draft_status.name === "Pending" ? (
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

                      {draft.draft_status.name === "Open" ? (
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
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        href={`/admin/external_requests_preview/${draft.id}`}
                        sx={{ textTransform: "none", marginRight: "5px" }}
                      >
                        {/* <PreviewIcon size="small"/> */}
                        View
                      </Button>
                      {draft.draft_status.name === "Open" ? (
                        // <TableCell align="right">
                        <>
                          <Button
                            key={draft.id}
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{ textTransform: "none", marginRight: "5px" }}
                            onClick={() => showDialog(draft)}
                          >
                            Send Request
                          </Button>
                          {openDialog && (
                            <OutgoingCommentRequestsDialog
                              key={draft.id}
                              draftInfo={draftInfo}
                              setServerSuccessMsg={setServerSuccessMsg}
                              setServerErrorMsg={setServerErrorMsg}
                              openDialog={openDialog}
                              setOpenDialog={setOpenDialog}
                              title="Request Institutions for draft commenting"
                            />
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default OutgoingCommentRequests; 