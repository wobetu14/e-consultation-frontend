import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UserManualPDF from "../documentation/downloadable_files/E-Consultation Portal - User Manual.pdf";
import { useTranslation } from "react-i18next";

const DownloadUserManual = () => {
  const { t } = useTranslation();
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {t("user_manual")}
        </Typography>
        <Typography gutterBottom>{t("user_manual_description")}</Typography>
        <Button
          href={UserManualPDF}
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ textTransform: "none" }}
        >
          <Typography>{t("download")}</Typography>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DownloadUserManual;
