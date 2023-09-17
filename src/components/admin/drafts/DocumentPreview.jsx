import {
  Box,
  Collapse,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useTheme,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios, {rootURL} from "../../../axios/AxiosGlobal"
import { tokens } from "../../../theme";

import { motion } from "framer-motion";
import SectionNavigationMenu from "../../guest/partials/SectionNavigationMenu";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DocumentLevelComments from "../../guest/partials/DocumentLevelComments";
import AddDocumentLevelComments from "../../guest/partials/AddDocumentLevelComments";

import { FileDownload } from "@mui/icons-material";
import { UserContext } from "../../../contexts/UserContext";
import SectionFeedbackPreview from "../previews/SectionFeedbackPreview";

const DocumentPreview = () => {
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

  // Show commenting box and comments on mouse enter
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [sectionID, setSectionID] = useState(0);

  // access the logged in user information from the UserContext definition
  const { userInfo, userRole } = useContext(UserContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
   * Create useEffect hook and call a function the implements 
   * an API call to fetch documentDetails, documentSections and documentComments data
   */

  useEffect(() => {
    fetchDocumentDetails();
  }, [documentDetail, documentSections, documentComments]);

  useEffect(() => {
    fetchDocumentSections();
  }, [documentDetail, documentSections, documentComments]);

  useEffect(() => {
    fetchDocumentComments();
  }, [documentDetail, documentSections, documentComments]);

  const fetchDocumentDetails = async () => {
    return await axios.get(`drafts/${params.id}`,
    {headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json;",
      "Content-Type": "multipart/form-data"
    }}).then((response) => {
      setDocumentDetail(response.data.data);
    });
  };

  const fetchDocumentSections = async () => {
    return await axios
      .get(`draft/${params.id}/draft-sections`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((response) => {
        setDocumentSections(response.data.data);
      })
      .catch((error) => {
        <p color="red">{error.response.message}</p>;
      });
  };

  const fetchDocumentComments = async () => {
    return await axios
      .get(`draft/${params.id}/general-comments`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
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
    <Box sx={{ backgroundColor: colors.grey[200] }}> {/* Box to to render the documents meta info */}
      
      <Box sx={{ backgroundColor: colors.grey[200] }}> {/* Create Box to render document content */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              marginRight: "30px",
              marginLeft: "30px",
              paddingBottom: "30px",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                paddingTop: "30px",
                display: "flex",
                justifyContent: "space-between",
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
                        marginLeft:"15px"
                      }}
                    >
                      <Typography variant="body1">
                        {t("comment_reports")}
                      </Typography>
                    </Button>

                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{
                paddingTop: "30px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs={8}>
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
                            padding: "20px",
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
                            {section.section_title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ textAlign: "justify", lineSpacing: "45px" }}
                          >
                            {section.section_body}
                          </Typography>
                           
                            <SectionFeedbackPreview
                              documentDetail={documentDetail}
                              comments={section.comments}
                              section={section}
                            />
                          
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
                                    padding: "20px",
                                  }} 
                                >
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      fontWeight: 600,
                                      textAlign: "center",
                                    }}
                                  >
                                    {sectionChild1.section_title}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      textAlign: "justify",
                                      lineSpacing: "45px",
                                      marginBottom: "30px",
                                    }}
                                  >
                                    {sectionChild1.section_body}
                                  </Typography>

                                   
                                      <SectionFeedbackPreview
                                        documentDetail={documentDetail}
                                        comments={sectionChild1.comments}
                                        section={sectionChild1}
                                      />
                                    
                                
                                </Box>
                                {sectionChild1.children.length > 0
                                  ? sectionChild1.children.map(
                                      (sectionChild1Sub1) => (
                                        <>
                                          <Box
                                            id={sectionChild1Sub1.id}
                                            sx={{ padding: "20px" }}
                                          >
                                            <Typography
                                              variant="h4"
                                              sx={{
                                                fontWeight: 600,
                                                textAlign: "center",
                                              }}
                                            >
                                              {sectionChild1Sub1.section_title}
                                            </Typography>
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                textAlign: "justify",
                                                lineSpacing: "45px",
                                                marginBottom: "30px",
                                              }}
                                            >
                                              {sectionChild1Sub1.section_body}
                                            </Typography>
                                             
                                              <SectionFeedbackPreview
                                                documentDetail={documentDetail}
                                                comments={
                                                  sectionChild1Sub1.comments
                                                }
                                                section={sectionChild1Sub1}
                                              />
                                            
                                          </Box>
                                          {sectionChild1Sub1.children.length > 0
                                            ? sectionChild1Sub1.children.map(
                                                (sectionChild1Sub1Sub1) => (
                                                  <>
                                                    <Box
                                                      id={
                                                        sectionChild1Sub1Sub1.id
                                                      }
                                                      sx={{ padding: "20px" }}
                                                    >
                                                      <Typography
                                                        variant="h4"
                                                        sx={{
                                                          fontWeight: 600,
                                                          textAlign: "center",
                                                        }}
                                                      >
                                                        {
                                                          sectionChild1Sub1Sub1.section_title
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
                                                        {
                                                          sectionChild1Sub1Sub1.section_body
                                                        }
                                                      </Typography>
                                                       
                                                        <SectionFeedbackPreview
                                                          documentDetail={
                                                            documentDetail
                                                          }
                                                          comments={
                                                            sectionChild1Sub1Sub1.comments
                                                          }
                                                          section={
                                                            sectionChild1Sub1Sub1
                                                          }
                                                        />
                                                      
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
                                                                    "20px",
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
                                                                  {
                                                                    sectionChild1Sub1Sub1Sub1.section_title
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
                                                                  {
                                                                    sectionChild1Sub1Sub1Sub1.section_body
                                                                  }
                                                                </Typography>
                                                                 
                                                                  <SectionFeedbackPreview
                                                                    documentDetail={
                                                                      documentDetail
                                                                    }
                                                                    comments={
                                                                      sectionChild1Sub1Sub1Sub1.comments
                                                                    }
                                                                    section={
                                                                      sectionChild1Sub1Sub1Sub1
                                                                    }
                                                                  />
                                                                
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
                                                                              "20px",
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
                                                                            {
                                                                              sectionChild1Sub1Sub1Sub1Sub1.section_title
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
                                                                            {
                                                                              sectionChild1Sub1Sub1Sub1Sub1.section_body
                                                                            }
                                                                          </Typography>
                                                                           
                                                                            <SectionFeedbackPreview
                                                                              documentDetail={
                                                                                documentDetail
                                                                              }
                                                                              comments={
                                                                                sectionChild1Sub1Sub1Sub1Sub1.comments
                                                                              }
                                                                              section={
                                                                                sectionChild1Sub1Sub1Sub1Sub1
                                                                              }
                                                                            />
                                                                          
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
                  <Box>
                    <CircularProgress color="secondary" />
                  </Box>
                )}
              </Grid>
              <Grid item xs={4}>
                <ListItemButton onClick={handleCommentsCollapse}>
                  <ListItemText
                    primary={
                      documentDetail ? (
                        <>
                          <Typography variant="h5" fontWeight="600">
                            {t("general_comments")} (
                            {documentComments &&
                              userInfo &&
                              documentComments.length}
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
                        .map((comment) => (
                          /* Render the generel comments component if there is documentComments has value */
                          <DocumentLevelComments comment={comment} />
                        ))
                    ) : (
                      /* Otherwise, display 'No comments' message */
                      <Box>No comments</Box>
                    )}
                    {/* 
                      Render AddDocumentLevelComment component and allow user to provide comment 
                      if he his user role is 'commenter, and documentDetail value is not emprty 
                      and draft status name is 'Open' 
                    */}
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

export default DocumentPreview