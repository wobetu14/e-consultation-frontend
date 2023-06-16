import { Box } from "@mui/system";
import React from "react";
import Header from "../AdminHeader";
import "../../Table.css";
import DraftsTable from "../DataTables/DraftsTable";
import { DraftsDataProvider } from "../../../contexts/DraftsDataContext";

const Drafts = () => {
  return (
    <Box m="0 20px" width={"95%"}>
      <Header
        title="Draft Documents / Consultations"
        subtitle="Manage draft documents / consultations"
      />
      <DraftsDataProvider>
        <DraftsTable />
      </DraftsDataProvider>
    </Box>
  );
};

export default Drafts;