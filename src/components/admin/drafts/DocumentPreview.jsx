import {
  Box,
  Collapse,
  Card,
  CardContent,
  Grid,
  Typography,
  ListItemButton,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SectionNavigationMenu from "../../guest/partials/SectionNavigationMenu";

const DocumentPreview = ({
  documentDetail,
  setDocumentDetail,
  documentSections,
  setDocumentSections,
  documentComments,
  setDocumentComments,
}) => {
  const [contentBgColor, setContentBgColor] = useState(null);

  // Menu collapse functionality
  const [articlesOpen, setArticlesOpen] = React.useState(true);

  const handleArticlesCollapse = () => {
    setArticlesOpen(!articlesOpen);
  };

  return (
    <Box>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            paddingTop: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={3}>
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
                <>&nbsp;</>
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

                                                {sectionChild1Sub1Sub1.children
                                                  .length > 0
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
                                                            .children.length > 0
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
              <Box>
                <LinearProgress color="secondary" />
              </Box>
            )}
          </Grid>
          <Grid item xs={2}>
            &nbsp;
          </Grid>
        </Grid>
      </motion.span>
    </Box>
  );
};

export default DocumentPreview;