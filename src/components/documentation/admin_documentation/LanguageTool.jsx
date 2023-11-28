import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTranslation } from "react-i18next";

const LanguageTool = () => {
  const { t } = useTranslation();
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {t("language_tool")}
        </Typography>

        <Typography gutterBottom>{t("language_tool_description")}</Typography>
        <Button
          href="prepare_language_translation"
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ textTransform: "none" }}
        >
          {t("next")}
          <NavigateNextIcon fontSize="small" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default LanguageTool;
