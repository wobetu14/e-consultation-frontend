import { Box, Button, Typography, useTheme } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import RepliesToComments from "../../guest/partials/RepliesToComments";

const ReplyFeedbacks = ({ 
  comments, 
  documentDetail,

  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,

}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const [showComments, setShowComments] = useState(false);

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
          onClick={() => setShowComments(!showComments)}
        >
          <ChatBubbleOutlineIcon fontSize="small" /> &nbsp; {t("comments")} (
          {comments.length})
        </Button>
      </Box>
      {showComments && (
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
              {t("comments")} ({comments.length})
            </Typography>

            <List sx={{ width: "100%" }}>
              {comments.length > 0
                ? comments.map((comment) => (
                    <>
                      <ListItem
                        alignItems="flex-center"
                        key={comment.id}
                        sx={{ height: "40px" }}
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
                        <RepliesToComments
                          documentDetail={documentDetail}
                          comment={comment}
                          reflections={comment.reflection_on_comments}

                          fetchDocumentDetails={fetchDocumentDetails}
                          fetchDocumentSections={fetchDocumentSections}
                          fetchDocumentComments={fetchDocumentComments}
                        />
                      </ListItem>
                    </>
                  ))
                : "No comments"}
            </List>

          </motion.span>
        </Box>
      )}
    </Box>
  );
};

export default ReplyFeedbacks
