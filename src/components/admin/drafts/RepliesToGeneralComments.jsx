import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { motion } from "framer-motion";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import AddNewDocumentReply from "./AddNewDocumentReply";
import { UserContext } from "../../../contexts/UserContext";

const RepliesToGeneralComments = ({ reflections, comment, documentDetail }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const [showReplies, setShowReplies] = useState(false);

  // User context
  const { userInfo } = useContext(UserContext);

  return (
    <Box sx={{ padding: "10px", borderRadius: "15px", width: "100%" }}>
      <Box sx={{ marginBottom: "0", textAlign: "right" }}>
        <Button
          variant="text"
          size="small"
          sx={{
            marginRight: "5px",
            textTransform: "none",
            alignSelf: "right",
            color: colors.primary[200],
          }}
          onClick={() => setShowReplies(!showReplies)}
        >
          <ReplyIcon color="secondary" fontSize="small" />
          {t("replies")} ({reflections ? reflections.filter((reflection) => {
                  return (
                    parseInt(reflection.commented_by) ===
                    parseInt(userInfo.user.id)
                  );
                }).length : ""})
        </Button>
      </Box>

      {showReplies && (
        <>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <List sx={{ width: "100%" }}>
              {reflections
                ? reflections.filter((reflection) => {
                  return (
                    parseInt(reflection.commented_by) ===
                    parseInt(userInfo.user.id)
                  );
                }).map((reflection) => (
                    <>
                      <ListItem alignItems="flex-center" key={reflection.id}>
                        <ListItemAvatar>
                          <Avatar
                            alt="User"
                            size="large"
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{
                            backgroundColor: colors.grey[400],
                            borderRadius: "15px",
                            padding: "10px",
                          }}
                          primary={
                            <>
                              <Typography variant="h5" fontWeight="600">
                                {reflection.replier.first_name +
                                  " " +
                                  reflection.replier.middle_name}
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
                                {reflection.message}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    </>
                  ))
                : ""}
            </List>
            {documentDetail && (documentDetail.draft_status.name === "Open") ? (
              <>
                <AddNewDocumentReply comment={comment} />
              </>
            ) : (
              ""
            )}
          </motion.span>
        </>
      )}
    </Box>
  );
};

export default RepliesToGeneralComments;
