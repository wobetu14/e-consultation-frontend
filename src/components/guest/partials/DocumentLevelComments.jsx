import { Button, Chip, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { motion } from "framer-motion";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PublicRepliesToGeneralComments from "./PublicRepliesToGeneralComments";
import ManageComment from "./ManageComment";
import { FileDownload } from "@mui/icons-material";

const DocumentLevelComments = ({
  comment,
  section,
  documentDetail,
  draftStatus,
  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <List sx={{ width: "100%", paddingBottom: "0", paddingTop: "20px" }}>
          <ListItem
            alignItems="flex-center"
            key={comment.id}
            sx={{ height: "auto" }}
          >
            <ListItemAvatar>
              <Avatar
                alt="User"
                size="large"
                src="/static/images/avatar/1.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              sx={{
                backgroundColor: colors.grey[200],
                borderRadius: "10px",
                padding: "10px",
              }}
              primary={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <Typography variant="h5">
                      {comment.commenter
                        ? `${
                            comment.commenter.first_name +
                            " " +
                            comment.commenter.middle_name
                          }`
                        : "Anonymous"}{" "}
                      {comment.commenter.institution_name ? (
                        "( " + comment.commenter.institution_name + " )"
                      ) : (
                        <Chip
                          label={` Public User `}
                          size="small"
                          color="info"
                        />
                      )}
                    </Typography>
                  </div>
                  <div>
                    <ManageComment
                      commentID={comment.id}
                      commentText={comment.general_comment}
                      documentDetail={documentDetail}
                      fetchDocumentDetails={fetchDocumentDetails}
                      fetchDocumentSections={fetchDocumentSections}
                      fetchDocumentComments={fetchDocumentComments}
                    />
                  </div>
                </div>
              }
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
  
                    <span
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          const txt = document.createElement("textarea");
                          txt.innerHTML = comment.general_comment;
                          return txt.value;
                        })(),
                      }}
                    />{" "}

                    <span>
                      {comment.file ? (
                        <Button
                          href={comment.file}
                          variant="outlined"
                          color="secondary"
                          target="_blank"
                          size="small"
                          sx={{
                            textTransform: "none",
                            borderRadius: "10px 10px",
                            padding: 0,
                          }}
                        >
                          <FileDownload fontSize="small" /> File
                        </Button>
                      ) : (
                        <>{null}</>
                      )}
                    </span>
                  </Typography>
                </>
              }
            />
          </ListItem>
          <PublicRepliesToGeneralComments
            comment={comment}
            reflections={comment.reflection_on_general_comments}
          />
        </List>
      </motion.span>
    </>
  );
};

export default DocumentLevelComments;
