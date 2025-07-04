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
import { useContext, useEffect, useRef, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import axios from "../../../axios/AxiosGlobal";
import { UserContext } from "../../../contexts/UserContext";

const AddSectionComment = ({
  section,
  documentDetail,
  comments,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

  // User context
  const { userInfo } = useContext(UserContext);

  const inputFile = useRef(null);

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

  const helperTextStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "15px",
  };

  const [commentHTML, setCommentHTML] = useState("");

  const convertCommentToHTML = (content) => {
    // Convert the comment content to HTML format
    const convertedHtmlValue = content
      .replace(/\n/g, "<br />") // Replace new lines with <br />
      .replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>") // Bold text
      .replace(/(\*|_)(.*?)\1/g, "<em>$2</em>") // Italic text
      .replace(/~~(.*?)~~/g, "<del>$1</del>") // Strikethrough text
      .replace(/`(.*?)`/g, "<code>$1</code>") // Inline code
      .replace(/```(.*?)```/g, "<pre><code>$1</code></pre>") // Code block
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />') // Images
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>') // Links
      .replace(/^\s*>\s*(.*)$/gm, "<blockquote>$1</blockquote>") // Blockquotes
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;"); 
    setCommentHTML(convertedHtmlValue);
  }

  const formik = useFormik({
    initialValues: {
      sectionID: section.id,
      sectionComment: "",
      file: null,
      label:'file name',
      commentedBy: userInfo ? userInfo.user.id : "",
      commentingTeam: 1,
      createdBy: userInfo ? userInfo.user.id : "",
    },

    onSubmit: (values) => {
      const sectionCommentData = {
        section_id: values.sectionID,
        section_comment: commentHTML, // Use the HTML content
        file: values.file,
        label: values.label,
        commented_by: values.commentedBy,
        commenting_team: values.commentingTeam,
        created_by: userInfo ? userInfo.user.id : "",
      };

      addComment(sectionCommentData);
    },
  });

  const addComment = async (sectionCommentData) => {
    return await axios
      .post("comments", sectionCommentData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(sectionCommentData);
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
                    name="sectionComment"
                    value={formik.values.sectionComment}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue("sectionComment", e.target.value);
                      convertCommentToHTML(e.target.value); // Update comment content state
                    }}
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
                    size="medium"
                    elevation={0}
                    disabled={formik.values.sectionComment === ""}
                    sx={{
                      position: "top",
                    }}
                  >
                    <SendIcon />
                  </Button>
                </>
              }
            />
          </ListItem>

          <ListItem sx={{ marginLeft: "60px" }}>
            <ListItemText
              primary={
                <>
                  <Typography
                    variant="subtitle1"
                    sx={{ paddingBottom: "10px" }}
                  >
                    {t("attachement_file")} (optional): &nbsp;
                    <input
                      type="file"
                      name="file"
                      ref={inputFile}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        formik.setFieldValue("file", e.target.files[0]);
                      }}
                      helperText={
                        formik.touched.file && formik.errors.file ? (
                          <span style={helperTextStyle}>
                            {formik.touched.file}
                          </span>
                        ) : null
                      }
                    />
                  </Typography>
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
                        {t("Thank_you_for_feedback")}{" "}
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

export default AddSectionComment;
