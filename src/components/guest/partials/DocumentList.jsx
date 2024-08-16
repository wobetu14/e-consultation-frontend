import { useTheme } from "@emotion/react";
import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { tokens } from "../../../theme";
import "./DocumentDisplay.css";

/**
 * This component renders list of draft documents and some meta info with a clickable feature to view the complete infomration
 * and content of the document so that user can read and comment on the draft document.
 *
 * The drafts meta info is passed from Home --> then DocumentDisplay components and here we will create HTML to render the document.
 */

const DocumentList = ({ status, deadline, draft, loading, setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  return (
    <div>
      {/* Create list componet inside a Paper from Material UI for display draft info. */}
      <Paper
        elevation={1}
        sx={{ /* backgroundColor: colors.grey[200], */ marginBottom: "20px" }}
        className="document_list_container"
      >
        <List elevation={1} sx={{ width: "100%" }}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                // Create React fragment inside which display the drafts title / short tile using MUI Typography component
                <React.Fragment>
                  <Typography
                    variant="h5"
                    sx={{
                      display: "inline",
                      fontWeight: "600",
                    }}
                  >
                    {/* Access drafts title from the draft data variable */}
                    {draft.short_title}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    {/* Access the draft summary info */}
                    {draft.summary}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <div style={{ color: colors.grey[600] }}>
                      {/* 
                        Access the drafts status and conditionally render the status info. If it is open, display with green background
                        and a label text "Open for comment" and if the status is "Closed" display with red background and a label text 
                        "Closed for comment"  
                      */}
                      {draft.draft_status.name === "Open" &&
                      parseInt(draft.comment_closed) === 0 ? (
                        <Chip
                          label={t("open_for_comment")}
                          size="small"
                          sx={{
                            backgroundColor: colors.successColor[100],
                            color: colors.grey[500],
                            marginRight: "5px",
                          }}
                        />
                      ) : draft.draft_status.name === "Open" &&
                        parseInt(draft.comment_closed) === 1 ? (
                          /**
                           * If the document status is still 'Open' but the commenting deadline is passed, display as 'Closed for comment"
                           */
                        <Chip
                          label="Closed for Comment"
                          size="small"
                          sx={{
                            backgroundColor: colors.grey[600],
                            color: colors.grey[500],
                            marginRight: "5px",
                          }}
                        />
                      ) : (
                        ""
                      )}

                      {draft.draft_status.name === "Closed" ? (
                        /**
                         * If the document status is closed, commenting is also disabled. At this time display the status as 
                         * 'Consultation ended'
                         */
                        <Chip
                          label="Consultation ended"
                          size="small"
                          sx={{
                            backgroundColor: colors.secondary[100],
                            color: colors.grey[500],
                            marginRight: "5px",
                          }}
                        />
                      ) : (
                        ""
                      )}

                      {/**
                       * Display draft closing date or commenting deadline date if the draft status is 'Open'
                       */}

                      {/* Display draft closing date if the draft status is "Open" */}
                      {draft.draft_status.name === "Open" &&
                      parseInt(draft.comment_closed) === 0 ? (
                        <label>
                          <strong> {t("draft_closing_date")}: </strong>{" "}
                          {draft.comment_closing_date} &nbsp;
                        </label>
                      ) : (
                        ""
                      )}

                      {/* Display law category of the draft document. */}
                      <label>
                        <strong>{t("law_category")}: </strong>{" "}
                        {draft.law_category ? draft.law_category.name : ""}{" "}
                        &nbsp;
                      </label>

                      {/* Display institutions name which the draft is initiated by */}
                      <label>
                        <strong>{t("institution")}: </strong>{" "}
                        {draft.institution.name} &nbsp;
                      </label>
                    </div>
                  </Stack>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default DocumentList;