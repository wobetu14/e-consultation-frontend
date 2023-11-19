import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../axios/AxiosGlobal";

import ExternalRequestActions from "./ExternalRequestActions";
import { tokens } from "../../../../theme";

const ExternalRequestMetaInfo = ({
  documentDetail,
  setDocumentDetail,
  serverErrorMsg,
  serverSuccessMsg,
  setServerErrorMsg,
  setServerSuccessMsg,
}) => {
  const params = useParams();
  const [documentSections, setDocumentSections] = useState(null);
  const [documentComments, setDocumentComments] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchDocumentSections()
  }, []);

  useEffect(() => {
    fetchDocumentComments();
  }, []);

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
        <p color="red">{error.response.data.message}</p>;
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
        
      });
  };

  return (
    <Box>
      <Box sx={{ marginBottom: "30px", padding: "40px" }}>
        {documentDetail ? (
          <Grid container>
            <Grid item xs={8}>
              <Typography
                variant="h3"
                sx={{
                  paddingBottom: "20px",
                  fontWeight: 600,
                  textAlign: "center",
                  color: colors.primary[200],
                }}
              >
                {documentDetail.short_title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ paddingBottom: "30px", textAlign: "justify" }}
              >
                {documentDetail.summary}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  paddingBottom: "20px",
                  textAlign: "justify",
                  fontWeight: 600,
                  color: colors.primary[200],
                }}
              >
                Document Details
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={6} md={6}>
                  <strong>Institution</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.institution
                    ? documentDetail.institution.name
                    : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>Law category</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.law_category
                    ? documentDetail.law_category.name
                    : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>Draft status</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail &&
                  documentDetail.draft_status.name === "New" ? (
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
                  documentDetail.draft_status.name === "Open" ? (
                    <Chip
                      label={documentDetail.draft_status.name}
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
                  documentDetail.draft_status.name === "Closed" ? (
                    <Chip
                      label={documentDetail.draft_status.name}
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
                  documentDetail.draft_status.name === "Rejected" ? (
                    <Chip
                      label={documentDetail.draft_status.name}
                      size="small"
                      sx={{
                        backgroundColor: colors.dangerColor[200],
                        color: colors.grey[300],
                      }}
                    />
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>Opening date for comment</strong>
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

                <Grid item xs={6} md={6}>
                  <strong>Closing date for comment</strong>
                </Grid>
                <Grid item xs={6} md={6}>
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

                <Grid item xs={6} md={6}>
                  <strong>Base Legal Reference</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.base_legal_reference
                    ? documentDetail.base_legal_reference
                    : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>Definition</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.definition ? documentDetail.definition : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>Document Access</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Chip
                    label={
                      documentDetail
                        ? documentDetail.is_private === 0
                          ? "Public"
                          : "Private"
                        : "Unavailable"
                    }
                    size="small"
                    // sx={{ backgroundColor:colors.dangerColor[200], color:colors.grey[300] }}
                  />
                </Grid>

                {/*     <Grid item xs={6} md={6}>
                <strong>Download</strong> 
              </Grid> 
              <Grid item xs={6} md={6}>
              {documentDetail.file ? (
                <Button href={documentDetail.file} variant="contained" color="secondary" target="_blank" sx={{ textTransform:"none", color:"#fff" }}><FileDownload /> Download Draft</Button>
              ):
              (null)
              } 
              </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <ExternalRequestActions
                documentDetail={documentDetail}
                setDocumentDetail={setDocumentDetail}
                serverErrorMsg={serverErrorMsg}
                serverSuccessMsg={serverSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}
              />
            </Grid>
            ):""
          </Grid>
        ) : (
          <LinearProgress color="secondary" />
        )}
      </Box>
    </Box>
  );
};

export default ExternalRequestMetaInfo;
