import Header from "../AdminHeader";
import { RegionsDataProvider } from "../../../contexts/RegionsDataContext";
import RegionsTable from "./RegionsTable";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const Regions = () => {
  const { t } = useTranslation();
  return (
    <Box m="0 20px" width={"95%"}>
      <Header title={t("regions")} subtitle={t("manage_regions")} />
      <RegionsDataProvider>
        <RegionsTable />
      </RegionsDataProvider>
    </Box>
  );
};

export default Regions;
