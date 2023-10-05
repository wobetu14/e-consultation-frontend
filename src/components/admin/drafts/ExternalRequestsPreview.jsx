import {
  Box,
  Collapse,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  useTheme,
  ListItemButton,
  ListItemText,
  Button,
  Chip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axios/AxiosGlobal";
import { tokens } from "../../../theme";
import { motion } from "framer-motion";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SectionNavigationMenu from "../../guest/partials/SectionNavigationMenu";
import { UserContext } from "../../../contexts/UserContext";

const ExternalRequestsPreview = () => {
  const params = useParams();
  const [documentDetail, setDocumentDetail] = useState(null);
  const [documentSections, setDocumentSections] = useState(null);
  const [documentComments, setDocumentComments] = useState(null);

  const { userInfo } = useContext(UserContext);

  const [contentBgColor, setContentBgColor] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Menu collapse functionality
  const [articlesOpen, setArticlesOpen] = React.useState(true);

  const handleArticlesCollapse = () => {
    setArticlesOpen(!articlesOpen);
  };

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
    return await axios.get(`drafts/${params.id}`, 
    {headers:{
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json;",
      "Content-Type": "multipart/form-data"
    }}).then((response) => {
      console.log(response.data.data);
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
    <Box>
      <>
        <Typography variant="h3">
          Docs Inst ID: {documentDetail ? documentDetail.institution.id : null}
        </Typography>
        <Typography variant="h3">
          User's Inst ID: {userInfo.user.institution_id}
        </Typography>
      </>
      <Box>
        <Typography
          variant="h3"
          sx={{
            paddingBottom: "20px",
            fontWeight: 600,
            textAlign: "center",
            color: colors.primary[200],
          }}
        >
          {documentDetail ? documentDetail.short_title : null}
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="end"
        sx={{ marginRight: "20px" }}
      >
        {/* Actions on the document */}
        {documentDetail && documentDetail.draft_status.name === "Pending" ? (
          <Chip
            label={`Status: ${documentDetail.draft_status.name}`}
            size="small"
            sx={{
              backgroundColor: colors.dangerColor[200],
              color: colors.grey[300],
            }}
          />
        ) : (
          ""
        )}

        {documentDetail && documentDetail.draft_status.name === "Requested" ? (
          <Chip
            label={`Status: ${documentDetail.draft_status.name}`}
            size="small"
            sx={{ backgroundColor: "orange", color: colors.grey[300] }}
          />
        ) : (
          ""
        )}

        {documentDetail &&
        documentDetail.institution.id === userInfo.user.institution_id ? (
          (documentDetail && documentDetail.draft_status.name === "Pending") ||
          (documentDetail &&
            documentDetail.draft_status.name === "Rejected") ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Send Request
              </Button>
            </>
          ) : (
            ""
          )
        ) : documentDetail &&
          documentDetail.draft_status.name === "Requested" ? (
          <>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              color="warning"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Reject
            </Button>
          </>
        ) : (
          ""
        )}
      </Stack>
      <Box>
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
                  External Request for comment: Preview Document
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
              <Grid item xs={3}>
                {/* <Typography variant="h4">Articles</Typography> */}

                <ListItemButton onClick={handleArticlesCollapse}>
                  <ListItemText
                    primary={
                      <Typography variant="h5" fontWeight="600">
                        Explore by article
                      </Typography>
                    }
                  />
                  {articlesOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={articlesOpen} timeout="auto" unmountOnExit>
                  {documentSections ? (
                    documentSections.map((section) => (
                      <SectionNavigationMenu
                        section={section}
                        setContentBgColor={setContentBgColor}
                      />
                    ))
                  ) : (
                    <Box>Content unavailable</Box>
                  )}
                </Collapse>
                {/* </ul> */}
              </Grid>
              <Grid item xs={7}>
                {documentSections ? (
                  documentSections.map((section) => (
                    <Card
                      elevation={1}
                      sx={{ marginBottom: "20px", padding: "20px" }}
                      key={section.id}
                      id={section.id}
                    >
                      <CardContent>
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

                        {section.children.length > 0
                          ? section.children.map((sectionChild1) => (
                              <>
                                <Typography
                                  variant="h4"
                                  sx={{ fontWeight: 600, textAlign: "center" }}
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
                                {sectionChild1.children.length > 0
                                  ? sectionChild1.children.map(
                                      (sectionChild1Sub1) => (
                                        <>
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

                                          {sectionChild1Sub1.children.length > 0
                                            ? sectionChild1Sub1.children.map(
                                                (sectionChild1Sub1Sub1) => (
                                                  <>
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

                                                    {sectionChild1Sub1Sub1
                                                      .children.length > 0
                                                      ? sectionChild1Sub1Sub1.children.map(
                                                          (
                                                            sectionChild1Sub1Sub1Sub1
                                                          ) => (
                                                            <>
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

                                                              {sectionChild1Sub1Sub1Sub1
                                                                .children
                                                                .length > 0
                                                                ? sectionChild1Sub1Sub1Sub1.children.map(
                                                                    (
                                                                      sectionChild1Sub1Sub1Sub1Sub1
                                                                    ) => (
                                                                      <>
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
                  <Box>Content unavailable</Box>
                )}
              </Grid>
              <Grid item xs={2}>
                &nbsp;
              </Grid>
            </Grid>
          </Box>
        </motion.span>
      </Box>
    </Box>
  );
};

export default ExternalRequestsPreview;