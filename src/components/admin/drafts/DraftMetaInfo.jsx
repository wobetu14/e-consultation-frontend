import {
  Box,
  Grid,
  Typography,
  useTheme,
  Chip,
  CircularProgress,
} from "@mui/material";
import React, {useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "../../../axios/AxiosGlobal";
import { tokens } from "../../../theme";
import DraftActions from "./DraftActions";

const DraftMetaInfo = ({
  documentDetail,
  setDocumentDetail,
  serverErrorMsg,
  serverSuccessMsg,
  setServerErrorMsg,
  setServerSuccessMsg,
  
  fetchDocumentDetails,
  fetchDocumentSections,
  fetchDocumentComments,
  loading,
  setLoading
}) => {
  const params = useParams();
  const [documentSections, setDocumentSections] = useState(null);
  const [documentComments, setDocumentComments] = useState(null);

  const {t}=useTranslation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /* useEffect(() => {
    fetchDocumentSections();
  }, [documentSections, documentComments]);

  useEffect(() => {
    fetchDocumentComments();
  }, [documentSections, documentComments]);

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
  }; */

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
                {t('document_details')}
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={6} md={6}>
                  <strong>{t('institution')}</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.institution
                    ? documentDetail.institution.name
                    : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>{t('law_category')}</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.law_category
                    ? documentDetail.law_category.name
                    : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>{t('draft_status')}</strong>
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

                  {documentDetail &&
                  documentDetail.draft_status.name === "Open" && parseInt(documentDetail.comment_closed)===0 ? (
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
                  documentDetail.draft_status.name === "Open" && parseInt(documentDetail.comment_closed)===1 ? (
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
                  
                    {
                        documentDetail && documentDetail.draft_status.name==="Closed" ? (
                          <Chip
                          label="Consultation ended"
                          size="small"
                          sx={{
                            backgroundColor: colors.secondary[100],
                            color: colors.grey[500],
                            marginRight: "5px",
                          }}
                        />
                        ):""
                      }
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>{t('draft_opening_date')}</strong>
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
                  <strong>{t('draft_closing_date')}</strong>
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
                  <strong>{t('legal_reference')}</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.base_legal_reference
                    ? documentDetail.base_legal_reference
                    : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>{t('definition')}</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.definition ? documentDetail.definition : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>{t('document_access')}</strong>
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
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <DraftActions
                draftID={params.id}
                documentDetail={documentDetail}
                setDocumentDetail={setDocumentDetail}
                serverErrorMsg={serverErrorMsg}
                serverSuccessMsg={serverSuccessMsg}
                setServerErrorMsg={setServerErrorMsg}
                setServerSuccessMsg={setServerSuccessMsg}

                fetchDocumentDetails={fetchDocumentDetails}
                fetchDocumentSections={fetchDocumentSections}
                fetchDocumentComments={fetchDocumentComments}

                loading={loading}
                setLoading={setLoading}
              />
            </Grid>
          </Grid>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Box>
    </Box>
  );
};

export default DraftMetaInfo;
