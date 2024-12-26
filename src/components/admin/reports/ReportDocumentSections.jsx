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
import axios, { rootURL } from "../../../axios/AxiosGlobal";
import { tokens } from "../../../theme";

import { motion } from "framer-motion";

import { UserContext } from "../../../contexts/UserContext";

import ReportSectionComments from "./ReportSectionComments";

/**
 * This component is used to render the contents of the draft document as a readable document tree.
 * The component is available to Uploader and Approver user roles so that they can use it to preview
 * the document and make important decesion such as "Accept" or "Reject" the document opening
 * @returns
 */
const ReportDocumentSections = () => {
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

  // access the logged in user information from the UserContext definition
  const { userInfo } = useContext(UserContext);

  /**
   * Access the app theme and color mode definitions using the useThem() hook
   */
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /**
   * Destructure the translation object from the i18next internationalization using the
   * useTranslation() hook
   */
  const { t } = useTranslation();

  // General comments collapse functionality to collapse and release the general commments component
  const [commentsOpen, setCommentsOpen] = React.useState(true);

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
    <Box>
      {" "}
      {/* Create Box to render document content */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
          >
              
        <Box
         
        >
       
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
                          <span
                            dangerouslySetInnerHTML={{
                              __html: section.section_title,
                            }}
                          />
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
                          />
                          {/* {section.section_body} */}
                        </Typography>

                        {section.section_body.length > 0 && (
                          <ReportSectionComments
                            documentDetail={documentDetail}
                            comments={section.comments}
                            section={section}
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
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: sectionChild1.section_title,
                                    }}
                                  />
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
                                  />
                                  {/* {sectionChild1.section_body} */}
                                </Typography>

                                {sectionChild1.section_body.length > 0 && (
                                  <ReportSectionComments
                                    documentDetail={documentDetail}
                                    comments={sectionChild1.comments}
                                    section={sectionChild1}
                                  />
                                )}
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

                                          {sectionChild1Sub1.section_body
                                            .length > 0 && (
                                            <ReportSectionComments
                                              documentDetail={documentDetail}
                                              comments={
                                                sectionChild1Sub1.comments
                                              }
                                              section={sectionChild1Sub1}
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
                                                    sx={{ padding: "20px" }}
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

                                                    {sectionChild1Sub1Sub1
                                                      .section_body.length >
                                                      0 && (
                                                      <ReportSectionComments
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
                                                                padding: "20px",
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

                                                              {sectionChild1Sub1Sub1Sub1
                                                                .section_body
                                                                .length > 0 && (
                                                                <ReportSectionComments
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
                                                              )}
                                                            </Box>
                                                            {sectionChild1Sub1Sub1Sub1
                                                              .children.length >
                                                            0
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

                                                                        {sectionChild1Sub1Sub1Sub1Sub1
                                                                          .section_body
                                                                          .length >
                                                                          0 && (
                                                                          <ReportSectionComments
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
                <Box>
                  <CircularProgress color="secondary" />
                </Box>
              )}
        </Box>
      </motion.span>
    </Box>
  );
};

export default ReportDocumentSections;
