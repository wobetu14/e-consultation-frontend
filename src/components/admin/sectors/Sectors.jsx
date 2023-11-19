import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";
import { SectorsDataProvider } from "../../../contexts/SectorsDataContext";
import Header from "../AdminHeader";
import SectorsTable from "../DataTables/SectorsTable";

const Sectors = () => {
  const {t}=useTranslation();
  return (
    <Box m="0 20px" width={"95%"}>
      <Header title={t('sectors')} subtitle={t('manage_sectors')} />
      <SectorsDataProvider>
        <SectorsTable />
      </SectorsDataProvider>
    </Box>
  );
};

export default Sectors;