import {
  Box,
  Collapse,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
  ListItemButton,
  ListItemText,
  Button,
  Chip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios, { rootURL } from "../../axios/AxiosGlobal";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import SectionFeedbacks from "./partials/SectionFeedbacks";
import SectionNavigationMenu from "./partials/SectionNavigationMenu";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DocumentLevelComments from "./partials/DocumentLevelComments";
import AddDocumentLevelComments from "./partials/AddDocumentLevelComments";
import { FileDownload } from "@mui/icons-material";
import { UserContext } from "../../contexts/UserContext";

/**
 * This component will be executed when user clicks a document list card from 'DocumentList.jsx' component. 
 * That means, from list of public document displayed on the homepage, when the user clicks on of them,
 * the detail infomation of the document will be displayed along with its contents with a full navigation
 */

const DocumentDetailView = () => {
  // Create variable to retrieve data from the page url using useParams() hook
  const params = useParams();

  /**
   * Create documentDetail, documentSections, and documentComments to handle document information
   * and its sections requested from the API and use it for rendering and explore the document
   * section by section.
   */
  const [documentDetail, setDocumentDetail] = useState(null);
  const [documentSections, setDocumentSections] = useState(null);
  const [documentComments, setDocumentComments] = useState(null);

  /**
   * Create variable contentBgColor and use it to highlight the active document section while user is navigating
   * the document sections for reading.
   */
  const [contentBgColor, setContentBgColor] = useState(null);

  // access the logged in user information from the UserContext definition
  const { userInfo, userRole } = useContext(UserContext);

  /**
   * Access the global styling information or theme from theme.js and use it
   * to setup the look and feel of the page and its internal components such as color.
   */
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /**
   * Access translation object
   */
  const { t } = useTranslation();

  // Menu collapse functionality to collapse and release the table of contents use to navigate the document
  const [articlesOpen, setArticlesOpen] = React.useState(true);

  // General comments collapse functionality to collapse and release the general commments component
  const [commentsOpen, setCommentsOpen] = React.useState(true);

  // Handle the collapse functionality in response to user's onChnage event to collapse the table of contents
  const handleArticlesCollapse = () => {
    setArticlesOpen(!articlesOpen);
  };

  // Handle the collapse functionality in rseponse to user's onChnage event to collapse
  // and release the general comments components
  const handleCommentsCollapse = () => {
    setCommentsOpen(!commentsOpen);
  };

  /**
   * Create useEffect hook and call a function that implements
   * an API call to fetch documentDetails, documentSections and documentComments data
   */

  useEffect(() => {
    fetchDocumentDetails();
  }, []);

  useEffect(() => {
    fetchDocumentSections();
  }, []);

  useEffect(() => {
    fetchDocumentComments();
  }, []);

  const fetchDocumentDetails = async () => {
    return await axios
      .get(`drafts/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDocumentDetail(response.data.data);
      });
  };

  const fetchDocumentSections = async () => {
    return await axios
      .get(`draft/${params.id}/draft-sections`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDocumentSections(response.data.data);
      })
      .catch((error) => {
        <p color="red">{error.response.message}</p>;
      });
  };

  const fetchDocumentComments = async () => {
    return await axios
      .get(`draft/${params.id}/general-comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDocumentComments(response.data.data);
      })
      .catch((error) => {
        <p color="red">{error.response.message}</p>;
      });
  };

  return (
    /**
     * Create UI to render the document meta information, document content and comments and replies
     */
    <Box
      sx={{
        backgroundColor: colors.grey[200],
        display: "flex",
        flexDirection: "column",
      }}
    >
      {" "}
      {/**
       * Box to render the document's meta info
       */}
      <Box
        sx={{
          backgroundColor: "#255B7E",
          marginBottom: "30px",
          paddingRight: {
            xs: "10px",
            sm: "10px",
            md: "20px",
            lg: "80px",
            xl: "80px",
          },

          paddingLeft: {
            xs: "10px",
            sm: "10px",
            md: "20px",
            lg: "80px",
            xl: "80px",
          },
          paddingBottom: "40px",
          paddingTop: "40px",
        }}
      >
        {documentDetail ? (
          <Grid container spacing={10}>
            <Grid item xs={8}>
              <Typography
                variant="h3"
                sx={{
                  paddingBottom: "20px",
                  fontWeight: 600,
                  textAlign: "center",
                  color: "white",
                }}
              >
                {documentDetail.short_title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  paddingBottom: "30px",
                  textAlign: "justify",
                  color: "white",
                }}
              >
                {documentDetail.summary}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  paddingBottom: "20px",
                  textAlign: "justify",
                  fontWeight: 500,
                  color: "white",
                }}
              >
                {t("document_details")}
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    <strong>{t("institution")}</strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  sx={{ color: "white" }}
                >
                  {documentDetail.institution
                    ? documentDetail.institution.name
                    : null}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    <strong>{t("law_category")}</strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  sx={{ color: "white" }}
                >
                  {documentDetail.law_category
                    ? documentDetail.law_category.name
                    : null}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    <strong>{t("status")}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  {documentDetail &&
                  documentDetail.draft_status.name === "Pending" ? (
                    <Chip
                      label={`${documentDetail.draft_status.name}`}
                      size="small"
                      sx={{
                        backgroundColor: colors.dangerColor[200],
                        color: colors.grey[300],
                      }}
                    />
                  ) : (
                    ""
                  )}

                  {documentDetail &&
                  documentDetail.draft_status.name === "Requested" ? (
                    <Chip
                      label={documentDetail.draft_status.name}
                      size="small"
                      sx={{
                        backgroundColor: "orange",
                        color: colors.grey[300],
                      }}
                    />
                  ) : (
                    ""
                  )}

                  {documentDetail &&
                  documentDetail.draft_status.name === "Open" &&
                  parseInt(documentDetail.comment_closed) === 0 ? (
                    <Chip
                      label="Open for comment"
                      size="small"
                      sx={{
                        backgroundColor: colors.successColor[100],
                        color: colors.grey[300],
                      }}
                    />
                  ) : (
                    ""
                  )}

                  {documentDetail &&
                  documentDetail.draft_status.name === "Open" &&
                  parseInt(documentDetail.comment_closed) === 1 ? (
                    <Chip
                      label="Closed for comment"
                      size="small"
                      sx={{
                        backgroundColor: colors.grey[600],
                        color: colors.grey[300],
                      }}
                    />
                  ) : (
                    ""
                  )}

                  {documentDetail &&
                  documentDetail.draft_status.name === "Closed" ? (
                    <Chip
                      label="Consultation ended"
                      size="small"
                      sx={{
                        backgroundColor: colors.secondary[100],
                        color: colors.grey[500],
                        marginRight: "5px",
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    <strong>{t("draft_opening_date")}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Chip
                    label={
                      documentDetail.comment_opening_date
                        ? documentDetail.comment_opening_date
                        : "Unavailable"
                    }
                    size="small"
                    sx={{
                      backgroundColor: colors.successColor[200],
                      color: colors.grey[300],
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    <strong>{t("draft_closing_date")}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Chip
                    label={
                      documentDetail.comment_closing_date
                        ? documentDetail.comment_closing_date
                        : "Unavailable"
                    }
                    size="small"
                    sx={{
                      backgroundColor: colors.dangerColor[200],
                      color: colors.grey[300],
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    <strong>{t("base_legal_reference")}</strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  sx={{ color: "white" }}
                >
                  {documentDetail.base_legal_reference
                    ? documentDetail.base_legal_reference
                    : null}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    <strong>{t("legal_definition")}</strong>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  sx={{ color: "white" }}
                >
                  {documentDetail.definition ? documentDetail.definition : null}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Typography variant="h5" sx={{ color: "white" }}>
                    <strong>{t("document_file")}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Button
                    href={documentDetail.file}
                    variant="contained"
                    color="secondary"
                    target="_blank"
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#fff",
                      backgroundColor: "#3dac94",
                      borderRadius: "10px 10px",
                    }}
                  >
                    <Typography variant="body1">
                      <FileDownload fontSize="small" /> {t("download")}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              {documentDetail.draft_status.name === "Closed" ? (
                <Paper
                  elevation={1}
                  sx={{
                    padding: "20px",
                    backgroundColor: "#fff3eb",
                    borderRadius: "0px 30px",
                  }}
                >
                  <Typography variant="h4" sx={{ color: colors.primary[200] }}>
                    <strong>{t("document_insight")}</strong>
                  </Typography>
                  <br />
                  <Stack spacing={1}>
                    <Typography
                      variant="body1"
                      sx={{ color: colors.primary[200] }}
                    >
                      {t("general_comments")}:
                      <strong>
                        {documentComments
                          ? documentComments.length
                          : "Not available"}
                      </strong>
                    </Typography>
                    <Button
                      href={`${rootURL}report/draft/${params.id}`}
                      variant="contained"
                      color="secondary"
                      target="_blank"
                      size="small"
                      sx={{
                        textTransform: "none",
                        color: "#fff",
                        backgroundColor: "#3dac94",
                        borderRadius: "10px 10px",
                      }}
                    >
                      <Typography variant="body1">
                        {t("comment_reports")}
                      </Typography>
                    </Button>
                  </Stack>
                </Paper>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        ) : (
          /* Create Progress Bar to indicate loading sign if the documentDetails variable is empty */
          <CircularProgress color="secondary" />
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: colors.grey[200],
        }}
      >
        {" "}
        {/* Create Box to render document content */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              marginRight: {
                xs: "10px",
                sm: "10px",
                md: "20px",
                lg: "30px",
                xl: "30px",
              },
              marginLeft: {
                xs: "10px",
                sm: "10px",
                md: "20px",
                lg: "30px",
                xl: "30px",
              },
              paddingBottom: "30px",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                paddingTop: "30px",
                // display: "flex",
                justifyContent: "space-between",
                display: {
                  xs: "flex", // Display as flex on extra-small screens
                  sm: "flex", // Display as flex on small screens
                  md: "flex", // Display as flex on medium screens
                  lg: "flex", // Display as flex on large screens
                  xl: "flex", // Display as flex on extra-large screens
                },
                flexDirection: {
                  xs: "column", // Column direction on extra-small screens
                  sm: "column", // Column direction on small screens
                  md: "row", // Row direction on medium screens
                  lg: "row", // Row direction on large screens
                  xl: "row", // Row direction on extra-large screens
                },
              }}
            >
              <Grid item xs={12} md={12}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: colors.primary[100],
                  }}
                >
                  {t("document_content")}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              sx={{
                paddingTop: "30px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                md={3}
                lg={3}
                xl={3}
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "none",
                    lg: "block",
                    xl: "block",
                  },
                }}
              >
                {/* Create a a collapsable list to render the table of contents 
                based on the documents section tile  */}
                <ListItemButton onClick={handleArticlesCollapse}>
                  <ListItemText
                    primary={
                      <Typography variant="h5" fontWeight="600">
                        {t("explore_by_article")}
                      </Typography>
                    }
                  />
                  {articlesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={articlesOpen} timeout="auto" unmountOnExit>
                  {documentSections ? (
                    documentSections.map((section) => (
                      <>
                        <SectionNavigationMenu
                          section={section}
                          setContentBgColor={setContentBgColor}
                          paddingValue={0}
                        />
                        {section.children.length > 0
                          ? section.children.map((child1) => (
                              <>
                                <SectionNavigationMenu
                                  section={child1}
                                  setContentBgColor={setContentBgColor}
                                  paddingValue={4}
                                />
                                {child1.children.length > 0
                                  ? child1.children.map((child11) => (
                                      <>
                                        <SectionNavigationMenu
                                          section={child11}
                                          setContentBgColor={setContentBgColor}
                                          paddingValue={8}
                                        />

                                        {child11.children.length > 0
                                          ? child11.children.map((child111) => (
                                              <>
                                                <SectionNavigationMenu
                                                  section={child111}
                                                  setContentBgColor={
                                                    setContentBgColor
                                                  }
                                                  paddingValue={12}
                                                />
                                                {child111.children.length > 0
                                                  ? child111.children.map(
                                                      (child1111) => (
                                                        <>
                                                          <SectionNavigationMenu
                                                            section={child1111}
                                                            setContentBgColor={
                                                              setContentBgColor
                                                            }
                                                            paddingValue={16}
                                                          />
                                                          {child1111.children
                                                            .length > 0
                                                            ? child1111.children.map(
                                                                (
                                                                  child11111
                                                                ) => (
                                                                  <>
                                                                    <SectionNavigationMenu
                                                                      section={
                                                                        child11111
                                                                      }
                                                                      setContentBgColor={
                                                                        setContentBgColor
                                                                      }
                                                                      paddingValue={
                                                                        18
                                                                      }
                                                                    />
                                                                  </>
                                                                )
                                                              )
                                                            : ""}
                                                        </>
                                                      )
                                                    )
                                                  : ""}
                                              </>
                                            ))
                                          : ""}
                                      </>
                                    ))
                                  : ""}
                              </>
                            ))
                          : ""}
                      </>
                    ))
                  ) : (
                    <Box></Box>
                  )}
                </Collapse>
                {/* </ul> */}
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={6} xl={6}>
                {documentSections ? (
                  documentSections.map((section) => (
                    <Card
                      elevation={1}
                      sx={{ marginBottom: "20px" }}
                      key={section.id}
                    >
                      <CardContent>
                        <Box
                          id={section.id}
                          sx={{
                            padding: "5px",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 600,
                              textAlign: "center",
                              marginBottom: "30px",
                            }}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: section.section_title,
                              }}
                            ></span>
                            {/* {section.section_title} */}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: "justify", lineSpacing: "45px" }}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html: section.section_body,
                              }}
                            ></span>
                            {/* {section.section_body} */}
                          </Typography>

                          {userRole === "Commenter" && (
                            <SectionFeedbacks
                              documentDetail={documentDetail}
                              comments={section.comments}
                              section={section}
                              fetchDocumentDetails={fetchDocumentDetails}
                              fetchDocumentSections={fetchDocumentSections}
                              fetchDocumentComments={fetchDocumentComments}
                            />
                          )}
                        </Box>
                        {/* 
                          Check if the document section has also a sub child section and render / display it, if it has 
                        */}
                        {section.children.length > 0
                          ? section.children.map((sectionChild1) => (
                              <>
                                <Box
                                  id={sectionChild1.id}
                                  sx={{
                                    padding: "5px",
                                  }}
                                >
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      fontWeight: 600,
                                      textAlign: "center",
                                    }}
                                  >
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: sectionChild1.section_title,
                                      }}
                                    ></span>
                                    {/* {sectionChild1.section_title} */}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      textAlign: "justify",
                                      lineSpacing: "45px",
                                      marginBottom: "30px",
                                    }}
                                  >
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: sectionChild1.section_body,
                                      }}
                                    ></span>
                                    {/* {sectionChild1.section_body} */}
                                  </Typography>

                                  {userRole === "Commenter" && (
                                    <SectionFeedbacks
                                      documentDetail={documentDetail}
                                      comments={sectionChild1.comments}
                                      section={sectionChild1}
                                      fetchDocumentDetails={
                                        fetchDocumentDetails
                                      }
                                      fetchDocumentSections={
                                        fetchDocumentSections
                                      }
                                      fetchDocumentComments={
                                        fetchDocumentComments
                                      }
                                    />
                                  )}
                                </Box>
                                {sectionChild1.children.length > 0
                                  ? sectionChild1.children.map(
                                      (sectionChild1Sub1) => (
                                        <>
                                          <Box
                                            id={sectionChild1Sub1.id}
                                            sx={{ padding: "5px" }}
                                          >
                                            <Typography
                                              variant="h4"
                                              sx={{
                                                fontWeight: 600,
                                                textAlign: "center",
                                              }}
                                            >
                                              <span
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    sectionChild1Sub1.section_title,
                                                }}
                                              />

                                              {/* {sectionChild1Sub1.section_title} */}
                                            </Typography>
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                textAlign: "justify",
                                                lineSpacing: "45px",
                                                marginBottom: "30px",
                                              }}
                                            >
                                              <span
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    sectionChild1Sub1.section_body,
                                                }}
                                              />
                                              {/* {sectionChild1Sub1.section_body} */}
                                            </Typography>
                                            {userRole === "Commenter" && (
                                              <SectionFeedbacks
                                                documentDetail={documentDetail}
                                                comments={
                                                  sectionChild1Sub1.comments
                                                }
                                                section={sectionChild1Sub1}
                                                fetchDocumentDetails={
                                                  fetchDocumentDetails
                                                }
                                                fetchDocumentSections={
                                                  fetchDocumentSections
                                                }
                                                fetchDocumentComments={
                                                  fetchDocumentComments
                                                }
                                              />
                                            )}
                                          </Box>
                                          {sectionChild1Sub1.children.length > 0
                                            ? sectionChild1Sub1.children.map(
                                                (sectionChild1Sub1Sub1) => (
                                                  <>
                                                    <Box
                                                      id={
                                                        sectionChild1Sub1Sub1.id
                                                      }
                                                      sx={{ padding: "5px" }}
                                                    >
                                                      <Typography
                                                        variant="h4"
                                                        sx={{
                                                          fontWeight: 600,
                                                          textAlign: "center",
                                                        }}
                                                      >
                                                        <span
                                                          dangerouslySetInnerHTML={{
                                                            __html:
                                                              sectionChild1Sub1Sub1.section_title,
                                                          }}
                                                        />
                                                        {
                                                          // sectionChild1Sub1Sub1.section_title
                                                        }
                                                      </Typography>
                                                      <Typography
                                                        variant="body1"
                                                        sx={{
                                                          textAlign: "justify",
                                                          lineSpacing: "45px",
                                                          marginBottom: "30px",
                                                        }}
                                                      >
                                                        <span
                                                          dangerouslySetInnerHTML={{
                                                            __html:
                                                              sectionChild1Sub1Sub1.section_body,
                                                          }}
                                                        />
                                                        {
                                                          // sectionChild1Sub1Sub1.section_body
                                                        }
                                                      </Typography>
                                                      {userRole ===
                                                        "Commenter" && (
                                                        <SectionFeedbacks
                                                          documentDetail={
                                                            documentDetail
                                                          }
                                                          comments={
                                                            sectionChild1Sub1Sub1.comments
                                                          }
                                                          section={
                                                            sectionChild1Sub1Sub1
                                                          }
                                                          fetchDocumentDetails={
                                                            fetchDocumentDetails
                                                          }
                                                          fetchDocumentSections={
                                                            fetchDocumentSections
                                                          }
                                                          fetchDocumentComments={
                                                            fetchDocumentComments
                                                          }
                                                        />
                                                      )}
                                                    </Box>
                                                    {sectionChild1Sub1Sub1
                                                      .children.length > 0
                                                      ? sectionChild1Sub1Sub1.children.map(
                                                          (
                                                            sectionChild1Sub1Sub1Sub1
                                                          ) => (
                                                            <>
                                                              <Box
                                                                id={
                                                                  sectionChild1Sub1Sub1Sub1.id
                                                                }
                                                                sx={{
                                                                  padding:
                                                                    "5px",
                                                                }}
                                                              >
                                                                <Typography
                                                                  variant="h4"
                                                                  sx={{
                                                                    fontWeight: 600,
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  <span
                                                                    dangerouslySetInnerHTML={{
                                                                      __html:
                                                                        sectionChild1Sub1Sub1Sub1.section_title,
                                                                    }}
                                                                  />
                                                                  {
                                                                    // sectionChild1Sub1Sub1Sub1.section_title
                                                                  }
                                                                </Typography>
                                                                <Typography
                                                                  variant="body1"
                                                                  sx={{
                                                                    textAlign:
                                                                      "justify",
                                                                    lineSpacing:
                                                                      "45px",
                                                                    marginBottom:
                                                                      "30px",
                                                                  }}
                                                                >
                                                                  <span
                                                                    dangerouslySetInnerHTML={{
                                                                      __html:
                                                                        sectionChild1Sub1Sub1Sub1.section_body,
                                                                    }}
                                                                  />
                                                                  {
                                                                    // sectionChild1Sub1Sub1Sub1.section_body
                                                                  }
                                                                </Typography>

                                                                {userRole ===
                                                                  "Commenter" && (
                                                                  <SectionFeedbacks
                                                                    documentDetail={
                                                                      documentDetail
                                                                    }
                                                                    comments={
                                                                      sectionChild1Sub1Sub1Sub1.comments
                                                                    }
                                                                    section={
                                                                      sectionChild1Sub1Sub1Sub1
                                                                    }
                                                                    fetchDocumentDetails={
                                                                      fetchDocumentDetails
                                                                    }
                                                                    fetchDocumentSections={
                                                                      fetchDocumentSections
                                                                    }
                                                                    fetchDocumentComments={
                                                                      fetchDocumentComments
                                                                    }
                                                                  />
                                                                )}
                                                              </Box>
                                                              {sectionChild1Sub1Sub1Sub1
                                                                .children
                                                                .length > 0
                                                                ? sectionChild1Sub1Sub1Sub1.children.map(
                                                                    (
                                                                      sectionChild1Sub1Sub1Sub1Sub1
                                                                    ) => (
                                                                      <>
                                                                        <Box
                                                                          id={
                                                                            sectionChild1Sub1Sub1Sub1Sub1.id
                                                                          }
                                                                          sx={{
                                                                            padding:
                                                                              "5px",
                                                                          }}
                                                                        >
                                                                          <Typography
                                                                            variant="h4"
                                                                            sx={{
                                                                              fontWeight: 600,
                                                                              textAlign:
                                                                                "center",
                                                                            }}
                                                                          >
                                                                            <span
                                                                              dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                  sectionChild1Sub1Sub1Sub1Sub1.section_title,
                                                                              }}
                                                                            />
                                                                            {
                                                                              // sectionChild1Sub1Sub1Sub1Sub1.section_title
                                                                            }
                                                                          </Typography>
                                                                          <Typography
                                                                            variant="body1"
                                                                            sx={{
                                                                              textAlign:
                                                                                "justify",
                                                                              lineSpacing:
                                                                                "45px",
                                                                              marginBottom:
                                                                                "30px",
                                                                            }}
                                                                          >
                                                                            <span
                                                                              dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                  sectionChild1Sub1Sub1Sub1Sub1.section_body,
                                                                              }}
                                                                            />
                                                                            {
                                                                              // sectionChild1Sub1Sub1Sub1Sub1.section_body
                                                                            }
                                                                          </Typography>
                                                                          {userRole ===
                                                                            "Commenter" && (
                                                                            <SectionFeedbacks
                                                                              documentDetail={
                                                                                documentDetail
                                                                              }
                                                                              comments={
                                                                                sectionChild1Sub1Sub1Sub1Sub1.comments
                                                                              }
                                                                              section={
                                                                                sectionChild1Sub1Sub1Sub1Sub1
                                                                              }
                                                                              fetchDocumentDetails={
                                                                                fetchDocumentDetails
                                                                              }
                                                                              fetchDocumentSections={
                                                                                fetchDocumentSections
                                                                              }
                                                                              fetchDocumentComments={
                                                                                fetchDocumentComments
                                                                              }
                                                                            />
                                                                          )}
                                                                        </Box>
                                                                      </>
                                                                    )
                                                                  )
                                                                : ""}
                                                            </>
                                                          )
                                                        )
                                                      : ""}
                                                  </>
                                                )
                                              )
                                            : ""}
                                        </>
                                      )
                                    )
                                  : ""}
                              </>
                            ))
                          : ""}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Box></Box>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={5}
                lg={3}
                xl={3}
                sx={{
                  display: {
                    xs: "block",
                    sm: "block",
                    md: "block",
                    lg: "block",
                    xl: "block",
                  }
                }}
              >
                {userRole && (
                  <ListItemButton onClick={handleCommentsCollapse}>
                    <ListItemText
                      primary={
                        userRole === "Commenter" &&
                        documentDetail &&
                        documentDetail.draft_status.name === "Open" ? (
                          <>
                            <Typography variant="h5" fontWeight="600">
                              {t("general_comments")} (
                              {documentComments &&
                                userInfo &&
                                documentComments.filter((comment) => {
                                  return (
                                    parseInt(
                                      comment.commenter
                                        ? comment.commenter.id
                                        : ""
                                    ) === parseInt(userInfo.user.id)
                                  );
                                }).length}
                              )
                            </Typography>
                          </>
                        ) : (
                          ""
                        )
                      }
                    />
                    {commentsOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                )}
                <Collapse in={commentsOpen} timeout="auto" unmountOnExit>
                  <Paper
                    elevation={1}
                    sx={{
                      borderRadius: "3px",
                      borderLeftStyle: "solid",
                      borderLeftWidth: "3px",
                      borderLeftColor: "#255B7E",
                    }}
                  >
                    {documentComments ? (
                      userInfo &&
                      documentComments
                        .filter((comment) => {
                          return (
                            parseInt(
                              comment.commenter ? comment.commenter.id : ""
                            ) === parseInt(userInfo.user.id)
                          );
                        })
                        .map((comment) => (
                          /* Render the generel comments component if there is documentComments has value */
                          <DocumentLevelComments
                            comment={comment}
                            fetchDocumentDetails={fetchDocumentDetails}
                            fetchDocumentSections={fetchDocumentSections}
                            fetchDocumentComments={fetchDocumentComments}
                          />
                        ))
                    ) : (
                      /* Otherwise, display 'No comments' message */
                      <Box>No comments</Box>
                    )}
                    {/* 
                      Render AddDocumentLevelComment component and allow user to provide comment 
                      if his user role is 'commenter, and documentDetail value is not empty 
                      and draft status name is 'Open' 
                    */}
                    {userRole === "Commenter" &&
                    documentDetail &&
                    documentDetail.draft_status.name === "Open" &&
                    parseInt(documentDetail.comment_closed) === 0 ? (
                      <AddDocumentLevelComments
                        documentID={
                          documentDetail ? documentDetail.id : params.id
                        }
                        fetchDocumentDetails={fetchDocumentDetails}
                        fetchDocumentSections={fetchDocumentSections}
                        fetchDocumentComments={fetchDocumentComments}
                      />
                    ) : (
                      ""
                    )}
                  </Paper>
                </Collapse>
              </Grid>
            </Grid>
          </Box>
        </motion.span>
      </Box>
    </Box>
  );
};

export default DocumentDetailView;