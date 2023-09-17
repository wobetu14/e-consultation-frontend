import { useTheme } from "@emotion/react";
import {
  Box,
  CircularProgress,
  Hidden,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Loading from "../../../Loading";
import { tokens } from "../../../theme";
import DocumentsFilters from "../DocumentsFilters";
import DocumentList from "./DocumentList";
import './DocumentDisplay.css'

/**
 * DocumentDisplay definition. This component renders draft documents as list of drafts displayed on the homepage. 
 * This component is the child of Home.js component and accepts variable as props from Home.js
 */
const DocumentDisplay = ({
  drafts,
  setDrafts,
  unfilteredDrafts,
  setUnfilteredDrafts,
  pagination,
  setPagination,
  totalDrafts,
  setTotalDrafts,
  pageCount,
  setPageCount,
  loading,
  setLoading,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        margin: "0px 50px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        
      }}
    >
      <Box sx={{ width: "70%", marginRight: "20px" }} >
        <Box width="100%" sx={{ marginBottom: "10px" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "500", color: colors.headerText[100] }}
          >
            {t("draft_documents")}
          </Typography>
        </Box>

{/* 
  Trigger loading view based the value of loading variable value. It is true the loading... 
  components will be displayed. waiting for drafts data value to be non-empty. 
  If draft value is empty the loading value is true and vice versa. 
  The loading variable is used to track results from search and filter document features.  
*/}
        {loading && (
          <CircularProgress color="info" sx={{ marginBottom: "10px" }} />
        )}

  {/* Create a DocumentList component by spliting the draft array with the .map() array method so that we can create list of
  draft info so that user can navigate through and read and comment on the document he / she is interested in. */}
        {drafts ? (
          drafts.map((draft) => (
            <Link to={`/draft/${draft.id}`} style={{ textDecoration: "none" }} >
              <DocumentList
                deadline={"May 02, 2023"}
                draft={draft}
                setDrafts={setDrafts}
                unfilteredDrafts={unfilteredDrafts}
                setUnfilteredDrafts={setUnfilteredDrafts}
                loading={loading}
                setLoading={setLoading}
              />
            </Link>
          ))
        ) : (
          <>
          {/* Render <Loading /> component if drafts value is empty */}
            <Loading />
            <Loading />
            <Loading />
          </>
        )}

      </Box>

      
      <Box sx={{ width: "30%" }}>
      <Hidden mdDown implementation="css">
      <Box width="100%" sx={{ marginBottom: "10px" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "500", color: colors.headerText[100] }}
          >
            {t("filter_documents")}
          </Typography>
        </Box>

        {/* Render DocumentFilters compnent and pass drafts and related data as props */}
        
        <DocumentsFilters
          drafts={drafts}
          setDrafts={(d) => setDrafts(d)}
          unfilteredDrafts={unfilteredDrafts}
          setUnfilteredDrafts={setUnfilteredDrafts}
          totalDrafts={totalDrafts}
          setTotalDrafts={setTotalDrafts}
          pageCount={setPageCount}
          setPageCount={setPageCount}
          loading={loading}
          setLoading={setLoading}
        />
      </Hidden>
      </Box>
    </Box>
  );
};

export default DocumentDisplay;