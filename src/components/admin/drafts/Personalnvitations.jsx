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
 * This component is used to render list of people who have been personally invited 
 * to provide comment of this specific draft document. 
 */

/**
 * Create a functional component named "PersonalInvitations"
 */

const PersonalInvitations = () => {

  /**
   * Access URL parameter using the useParams() hook
   */
  const params = useParams();

  /**
   * Create state to store list of invited people using the useState() hook
   */
  const [invitedPeople, setInvitedPeople] = useState(null);

 /**
   * Destructure or access user role information from the context - UserContext 
   * @param {*} userRole - User Role such as ['Super Admin', 'Federal Admin', 'Regional Admin' etc]
   */
  const { userRole } = useContext(UserContext);

  /**
   * Destructure the translation object from i18next internationalization API using the useTranslation() hook
   */
  const { t } = useTranslation();

  /**
   * Call a method that defines an API call that fetches list of invited people using the useEffect hook
   */
  useEffect(() => {
    fetchInvitedPeople();
  }, []);

  /**
   * Method definition that implements API call that fetches a list of personally invited people
   * @returns listOfInvitedPeople - If API call is success; returns listOfInvitedPeople object
   * @returns exceptions - If API call fails; returns error message
   */
  const fetchInvitedPeople = async () => {
    return await axios
      .get(`comment-request?is_personal=${1}&draft_id=${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setInvitedPeople(res.data.data);
      })
      .catch((error) => {});
  };

  return (
    /**
     * Create UI to render the listOfInvitedPeople response data with data table
     */
    <Box m="0 20px" width={"95%"}>
      {/**
       * Display table heading information / title
       */}
      <Typography variant="h5" fontWeight="600">
        {t("invitations_to_people")}
      </Typography>

      {/**
       * Create table data. The table data is created using Material UI library
       */}
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
                    {t("to")} ({t("email_address")})
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  {t("requesting_user")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/**
             * Extract and render invitedPeople data using the map method and using the 
             * TableRow table row object from the material UI
             */}
            {invitedPeople
              ? invitedPeople.map((people) => (
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
                        {people.requested_by_name
                          ? people.requested_by_name
                          : ""}
                      </Typography>
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

export default PersonalInvitations;
