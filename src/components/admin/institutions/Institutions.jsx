import { Box } from "@mui/system";
import React from "react";
import InstitutionsTable from "../DataTables/InstitutionsTable";
import { InstitutionsDataProvider } from "../../../contexts/InstitutionsDataContext";

const Institutions = () => {
  return (
    <Box m="0 20px" width={"95%"}>
      <InstitutionsDataProvider>
        <InstitutionsTable />
      </InstitutionsDataProvider>
    </Box>
  );
};
export default Institutions;