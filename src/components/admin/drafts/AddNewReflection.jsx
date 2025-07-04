import {
  Alert,
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { tokens } from "../../../theme";
import { useRef, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";

import axios from "../../../axios/AxiosGlobal";
import { useTranslation } from "react-i18next";


const AddNewReflection = ({
  comment,
  reflections,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const [serverErrorMsg, setServerErrorMsg] = useState(null);
  const [serverSuccessMsg, setServerSuccessMsg] = useState(null);

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
  };

  const formik = useFormik({
    initialValues: {
      commentID: comment.id,
      commentMessage: "",
      file: null,
      label: "file name",
    },

    onSubmit: (values) => {
      const replyData = {
        comment_id: values.commentID,
        message: commentHTML,
        file: values.file,
        label: values.label,
      };

      replyComment(replyData);
    },
  });

  const replyComment = async (replyData) => {
    return await axios
      .post("reply-comment", replyData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setServerSuccessMsg(res.data.message);
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
                    label="Write a reply..."
                    fullWidth
                    multiline
                    color="info"
                    size="small"
                    name="commentMessage"
                    value={formik.values.commentMessage}
                    onBlur={formik.handleBlur}
                    // onChange={formik.handleChange}
                    onChange={(e) => {
                      formik.setFieldValue("commentMessage", e.target.value);
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
                    size="large"
                    elevation={0}
                    disabled={formik.values.commentMessage === ""}
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

export default AddNewReflection;
