import {
  Alert,
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import DataTable from "react-data-table-component";

import { Stack } from "@mui/system";
import { tokens } from "../../../theme";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { motion } from "framer-motion";
import { DraftsDataContext } from "../../../contexts/DraftsDataContext";
import CreateDraft from "../drafts/CreateDraft";
import EditDraft from "../drafts/EditDraft";
import DeleteDraftDialog from "../drafts/DeleteDraftDialog";
import { rootURL } from "../../../axios/AxiosGlobal";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTranslation } from "react-i18next";

/**
 * This component is used to create drafts data table along with search and pagination functionalities.
 * This component is child of DraftsDataContext drafts data is extracted from the context.
 */

/**
 * Create DraftsTable component
 */
const DraftsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {t}=useTranslation();
  
  /**
   * Destructure important data from the Drafts Data Context. Note that we are going to destructure only 
   * the variables we are going to use in this child component
   */
  const {
    drafts, 
    setDrafts,
    fetchDrafts,
    filteredDrafts,
    searchDraft,
    setSearchDraft,
    draft,
    setDraft,
    showDraftAddForm,
    setShowDraftAddForm,
    showDraftEditForm,
    setShowDraftEditForm,
    serverErrorMsg,
    serverSuccessMsg,
    openDialog,
    setOpenDialog,
    loading,
    requestCompleted,
    setRequestCompleted,
    networkErrorMessage,
    networkError,
    setNetworkerror
  } = useContext(DraftsDataContext);

  const errorStyle = {
    color: "red",
    fontWeight: "400",
    fontSize: "18px",
  };

  const successStyle = {
    color: "green",
    fontWeight: "400",
    fontSize: "18px",
  };

  /**
   * Show / Hide Add User Form
   * These two methods are used to show and hide forms to add and edit drafts data.
   * The hide / show functionalies are triggered upon click event of buttons available on the top right corner 
   * of the drafts data table
   */
  const showAddDraftForm = (msg) => {
    setShowDraftAddForm(!showDraftAddForm);
    setShowDraftEditForm(false);
  };

  const showEditDraftForm = (row) => {
    setDraft(row);
    setShowDraftEditForm(true);
    setShowDraftAddForm(false);
  };

  const hideForm = () => {
    setShowDraftEditForm(false);
    setShowDraftAddForm(false);
  };

  /**
   * Show / hide dialog to delete single draft
   */
  const deleteDraftDialog = (draftRow) => {
    setDraft(draftRow);
    // Set openDialog variable to true to show the delete dialog 
    setOpenDialog(true);
  };

  const handleNetworkStatus=()=>{
    fetchDrafts();
  }

  /**
   * Create columns and row selectors to create data table. 
   * We have used 'react-data-table-component' to build the data table.
   * Follow the documentation of 'react-data-table-component' to understand more how we have created
   * the data table for this draft data. Read more at: https://www.npmjs.com/package/react-data-table-component 
   * and https://youtu.be/3oHUtG0cjfY 
   */
  const columns = [
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t('title')}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">{`${row.short_title.substr(
          0,
          20
        )}`}</Typography>
      ),
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t('owning_institution')}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">
          {row.institution ? row.institution.name : ""}
        </Typography>
      ),
      sortable: true,
    },
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t('created_by')}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">
          {row.uploader ? row.uploader.first_name : ""} {row.uploader ? row.uploader.last_name : ""}
        </Typography>
      ),
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t('download_file')}
        </Typography>
      ),
      selector: (row) => (
        <a href={row.file} target="_blank" rel="noreferrer">
          <Typography variant="body1">{t('download')}</Typography>
        </a>
      ),
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t('download_comment_reports')}
        </Typography>
      ),
      selector: (row) =>
        row.draft_status !== null && row.draft_status.name === "Closed" ? (
          <a href={`${rootURL}report/${row.id}`} target="_blank" rel="noreferrer">
            <Typography variant="body1">{t('download')}</Typography>
          </a>
        ) : (
          ""
        ),
      sortable: true,
    },

    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t('actions')}
        </Typography>
      ),
      selector: (row) => {
        return (
          <Stack spacing={0} direction="row">
            <Button
              variant="Link"
              size="small"
              color="secondary"
              sx={{ textTransform: "none" }}
              key={row.id}
              onClick={() => showEditDraftForm(row)}
            >
              <ModeEditIcon fontSize="small" color="secondary" />
            </Button>
            <Button
              variant="Link"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => deleteDraftDialog(row)}
            >
              <DeleteIcon
                fontSize="small"
                sx={{ color: colors.dangerColor[200] }}
              />
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    /**
     * Create the data table UI and render data based on the column definition and filteredDrafts data 
     * which is available from the drafts context data
     */
    /**
     * First create Box as a parent object, then create Grid inside
     */
    <Box sx={{ width:{
      xs:300, sm:500, md:700, lg:900, xl:1200
    } }}>
      <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >

          {/* 
            Display response message resulted from the API call. Sucess or error messages
           */}
          <Typography variant="h1">
            {serverSuccessMsg ? (
              <Alert severity="success" style={successStyle}>
                {serverSuccessMsg}
              </Alert>
            ) : null}
          </Typography>

          <Typography variant="h1">
            {serverErrorMsg ? (
              <Alert severity="error" style={errorStyle}>
                {serverErrorMsg}
              </Alert>
            ) : null}
          </Typography>

          <Typography variant="h1">
            {networkError==="ERR_NETWORK" ? (
              <Alert severity="error" variant="outlined">
                {t('network_error_message')}
              </Alert>
            ) : null}
          </Typography>

          {/* 
             Display loading indicator information to indicate CRUD operation is 
             under progress or not. Display this information only when loading variable value is true
           */}
          {loading ? (
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                textAlign="left"
                sx={{ color: colors.warningColor[100] }}
              >
                {t('process_may_take_long')} {t('please_wait')}
              </Typography>
              <LinearProgress color="info" /> {/* Line progress bar indicator imported from Material UI */}
            </Box>
          ) : null}
        </motion.span>
      </Grid>

      {openDialog && (
        <DeleteDraftDialog
          title={`${t('deleting_draft_document')}`}
          text={`${t('you_are_deleting_draft')} "${
            draft ? draft.short_title : ""
          }". ${t('are_you_sure')}`}
        />
      )}
      {showDraftAddForm && <CreateDraft />} {/* Show <CreateDraft /> component if showDraftAddForm value is true */}
      {showDraftEditForm && <EditDraft />}  {/* Show <EditDraft /> component if the showDraftEditForm value is true */}

      <Paper
        elevation={1}
        sx={{ marginTop: "10px", marginBottom: "350px" }}
      >
        {/* 
          Render the data table. <DataTable /> component is a built in data table from react-data-table-component.
          We have used predefined props from the coponents
        */}
        <DataTable
          columns={columns} /* Define columns from columns object definition */
          data={filteredDrafts} /* define the data props value from filteredDrafts*/
          pagination /* Use table pagination */
          selectableRowsHighlight
          subHeader /* Create sub header to add other table components such as filter TextField and Add / Edit drafts button */
          progressPending={filteredDrafts.length <= 0} /* Display pending progress bar if the length of filteredDrafts array is less or equals to 0 */
          highlightOnHover
          pointerOnHover
          progressComponent={
            <Box mb="20px">
              {/* Display progress bar if the data prop value is empty */}
              {
                requestCompleted===1 && filteredDrafts.length<=0 && networkErrorMessage!=="AxiosError" ? `${t('no_record')}`: (
                  networkErrorMessage==="AxiosError" ? (
                    <>
                    <Typography
                      variant="body1"
                    >
                      {t('network_error_message')} &nbsp;
                      <Button 
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ textTransform:'none' }}
                        onClick={handleNetworkStatus}
                      >
                        {t('try_again')} <RefreshIcon />
                      </Button>
                    </Typography>
                    </>
                  ): `${t('please_wait')}...`
                )
              }
            </Box>
          }
          
          /* Add subheader components such as search TextField and Add form Button */
          subHeaderComponent={
            <Box
              width="100%"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                direction: "row",
              }}
            >
              <Box width="30%">
                <TextField
                  label={`${t('search')}...`}
                  variant="outlined"
                  size="small"
                  color="info"
                  fullWidth
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                />
              </Box>
              <Box>
                {/* Show add drafts form and a button to show and hide the draft form */}
                {showDraftAddForm ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={hideForm}
                  >
                    <VisibilityOffIcon /> {t('hide_form')}
                  </Button>
                ) : 
                /* Show edit drafts form and a button to hide and show the edit draft form */
                /* Note that toggling between add form and edit form is vice versa. */
                showDraftEditForm ? (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={hideForm}
                  >
                    <VisibilityOffIcon /> {t('hide_form')}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    onClick={showAddDraftForm}
                  >
                    <AddIcon /> {t('add_new_draft')}
                  </Button>
                )}
              </Box>
            </Box>
          }
        />
      </Paper>
    </Box>
  );
};

export default DraftsTable;