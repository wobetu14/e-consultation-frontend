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
 * This component is used to render list of comment repliers assigned by the "Approver user role". 
 * Repliers to provide explanation or response on a specific draft document are assigned and 
 * only those who have been assigned as replier can provide reply or explanation
 */

/**
 * Create functional component named "CommentRepliers"
 */
const CommentRepliers = () => {
  /**
   * Access URL parameter using the useParams() hook
   */
  const params = useParams();

  /**
   * Create state to store list of assigned repliers or list of assigned people
   */
  const [assignedPeople, setAssignedPeople] = useState(null);

  /**
   * Destructure the translation object from i18next internationalization API using the useTranslation() hook
   */
  const { t } = useTranslation();

  /**
   * Destructure or access user role information from the context - UserContext 
   * @param {*} userRole - User Role such as ['Super Admin', 'Federal Admin', 'Regional Admin' etc]
   */
  const { userRole } = useContext(UserContext);

  /**
   * Call a method that defines an API call that fetches list of comment repliers using the useEffect hook
   */
  useEffect(() => {
    fetchCommentRepliers();
  }, []);

  /**
   * Method definition that implements API call that fetches a list of comment repliers
   * @returns listOfCommentRepliers - If API call is success; returns listOfCommentRepliers object
   * @returns exceptions - If API call fails; returns error message
   */
  const fetchCommentRepliers = async () => {
    return await axios
      .get(`comment-repliers?draft_id=${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setAssignedPeople(res.data.data);
      })
      .catch((error) => {});
  };

  return (
    /**
     * Create UI to render the listOfCommentRepliers response data with data table
     */
    <Box m="0 20px" width={"95%"}>
      {/**
       * Display table heading information / title
       */}
      <Typography variant="h5" fontWeight="600">
        {t("assigned_staff_to_reply")}
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
                    {t("to")} ({t("full_name")})
                  </Typography>
                </TableCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {/**
             * Extract and render assignedPeople data using the map method and using the 
             * TableRow table row object from the material UI
             */}
            {assignedPeople
              ? assignedPeople.map((people) => (
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
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CommentRepliers;
