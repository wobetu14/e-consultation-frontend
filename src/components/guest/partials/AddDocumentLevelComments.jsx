import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import axios from "../../../axios/AxiosGlobal";
import { UserContext } from "../../../contexts/UserContext";

/**
 * Create a coponent to allow user add new document level comments / general comments
 */
const AddDocumentLevelComments = ({
  documentID,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  /**
   * Create variables to handle response messages coming from the server.
   * serverSuccessMsg is to handle success message if the API successfully handle the request
   * while serverErrorMsg is to handle error messages if the API couldn't not be successfull
   */
  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  // Destructure userInfo from UserContext
  const { userInfo } = useContext(UserContext);

  /**
   * Inline CSS contants to format server response message.
   * This style constants are created to format values of either serverErrorMsg or serverSuccessMsg.
   * Note that, this constant definitions are available on almost every component of this application.
   */

  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  const successStyle = {
    color: colors.primary[100],
    backgroundColor: colors.successColor[400],
    fontWeight: "400",
    fontSize: "18px",
  };

  /**
   * Here we have built a formik object. What is formik? It is a group react components to easily handle form data.
   * In this project, we have used formik package to handle most of our form processing tasks.
   * Read more about formik at: https://formik.org/docs/tutorial
   */

  /**
   * Create formik object and setup initial values as key:value pairs.
   */
  const formik = useFormik({
    /**
     * Setup initial values. with key:value pairs where key is related to the name of form elemeents
     * and values are initial values avaialable for the form elements
     */
    initialValues: {
      draftID: documentID,
      generalComment: "",
      commentedBy: userInfo ? userInfo.user.id : "",
      commentingTeam: 1,
      createdBy: userInfo ? userInfo.user.id : "",
    },

    /**
     * Aggregate form data to be passed to the API call on form submit call the functions that defines the API request.
     * This form data are updates from the initial values.
     * Here we have aggregated form data, make a function call (AddComment) that defines API calls to add general comments
     */
    onSubmit: (values) => {
      const documentCommentData = {
        draft_id: values.draftID,
        general_comment: values.generalComment,
        commented_by: values.commentedBy,
        commenting_team: values.commentingTeam,
        created_by: values.createdBy,
      };

      // Function call
      addComment(documentCommentData);
    },
  });

  // Function definition to define API calls to add new general comment.
  const addComment = async (documentCommentData) => {
    return await axios
      .post("general-comments", documentCommentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.success);
        setServerErrorMsg(null);

        fetchDocumentDetails();
        fetchDocumentSections();
        fetchDocumentComments();

        formik.resetForm();
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
      });
  };

  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit}>
        <List width="100%">
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="User"
                size="large"
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              sx={{ width: "100%", marginRight: "0px" }}
              primary={
                <>
                  <TextField
                    label={t("write_comment") + "..."}
                    fullWidth
                    multiline
                    color="info"
                    size="small"
                    name="generalComment"
                    value={formik.values.generalComment}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                </>
              }
            />

            <ListItemText
              primary={
                <>
                  <Button
                    variant="text"
                    type="submit"
                    color="info"
                    size="large"
                    elevation={0}
                    disabled={formik.values.generalComment === ""}
                  >
                    <SendIcon />
                  </Button>
                </>
              }
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={
                <>
                  <Typography variant="body2">
                    {serverSuccessMsg ? (
                      <Alert severity="success" style={successStyle}>
                        Thank you for your feedback.{" "}
                      </Alert>
                    ) : null}
                  </Typography>

                  <Typography variant="body2">
                    {serverErrorMsg ? (
                      <Alert severity="error" style={errorStyle}>
                        {serverErrorMsg}
                      </Alert>
                    ) : null}
                  </Typography>
                </>
              }
            />
          </ListItem>
        </List>
      </form>
    </Box>
  );
};

export default AddDocumentLevelComments;
