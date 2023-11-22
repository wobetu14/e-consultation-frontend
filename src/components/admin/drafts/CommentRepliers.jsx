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
import {useTranslation} from 'react-i18next';

const CommentRepliers = () => {
  const params = useParams();
  const [assignedPeople, setAssignedPeople] = useState(null);

  const {t}=useTranslation();

  // User context
  const { userRole } = useContext(UserContext);

  useEffect(() => {
    fetchInvitedInstitutions();
  }, []);

  const fetchInvitedInstitutions = async () => {
    return await axios
      .get(`comment-repliers?draft_id=${params.id}`, 
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setAssignedPeople(res.data.data);
      })
      .catch((error) => {
      });
  };

  return (
    <Box m="0 20px" width={"95%"}>
      <Typography variant="h5" fontWeight="600">
        {t('assigned_staff_to_reply')}
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
                    {t('to')} ({t('full_name')})
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
              ""
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommentRepliers;