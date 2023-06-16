import {
  Box,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

const CommentRepliers = () => {
  const params = useParams();
  const [assignedPeople, setAssignedPeople] = useState(null);

  // User context
  const { userRole } = useContext(UserContext);

  useEffect(() => {
    fetchInvitedInstitutions();
  }, []);

  const fetchInvitedInstitutions = async () => {
    return await axios
      .get(`comment-repliers?draft_id=${params.id}`)
      .then((res) => {
        setAssignedPeople(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box m="0 20px" width={"95%"}>
      <Typography variant="h5" fontWeight="600">
        Assigned staff to reply for comments on this document
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "15px", marginBottom: "30px" }}
      >
        <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              {userRole === "Approver" ? (
                <TableCell>
                  <Typography variant="h5" fontWeight={600}>
                    To (Name)
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {assignedPeople ? (
              assignedPeople.map((people) => (
                <TableRow
                  key={people.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body1">
                      {people.replier ? people.replier : ""}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colsPan={5}>
                  <LinearProgress color="info" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommentRepliers;