import { Typography, Button, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import axios from "../../../axios/AxiosGlobal";
import Header from "../AdminHeader";
import "../../Table.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserContext } from "../../../contexts/UserContext";

const DraftAssignments = () => {
  const [commentAssignments, setCommentAssignments] = useState(null);

  const { userInfo } = useContext(UserContext);

  const fetchCommentAssignments = async () => {
    return await axios
      .get(`comment-repliers?replier=${userInfo.user.id}`)
      .then((res) => res.data.data)
      .then((res) => {
        setCommentAssignments(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchCommentAssignments();
  }, [commentAssignments]);

  return (
    <Box m="0 20px" width={"95%"}>
      <Header title="List of Draft Documents I have been assigned for to reflect on public comments" />

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
            </TableRow>
          </TableHead>
          <TableBody>
            {commentAssignments ? (
              commentAssignments.map((commentAssignment) => (
                <TableRow
                  key={commentAssignment.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body1">
                      {commentAssignment.draft}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      href={`/draft/reflection-on-comments/${commentAssignment.draft_id}`}
                      sx={{ textTransform: "none", marginRight: "5px" }}
                    >
                      <Typography variant="body1">
                        Reply to comments on this document
                      </Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colsPan={5}>
                  <LinearProgress color="secondary" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DraftAssignments;
