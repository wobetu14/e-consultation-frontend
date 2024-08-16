import {
  Box,
  Grid,
  InputBase,
  Pagination,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Footer from "../../partials/Footer";
import DocumentDisplay from "./partials/DocumentDisplay";
import axios from "../../axios/AxiosGlobal";
import { useEffect, useState } from "react";

// Define home component
const Home = () => {
  /**
   * Access global colors and theme information from theme.js file
   */
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  /**
   * Access language translation variable from i18next react internationalization package
   * Destructure the {t} object variable from useTranslation() hook
   */
  const { t } = useTranslation();

  // Define variable for retrieving and setting document data
  const [drafts, setDrafts] = useState(null);

  // Define variables for filtering drafts data
  const [unfilteredDrafts, setUnfilteredDrafts] = useState(null);

  // Define variable for setting 'loading' state while app is in progress requesting API data
  const [loading, setLoading] = useState(false);

  // Define variable for setting search results when a user input items
  // in the 'Search documents...' TextField to search draft documents
  const [search, setSearch] = useState("");

  // Setup pagination for fetched drafts data
  const [pageCount, setPageCount] = useState(0);

  const [networkError, setNetworkError] = useState(null);

  // Method for managing page to page navigation for drafts pagination
  const handlePageChange = async (e, page) => {
    return await axios
      .get(`drafts?page=${page}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setDrafts(res.data.data.data);
      })
      .catch((error) => {});
  };

  // Define variables to count total number of drafts which is used to setup pagination
  const [totalDrafts, setTotalDrafts] = useState(0);

  /**
   * Fetch drafts data from the API. Here the partial API endpoint is 'drafts'.
   * The baseURL for all API endpoints is defined under AxiosGlobal.js file. So,
   * when we say axios.get('endpoint'), the axios refers to the custom axios definitions under
   * AxiosGlobal.js file. Note that we have used Axios package; the most popular http client
   * to communicate with APi data and the custom definition is available at AxiosGlobal.js file
   */
  const fetchDrafts = async () => {
    setNetworkError(null);
    return await axios
      .get(`drafts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setDrafts(res.data.data.data);
        setUnfilteredDrafts(res.data.data.data);
        setTotalDrafts(res.data.data.total);
        setNetworkError(null);
      })
      .catch((error) => {
        setNetworkError(error.name);
      });
  };

  /**
   * Call to the fetchDrafts() function defintion on useEffect hook to enable the app
   * start requesting API on page loading event.
   * The useEffect hook is the most important hook in react and used to trigger code execution
   * on page launch
   */
  useEffect(() => {
    fetchDrafts();
  }, []);

  // Count number of pages dynamically created for the fetched draft data
  useEffect(() => {
    setPageCount(Math.ceil(parseInt(totalDrafts) / 10));
  }, []);

  /**
   * Implementation for searchin drafts docs using the 'searchBox' Textfield.
   * Searching request is triggered on the onChange event of the TextField so that
   * We can perform live search for the draft docs
   */
  const searchDocs = async (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    setSearch(searchValue);
    if (searchValue) {
      await axios
        .get(`drafts?short_title=${searchValue}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setDrafts(response.data.data.data);
        })
        .catch((e) => {});
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
            {/* 
              Define app header text or logo and app description.
              We have used translation feature to render the text on the webpage. 
              We used {t} object from i18next internatiinalization feature. 
              The translation library is defined for each language on public/locales directory where 
              each language dictionary is defined for using separate translation JSON file.
              The translation can be accessed using {t('key')}. 
              For example {t('fdre)} will be translated into 'Federal Democratic Republic of Ethiopia' in English 
              or "የኢትዮጵያ ፊዴራላዊ ዴሞክራሲያዊ ሪፐብሊክ መንግስት" in Amharic. 
             */}
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
              <Grid item xs={0} sm={0} md={0} lg={3} xl={3}></Grid>
              <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
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
                  {/* Define TextField for 'Search documents' implemenation */}
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
              <Grid item xs={0} sm={0} md={0} lg={3} xl={3}></Grid>
            </Grid>
          </Grid>
        </Box>

        {/* 
        Pass the fetched draft data into the next child component as props for easily rendering. 
      */}
        <Box sx={{ marginTop: "50px" }}>
          {/*
            The drafts, setDrafts, unfilteredDrafts, setUnfilteredDrafts and 
            other data into the next child component 'DocumentDisplay' for a better code management and data rendering  
          */}
          <DocumentDisplay
            fetchDrafts={fetchDrafts}
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
            networkError={networkError}
            setNetworkError={setNetworkError}
          />
        </Box>

        <Box>
          {/* Pagination UI component from Material UI library */}
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
          <Footer /> {/* Render the App footer component */}
        </Box>
      </motion.span>
    </Box>
  );
};

export default Home;
