import { Box, Button, Chip, Typography, useTheme } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import AddSectionComment from "../partials/AddSectionComment";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../../../contexts/UserContext";
import PublicCommentReplies from "./PublicCommentReplies";
import ManageComment from "./ManageComment";
import DeleteCommentDialog from "./Manage_Comments/DeleteCommentDialog";
import { DownloadDone, FileDownload } from "@mui/icons-material";
import AttachmentIcon from "@mui/icons-material/Attachment";

const SectionFeedbacks = ({
  comments,
  section,
  documentDetail,
  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const [showFeedbacks, setShowFeedbacks] = useState(false);

  // User context
  const { userInfo, userRole, userToken } = useContext(UserContext);

  return (
    <Box width="100%">
      <Box sx={{ marginBottom: "0", textAlign: "right" }}>
        <Button
          variant="text"
          size="medium"
          sx={{
            marginRight: "5px",
            textTransform: "none",
            alignSelf: "right",
            color: colors.primary[200],
          }}
          onClick={() => setShowFeedbacks(!showFeedbacks)}
        >
          <ChatBubbleOutlineIcon fontSize="small" /> &nbsp; {t("comments")} (
          {userInfo &&
            comments.filter((comment) => {
              return (
                parseInt(comment.commented_by) === parseInt(userInfo.user.id)
              );
            }).length}
          )
        </Button>
      </Box>
      {showFeedbacks && (
        <Box sx={{ borderRadius: "15px" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <hr
              style={{
                height: "2px",
                backgroundColor: colors.grey[600],
                opacity: "30%",
              }}
            />
            <Typography
              variant="h5"
              sx={{ paddingBottom: "5px", fontWeight: "600" }}
            >
              {t("comments")} (
              {userInfo &&
                comments.filter((comment) => {
                  return (
                    parseInt(comment.commented_by) ===
                    parseInt(userInfo.user.id)
                  );
                }).length}
              )
            </Typography>

            <List sx={{ width: "100%" }}>
              {comments.length > 0
                ? userInfo &&
                  comments
                    .filter((comment) => {
                      return (
                        parseInt(comment.commented_by) ===
                        parseInt(userInfo.user.id)
                      );
                    })
                    .map((comment) => (
                      <>
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
                              borderRadius: "15px",
                              padding: "10px",
                              height: "auto",
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
                                    <strong>
                                      {comment.commenter
                                        ? `${
                                            comment.commenter.first_name +
                                            " " +
                                            comment.commenter.middle_name
                                          }`
                                        : "Anonymous"}
                                    </strong>{" "}
                                    {comment.commenter.institution_name ? (
                                      <Chip
                                        label={
                                          comment.commenter.institution_name
                                        }
                                        size="small"
                                        color="info"
                                      />
                                    ) : (
                                      <Chip
                                        label={` Public user `}
                                        size="small"
                                        color="info"
                                      />
                                    )}
                                  </Typography>
                                </div>
                                <div>
                                  <ManageComment
                                    commentID={comment.id}
                                    commentText={comment.section_comment}
                                    documentDetail={documentDetail}
                                    fetchDocumentDetails={fetchDocumentDetails}
                                    fetchDocumentSections={
                                      fetchDocumentSections
                                    }
                                    fetchDocumentComments={
                                      fetchDocumentComments
                                    }
                                  />
                                </div>
                              </div>
                            }
                            secondary={
                              <>
                                <Typography
                                  sx={{
                                    display: "inline",
                                    textAlign: "justify",
                                  }}
                                  component="span"
                                  variant="body1"
                                  color="text.primary"
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: (() => {
                                        const txt =
                                          document.createElement("textarea");
                                        txt.innerHTML = comment.section_comment;
                                        return txt.value;
                                      })(),
                                    }}
                                  />{" "}
                                  <span>
                                    {comment.attachments &&
                                    comment.attachments.length > 0 ? (
                                      <Button
                                        href={comment.attachments[0].file}
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
                        <ListItem>
                          {documentDetail ? (
                            <PublicCommentReplies
                              comment={comment}
                              reflections={comment.reflection_on_comments}
                              fetchDocumentDetails={fetchDocumentDetails}
                              fetchDocumentSections={fetchDocumentSections}
                              fetchDocumentComments={fetchDocumentComments}
                            />
                          ) : (
                            ""
                          )}
                        </ListItem>
                      </>
                    ))
                : "No comments"}
            </List>
            {documentDetail && documentDetail.draft_status.name === "Open" ? (
              userToken !== null &&
              userToken !== undefined &&
              userRole != null &&
              userRole !== undefined &&
              parseInt(documentDetail.comment_closed) === 0 ? (
                <AddSectionComment
                  section={section}
                  documentDetail={documentDetail}
                  fetchDocumentDetails={fetchDocumentDetails}
                  fetchDocumentSections={fetchDocumentSections}
                  fetchDocumentComments={fetchDocumentComments}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </motion.span>
        </Box>
      )}
    </Box>
  );
};

export default SectionFeedbacks;