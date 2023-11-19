import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import { RegionsDataContext } from "../../../contexts/RegionsDataContext";
import CreateRegion from "./CreateRegion";
import EditRegion from "./EditRegion";
import DeleteRegionDialog from "./DeleteRegionDialog";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTranslation } from "react-i18next";

const RegionsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {t}=useTranslation()

  // RegionsDataContext
  const {
    regions,
    filteredRegions,
    searchRegion,
    setSearchRegion,
    region,
    setRegion,
    showRegionAddForm,
    setShowRegionAddForm,
    showRegionEditForm,
    setShowRegionEditForm,
    serverErrorMsg,
    serverSuccessMsg,
    openDialog,
    setOpenDialog,
    loading,
    requestCompleted,
    setRequestCompleted,
    networkErrorMessage,
    setNetworkErrorMessage,
    fetchRegions,
    networkError, 
    setNetworkError,
  } = useContext(RegionsDataContext);

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

  // Show / Hide Add Region Form
  const showAddRegionForm = (msg) => {
    setShowRegionAddForm(!showRegionAddForm);
    setShowRegionEditForm(false);
  };

  const showEditRegionForm = (regionRow) => {
    setRegion(regionRow);
    setShowRegionEditForm(true);
    setShowRegionAddForm(false);
  };

  const hideForm = () => {
    setShowRegionEditForm(false);
    setShowRegionAddForm(false);
  };

  const deleteRegionDialog = (regionRow) => {
    setRegion(regionRow);
    setOpenDialog(true);
  };

  const handleNetworkStatus=()=>{
    fetchRegions();
  }

  const columns = [
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t('region')}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">{`${row.name}`}</Typography>
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
        <Typography variant="body1">{row.creator ? row.creator.first_name:""} {row.creator ? row.creator.middle_name:""}</Typography>
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
              onClick={() => showEditRegionForm(row)}
            >
              <ModeEditIcon fontSize="small" color="secondary" />
            </Button>
            <Button
              variant="Link"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => deleteRegionDialog(row)}
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
    <Box sx={{ width:{
      xs:300, sm:500, md:700, lg:900, xl:1200
    } }}>
      <Grid align="center" sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
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

          {loading ? <LinearProgress size="small" color="info" /> : null}
        </motion.span>
      </Grid>

      {openDialog && (
        <DeleteRegionDialog
          title={`${t('deleting_region')}...`}
          text={`${t('you_are_deleting_region_info')} \"${
            region ? region.name : ""
          }\". ${t('are_you_sure')}`}
        />
      )}
      {showRegionAddForm && <CreateRegion />}
      {showRegionEditForm && <EditRegion />}

      
        <Paper elevation={1} sx={{ marginTop: "10px", marginBottom: "350px" }}>
          <DataTable
            columns={columns}
            data={filteredRegions}
            progressPending={regions.length <= 0}
            highlightOnHover
            pointerOnHover
            progressComponent={
              <Box mb="20px">
              {/* Display progress bar if the data prop value is empty */}
              {
                requestCompleted===1 && filteredRegions.length<=0 && networkErrorMessage!=="AxiosError" ? `${t('no_record')}`: (
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
            pagination
            selectableRowsHighlight
            subHeader
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
                    value={searchRegion}
                    onChange={(e) => setSearchRegion(e.target.value)}
                  />
                </Box>
                <Box>
                  {showRegionAddForm ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{ textTransform: "none" }}
                      onClick={hideForm}
                    >
                      <VisibilityOffIcon /> {t('hide_form')}
                    </Button>
                  ) : showRegionEditForm ? (
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
                      onClick={showAddRegionForm}
                    >
                      <AddIcon /> {t('add_new_region')}
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

export default RegionsTable;