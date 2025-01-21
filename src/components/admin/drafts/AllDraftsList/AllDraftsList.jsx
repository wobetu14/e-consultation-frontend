import { Box } from "@mui/system";
import React from "react";
import Header from "../../AdminHeader";
import { DraftsDataProvider } from "../../../../contexts/DraftsDataContext";
import { useTranslation } from "react-i18next";
import AllDraftsTable from "./AllDraftsTable";

/**
 * Create Drafts table and encapsulate Drafts Data Provider and then
 * Render <DraftsTable /> component so that all, dependents to the drafts data context can access
 * the data from the context provided by DraftsDatarovider
 */
const AllDraftsList = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Header
        title={"All Draft Documents List and Status"}
        subtitle={"Follow up draft documents published from all institutions"}
      />
      {/* Create Drafts Data Provided */}
      <DraftsDataProvider>
        {/* 
            Render <DraftsTable /> inside the provider. Then all component to 
            create, edit, view and delete draft are children of DraftsTable and can access 
            all the drafts infomation 
        */}
        <AllDraftsTable />
      </DraftsDataProvider>
    </Box>
  );
};

export default AllDraftsList;
