import { Typography, Button, LinearProgress, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import Header from "../AdminHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AssignedToComment = () => {
  const [invitedDrafts, setInvitedDrafts] = useState(null);

  const fetchInvitedDrafts = async () => {
    return await axios
      .get(`drafts-am-commenting`, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setInvitedDrafts(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchInvitedDrafts();
  }, [invitedDrafts]);
  return (
    <Box m="0 20px" width={"95%"}>
      <Header title="List of draft documents I have been assigned to provide comments" />
      <TableContainer
        component={Paper}
        sx={{ marginTop: "50px", marginBottom: "350px" }}
      >
        <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Draft Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Institution
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Message
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitedDrafts ? (
              invitedDrafts.map((invitedDraft) => (
                <TableRow
                  key={invitedDraft.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body1">
                      {invitedDraft.draft}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {invitedDraft.institution}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {invitedDraft.message}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      href={`/draft/${invitedDraft.draft_id}`}
                      sx={{ textTransform: "none", marginRight: "5px" }}
                    >
                      <Typography variant="body1">
                        Please provide your feedback on this draft document
                      </Typography>
                    </Button>
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
export default AssignedToComment