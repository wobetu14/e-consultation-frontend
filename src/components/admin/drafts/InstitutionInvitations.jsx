import {
  Box,
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

/**
 * This component is used to list / display list of institutional invitations. i.e. List of institutions who are invited 
 * to provide consultations on this specific document and its acceptance status
 * @param {*} documentDetail - DocumentDetail prop that contain draft documents meta data info 
 * @returns 
 */

const InstitutionInvitations = ({ documentDetail }) => {
  /**
   * Create state hook variable and method to store list of invited institutions
   */
  const [invitedInstitutions, setInvitedInstitutions] = useState(null);

  /**
   * Create variable to access and store URL params data using the useParams hook
   */
  const params = useParams();

  /**
   * Destructure translation object from the i18next internationalization library using the useTranslation hook
   */
  const {t}=useTranslation();

  /**
   * Destructure or access user information from the context - UserContext 
   * @param {*} userInfo - User Information such as id, first_name, middle_name, last_name, region, institution etc
   * @param {*} userRole - User Role such as ['Super Admin', 'Federal Admin', 'Regional Admin' etc]
   */
  const { userInfo, userRole } =
    useContext(UserContext);

  /**
   * Call a method that defines an API call that fetches list of institutions using the useEffect hook
   */
  useEffect(() => {
    fetchInvitedInstitutions();
  }, []);

  /**
   * Method definition that implements API call that fetches a list of institutions
   * @returns listOfInstitutions - If API call is success; returns listOfInstitutions object
   * @returns exceptions - If API call fails; returns error message
   */
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
        
      });
  };

  return (
    /**
     * Create UI to render the listOfInstitutions response data with data table
     */
    <Box m="0 20px" width={"95%"}>
      {/**
       * Display table heading information / title
       */}
      <Typography variant="h5" fontWeight="600">
        {t('invitations_to_institutions')}
      </Typography>

      {/**
       * Create table data. The table data is created using Material UI library
       */}
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
                    {t('to')} ({t('institution')})
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
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  {t('acceptance_status')}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/**
             * Extract and render invitedInstitutions data using the map method and using the TableRow 
             * table row object from the material UI. Filter out if there is null value for commenter institution name
             */}
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