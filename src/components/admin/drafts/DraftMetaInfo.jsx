import {
  Box,
  Grid,
  Typography,
  useTheme,
  Chip,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { tokens } from "../../../theme";
import DraftActions from "./DraftActions";

/**
 * This component is used to render the drafts meta information 
 * along with action buttons with a sub-component (DraftActions). 
 * It receives the following values as a props from its parent component
 * (DocumentDetails)
 * @param {*} documentDetail - Variable to store whole all attributes of the document returned from the http request
 * @param {*} setDocumentDetail - Setter method to set the draft meta data into documentDetail object 
 * @param {*} serverErrorMsg -  Variable to store server error information coming from the server
 * @param {*} serverSuccessMsg -  Variable to store success information coming from the server
 * @param {*} setServerErrorMsg -  Setter method to store the server error information into serverErrorMessage
 * @param {*} setServerSuccessMsg -  Setter method to store the server success information into serverSuccessMessage
 * @param {*} fetchDocumentDetails -  A method to handle fetching document info from the server
 * @param {*} fetchDocumentSections -  A method to handle fetching document sections from the server
 * @param {*} fetchDocumentComments -  A method to handle fetching document comments from the server
 * @param {boolean} loading -  Variable to store boolean value that is used to show an indicator whether 
 *  request is completed or not
 * @param {*} setLoading -  Setter method to set value to the loading value
 * @returns 
 */

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

  /**
   * Create params variable to access url parameteres with the useParams hook 
   * so that we can access the documents ID from the URL and hence we can
   * query the document detail info using the ID as a selector
   */
  const params = useParams();

  /**
   * Destructure and access the translation object from the useTranslation hook 
   * from the i18next internationalization library.
   */
  const {t}=useTranslation();

  /**
   * Access theme object from the useTheme user defined hook
   */
  const theme = useTheme();

  /**
   * Access color mode for dark and light themes.
   */
  const colors = tokens(theme.palette.mode);

  return (
    /**
     * Create UI for rendering documentDetails, sections and document comments. Enclose the UI with Box element of Material UI
     */
    <Box>
      {/**
       * Render documentDetails data
       */}
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
                {/**
                 * Render document title with h3 Typography
                 */}
                {documentDetail.short_title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ paddingBottom: "30px", textAlign: "justify" }}
              >
                {/**
                 * Render document summary with h5 Typography
                 */}
                {`${documentDetail.summary.slice(0, 400)} ...`}
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
                {/**
                 * Render document meta data attributes such as institution name, law category, draft status, opening and closing date 
                 */}
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
                    ? `${documentDetail.base_legal_reference.slice(0, 50)} ...`
                    : null}
                </Grid>

                <Grid item xs={6} md={6}>
                  <strong>{t('definition')}</strong>
                </Grid>
                <Grid item xs={6} md={6}>
                  {documentDetail.definition ? `${documentDetail.definition.slice(0, 50)} ...` : null}
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
              {/**
               * Render DraftActions component. This component is used to access or display 
               * action buttons to perform on the document such as to "Accept / Reject" opening request,
               * to send invitations to people and institutions and to close or end the consultation.
               * Go to DraftActions sub-component to understand more.
               */}
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
          /**
           * Show progressbar to indicate the http request is under progress to render the draft meta information
           */
          <CircularProgress color="secondary" />
        )}
      </Box>
    </Box>
  );
};

export default DraftMetaInfo;
