import {
  Box,
  Grid,
  InputBase,
  Pagination,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import {tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Footer from "../../partials/Footer";
import DocumentDisplay from "./partials/DocumentDisplay";
import axios from "../../axios/AxiosGlobal";
import { useEffect, useState } from "react";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  // Retrieve document data
  const [drafts, setDrafts] = useState(null);
  const [unfilteredDrafts, setUnfilteredDrafts] = useState(null);
  const [loading, setLoading] = useState(false);

  // searchbox name
  const [search, setSearch] = useState("");

  // Make pagination
  const [pageCount, setPageCount] = useState(0);

  const handlePageChange = async (e, page) => {
    return await axios
      .get(`drafts?page=${page}`)
      .then((res) => {
        setDrafts(res.data.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [totalDrafts, setTotalDrafts] = useState(0);

  const fetchDrafts = async () => {
    return await axios
      .get(`drafts`)
      .then((res) => {
        setDrafts(res.data.data.data);
        setUnfilteredDrafts(res.data.data.data);
        setTotalDrafts(res.data.data.total);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  useEffect(() => {
    setPageCount(Math.ceil(parseInt(totalDrafts) / 10));
  }, []);

  const searchDocs = async (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue) {
      await axios
        .get(`drafts?short_title=${searchValue}`)
        .then((response) => {
          setDrafts(response.data.data.data);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  return (
    <Box sx={{ backgroundColor: colors.grey[200] }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            marginBottom: "30px",
            marginRight: "30px",
            marginLeft: "30px",
            paddingBottom: "30px",
          }}
        >
          <Grid
            container
            sx={{
              paddingTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid>
              <Typography variant="h4" sx={{ fontWeight: "600" }}>
                {t("fdre")}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "500" }}>
                {t("e_consultation_portal")}
              </Typography>
            </Grid>
            <Grid
              container
              sx={{
                paddingTop: "30px",
                margin: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs={3}></Grid>
              <Grid item xs={6}>
                <Paper
                  elevation={1}
                  sx={{
                    backgroundColor: colors.grey[100],
                    borderRadius: "5px",
                    display: "flex",
                    padding: "3px",
                    opacity: "90%",
                  }}
                >
                  <InputBase
                    variant="outlined"
                    placeholder={`${t("search_documents")}...`}
                    fullWidth
                    sx={{ padding: "5px", fontSize: "18px", fontWeight: 500 }}
                    name="searchValue"
                    value={search}
                    onChange={searchDocs}
                  />
                  <SearchIcon
                    sx={{
                      textAlign: "center",
                      padding: "8px",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      color: colors.grey[700],
                    }}
                  ></SearchIcon>
                </Paper>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ marginTop: "50px" }}>
          <DocumentDisplay
            drafts={drafts}
            setDrafts={setDrafts}
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

        <Box>
          <Pagination
            count={pageCount}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              padding: "0px",
            }}
          />
        </Box>

        <Box>
          <Footer />
        </Box>
      </motion.span>
    </Box>
  );
};

export default Home;
