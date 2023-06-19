import { Box, Button, Typography, useTheme } from "@mui/material";
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

const SectionFeedbacks = ({ comments, section, documentDetail }) => {
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
                              <>
                                <Typography variant="h5" fontWeight="600">
                                  {comment.commenter
                                    ? `${
                                        comment.commenter.first_name +
                                        " " +
                                        comment.commenter.middle_name
                                      }`
                                    : "Anonymous"}
                                </Typography>
                              </>
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
                          {documentDetail &&
                          documentDetail.draft_status.name === "Open" ? (
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
            {documentDetail && documentDetail.draft_status.name === "Open" ? (
              userToken !== null &&
              userToken !== undefined &&
              userRole != null &&
              userRole !== undefined ? (
                <AddSectionComment section={section} />
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