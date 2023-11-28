import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeveloperGuide from "../downloadable_files/FDRE E-Consultation Portal - Developer Guide.pdf";
import { useTranslation } from "react-i18next";

const DownloadDeveloperGuide = () => {
  const { t } = useTranslation();
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: "600" }}>
          {t("developer_guide")}
        </Typography>

        <Typography gutterBottom>{t("developer_guide_description")}</Typography>
        <Button
          href={DeveloperGuide}
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

export default DownloadDeveloperGuide;
