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

const DocumentList = ({ status, deadline, draft, loading, setLoading }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  return (
    <div>
      <Paper
        elevation={1}
        sx={{ backgroundColor: colors.grey[200], marginBottom: "20px" }}
        className="document_list_container"
      >
        <List elevation={1} sx={{ width: "100%" }}>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography
                    variant="h5"
                    sx={{
                      display: "inline",
                      fontWeight: "600",
                    }}
                  >
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
                    {draft.summary}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <div style={{ color: colors.grey[600] }}>
                      {draft.draft_status.name === "Open" ? (
                        <Chip
                          label={t("open_for_comment")}
                          size="small"
                          sx={{
                            backgroundColor: colors.successColor[100],
                            color: colors.grey[500],
                            marginRight: "5px",
                          }}
                        />
                      ) : draft.draft_status.name === "Closed" ? (
                        <Chip
                          label={t("closed_for_comment")}
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

                      {draft.draft_status.name === "Open" ? (
                        <label>
                          <strong> {t("draft_closing_date")}: </strong>{" "}
                          {draft.comment_closing_date} &nbsp;
                        </label>
                      ) : (
                        ""
                      )}

                      <label>
                        <strong>{t("law_category")}: </strong>{" "}
                        {draft.law_category.name} &nbsp;
                      </label>

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