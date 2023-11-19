import { Typography, Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { rootURL } from "../../axios/AxiosGlobal";
import Header from "./AdminHeader";
const Reports = () => {
  const {t}=useTranslation();
  return (
    <Box m="0 20px" width={"95%"}>
      <Header title={t('audit_reports')} subtitle="" />
      <Typography variant="h5" sx={{ fontWeight: "600" }}>
       {t('audit_activities')}
      </Typography>
      <Button
        href={`${rootURL}report/audit`}
        variant="contained"
        size="small"
        color="secondary"
        target="_blank"
        sx={{ textTransform: "none", marginBottom: "20px" }}
      >
        {t('download_audit_reports')}
      </Button>

      <Typography variant="h5" sx={{ fontWeight: "600" }}>
        {t('draft_document_report')}
      </Typography>
      <Button
        href={`${rootURL}report/drafts`}
        target="_blank"
        variant="contained"
        size="small"
        color="secondary"
        sx={{ textTransform: "none", marginBottom: "20px" }}
      >
        {t('download_draft_document_report')}
      </Button>
    </Box>
  );
};

export default Reports;
