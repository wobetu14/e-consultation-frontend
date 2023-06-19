import { useTheme } from "@emotion/react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Loading from "../../../Loading";
import { tokens } from "../../../theme";
import DocumentsFilters from "../DocumentsFilters";
import DocumentList from "./DocumentList";

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
      <Box sx={{ width: "70%", marginRight: "20px" }}>
        <Box width="100%" sx={{ marginBottom: "10px" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "500", color: colors.headerText[100] }}
          >
            {t("draft_documents")}
          </Typography>
        </Box>

        {loading && (
          <CircularProgress color="info" sx={{ marginBottom: "10px" }} />
        )}

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
        ) : (
          <>
            <Loading />
            <Loading />
            <Loading />
          </>
        )}

      </Box>
      <Box sx={{ width: "30%" }}>
        <Box width="100%" sx={{ marginBottom: "10px" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "500", color: colors.headerText[100] }}
          >
            {t("filter_documents")}
          </Typography>
        </Box>
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
      </Box>
    </Box>
  );
};

export default DocumentDisplay;