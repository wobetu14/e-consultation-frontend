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
import { useTranslation } from "react-i18next";

const PersonalInvitations = () => {
  const params = useParams();
  const [invitedPeople, setInvitedPeople] = useState(null);

  // User context
  const { userRole } = useContext(UserContext);

  const {t}=useTranslation();

  useEffect(() => {
    fetchInvitedInstitutions();
  }, []);

  const fetchInvitedInstitutions = async () => {
    return await axios
      .get(`comment-request?is_personal=${1}&draft_id=${params.id}`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setInvitedPeople(res.data.data);
      })
      .catch((error) => {
        
      });
  };

  return (
    <Box m="0 20px" width={"95%"}>
      <Typography variant="h5" fontWeight="600">
        {t('invitations_to_people')}
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
                    {t('to')} ({t('email_address')})
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  {t('requesting_user')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitedPeople ? (
              invitedPeople.map((people) => (
                <TableRow
                  key={people.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body1">
                      {people.email ? people.email : ""}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body1">
                      {people.requested_by_name ? people.requested_by_name : ""}
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

export default PersonalInvitations;