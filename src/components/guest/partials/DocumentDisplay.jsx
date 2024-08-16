import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
  Hidden,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Loading from "../../../Loading";
import { tokens } from "../../../theme";
import DocumentsFilters from "../DocumentsFilters";
import DocumentList from "./DocumentList";
import "./DocumentDisplay.css";
import RefreshIcon from "@mui/icons-material/Refresh";

/**
 * DocumentDisplay definition. This component renders draft documents as list of drafts displayed on the homepage.
 * This component is the child of Home.js component and accepts variable as props from Home.js
 */
const DocumentDisplay = ({
  fetchDrafts,
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
  networkError,
  setNetworkError,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  const handleNetworkStatus = () => {
    fetchDrafts();
  };

  return (
    <Box
      sx={{
        margin: {
          xs: "8px", // 8px margin on extra-small screens
          sm: "16px", // 16px margin on small screens
          md: "24px", // 24px margin on medium screens
          lg: "32px", // 32px margin on large screens
          xl: "40px", // 40px margin on extra-large screens
        },
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "70%",
            lg: "70%",
            xl: "70%",
          },
          marginRight: {
            xs: "0px", // 8px horizontal margin on extra-small screens
            sm: "0px", // 16px horizontal margin on small screens
            md: "20px", // 24px horizontal margin on medium screens
            lg: "20px", // 32px horizontal margin on large screens
            xl: "20px", // 40px horizontal margin on extra-large screens
          },
        }}
      >
        <Box width="100%" sx={{ marginBottom: "10px" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "500", color: colors.headerText[100] }}
          >
            {t("draft_documents")}
          </Typography>
        </Box>

        {/* 
  Trigger loading view based on the value of loading variable value. If it is true, the loading... 
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
            <Link to={`/draft/${draft.id}`} style={{ textDecoration: "none" }}>
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
        ) : networkError === "AxiosError" ? (
          // Display error info to the user if there is an exception in an http axios request.
          <Typography variant="body1">
            Your internet connection may be unstable. You can &nbsp;
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={handleNetworkStatus}
            >
              Try again <RefreshIcon />
            </Button>
          </Typography>
        ) : (
          <>
            {/* Render <Loading /> component if drafts value is empty */}
            <Loading />
            <Loading />
            <Loading />
          </>
        )}
      </Box>

      <Box
        sx={{
          width: {
            xs: "0",
            sm: "0",
            md: "30%",
            lg: "30%",
            xl: "30%",
          },

          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
      >
        {/* <Hidden mdDown implementation="css"> */}
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
        {/* </Hidden> */}
      </Box>
    </Box>
  );
};

export default DocumentDisplay;
