import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import AdminUserGuideContainer from "./AdminUserGuideContainer";
import Header from "../../admin/AdminHeader";
import DownloadUserManual from "../DownloadManual";
import DownloadDraftTemplate from "./DownloadDraftTemplate";
import DownloadDeveloperGuide from "./DownloadDeveloperGuid";
import DraftPreparationGuide from "./DraftPreparationGuide";
import LanguageTool from "./LanguageTool";
import { UserContext } from "../../../contexts/UserContext";
import { useTranslation } from "react-i18next";

const ResourceCenter = () => {
  // User context
  const { userInfo, userRole } = useContext(UserContext);
  const { t } = useTranslation();
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={t("resource_center")}
          subtitle={t("user_manual_and_downloadable_resources_collection")}
        />
      </Box>

      <Box width={"95%"}>
        <Grid sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Header title={t("downloadable_resources")} />
            <Grid spacing={2} container>
              <Grid xs={3} item>
                <DownloadUserManual />
              </Grid>

              <Grid xs={3} item>
                <DownloadDraftTemplate />
              </Grid>

              <Grid xs={3} item>
                <DownloadDeveloperGuide />
              </Grid>
              <Grid xs={3} item>
                {userRole === "Super Admin" ? <LanguageTool /> : null}
              </Grid>
            </Grid>
          </motion.span>
        </Grid>
      </Box>

      <Box width={"85%"} sx={{ marginTop: "30px" }}>
        <Header title={t("preparing_draft_document")} />
        <Grid>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DraftPreparationGuide />
          </motion.span>
        </Grid>
      </Box>

      <Box width={"85%"} sx={{ marginTop: "30px" }}>
        <Header title={t("user_manual_html_version")} />

        <Grid>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AdminUserGuideContainer />
          </motion.span>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResourceCenter;
