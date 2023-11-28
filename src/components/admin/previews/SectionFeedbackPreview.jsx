import { Box, Button, Typography, useTheme } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { motion } from "framer-motion";

import PublicCommentReplies from "../../guest/partials/PublicCommentReplies";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../../../contexts/UserContext";
import ManageComment from "../../guest/partials/ManageComment";
import DeleteCommentDialog from "../../guest/partials/Manage_Comments/DeleteCommentDialog";

const SectionFeedbackPreview = ({ comments, section, documentDetail }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const [showFeedbacks, setShowFeedbacks] = useState(false);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // User context
  const { userInfo} = useContext(UserContext);

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
          {userInfo && comments.length})
        </Button>
      </Box>
      {showFeedbacks && (
        <Box sx={{ padding: "10px", borderRadius: "15px" }}>
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
              {t("comments")} ({userInfo && comments.length})
            </Typography>

            <List sx={{ width: "100%" }}>
              {comments.length > 0
                ? userInfo &&
                  comments.map((comment) => (
                    <>
                      <ListItem
                        alignItems="flex-center"
                        key={comment.id}
                        sx={{ height: "75px" }}
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
                          }}
                          primary={
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div>
                                <Typography variant="h5" fontWeight="600">
                                  {comment.commenter
                                    ? `${
                                        comment.commenter.first_name +
                                        " " +
                                        comment.commenter.middle_name +
                                        " "
                                      }`
                                    : "Anonymous"}

                                  {comment.commenter
                                    ? "( " +
                                      comment.commenter.institution_name +
                                      " )"
                                    : ""}
                                </Typography>
                              </div>
                              <div>
                                <ManageComment
                                  openDeleteDialog={openDeleteDialog}
                                  setOpenDeleteDialog={setOpenDeleteDialog}
                                  openEditDialog={openEditDialog}
                                  setOpenEditDialog={setOpenEditDialog}
                                  commentID={comment.id}
                                  commentText={comment.section_comment}
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
                                {comment.section_comment}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <ListItem>
                        {(documentDetail &&
                          documentDetail.draft_status.name === "Open") ||
                        documentDetail.draft_status.name === "Closed" ? (
                          <PublicCommentReplies
                            comment={comment}
                            reflections={comment.reflection_on_comments}
                          />
                        ) : (
                          ""
                        )}
                      </ListItem>
                    </>
                  ))
                : "No comments"}
            </List>

            {openDeleteDialog && (
              <DeleteCommentDialog
                title="Deleting comment"
                text="You are about to delete this comment. Are you sure?"
              />
            )}
          </motion.span>
        </Box>
      )}
    </Box>
  );
};

export default SectionFeedbackPreview;