import { Box } from "@mui/system";
import React from "react";
import Header from "../AdminHeader";
import DraftsTable from "../DataTables/DraftsTable";
import { DraftsDataProvider } from "../../../contexts/DraftsDataContext";

/**
 * Create Drafts table and encapsulate Drafts Data Provider and then
 * Render <DraftsTable /> component so that all, dependents to the drafts data context can access
 * the data from the context provided by DraftsDatarovider 
 */
const Drafts = () => {
  return (
    <Box>
      <Header
        title="Draft Documents / Consultations"
        subtitle="Manage draft documents / consultations"
      />
      {/* Create Drafts Data Provided */}
      <DraftsDataProvider>
        {/* 
            Render <DraftsTable /> inside the provider. Then all component to 
            create, edit, view and delete draft are children of DraftsTable and can access 
            all the drafts infomation 
        */}
        <DraftsTable />
      </DraftsDataProvider>
    </Box>
  );
};

export default Drafts;