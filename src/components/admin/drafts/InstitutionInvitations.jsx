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

const InstitutionInvitations = ({ documentDetail }) => {
  const [invitedInstitutions, setInvitedInstitutions] = useState(null);
  const params = useParams();

  // User context
  const { userInfo, userRole } =
    useContext(UserContext);

  useEffect(() => {
    fetchInvitedInstitutions();
  }, []);

  const fetchInvitedInstitutions = async () => {
    return await axios
      .get(
        `comment-request?draft_id=${params.id}&requester_institution_id=${userInfo.user.institution_id}`,
        {headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data"
        }}
      )
      .then((res) => {
        setInvitedInstitutions(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Box m="0 20px" width={"95%"}>
      <Typography variant="h5" fontWeight="600">
        Invitations to Institutions
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ marginTop: "10px", marginBottom: "20px" }}
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
                  Requesting User
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Acceptance Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invitedInstitutions ? (
              invitedInstitutions
                .filter((institution) => {
                  return institution.commenter_institution_name !== null;
                })
                .map((InvitedInstitution) => (
                  <TableRow
                    key={InvitedInstitution.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="body1">
                        {InvitedInstitution.commenter_institution_name
                          ? InvitedInstitution.commenter_institution_name
                          : ""}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body1">
                        {InvitedInstitution.requested_by_name
                          ? InvitedInstitution.requested_by_name
                          : ""}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body1">
                        {InvitedInstitution.status === 0
                          ? "Pending"
                          : InvitedInstitution.status === 1
                          ? "Accepted"
                          : "Rejected"}
                      </Typography>
                    </TableCell>

                    {/*   <TableCell>
                <Typography variant="body1">{(InvitedInstitution.status && InvitedInstitution.status===0) ? "Pending":((InvitedInstitution.status && InvitedInstitution.status===1) ? "Accepted":"Rejected")}</Typography>
              </TableCell> */}
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

export default InstitutionInvitations;