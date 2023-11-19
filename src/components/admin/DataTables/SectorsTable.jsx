import {
  Alert,
  Box,
  Button,
  Checkbox,
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
import CreateSector from "../sectors/CreateSector";
import EditSector from "../sectors/EditSector";
import { SectorsDataContext } from "../../../contexts/SectorsDataContext";
import DeleteSectorDialog from "../sectors/DeleteSectorDialog";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useTranslation } from "react-i18next";

const SectorsTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {t}=useTranslation();

  const {
    sectors,
    filteredSectors,
    searchSector,
    setSearchSector,
    sector,
    setSector,
    showSectorAddForm,
    setShowSectorAddForm,
    showSectorEditForm,
    setShowSectorEditForm,
    serverErrorMsg,
    serverSuccessMsg,
    openDialog,
    setOpenDialog,
    loading,
    requestCompleted,
    setRequestCompleted,
    networkErrorMessage,
    setNetworkErrorMessage,
    fetchSectors:fetchSectors, 
    networkError
  } = useContext(SectorsDataContext);

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

  // Show / Hide Add User Form
  const showAddSectorForm = () => {
    setShowSectorAddForm(!showSectorAddForm);
    setShowSectorEditForm(false);
  };

  const showEditSectorForm = (sectorRow) => {
    setSector(sectorRow);
    setShowSectorEditForm(true);
    setShowSectorAddForm(false);
  };

  const hideForm = () => {
    setShowSectorEditForm(false);
    setShowSectorAddForm(false);
  };

  const deleteSectorDialog = (sectorRow) => {
    setSector(sectorRow);
    setOpenDialog(true);
  };

  const handleNetworkStatus=()=>{
    fetchSectors();
  }

  const columns = [
    {
      name: (
        <Typography variant="h5" fontWeight="600">
          {t('sector_name')}
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
          {t('description')}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">{row.description.substr(0, 50)}</Typography>
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
          {t('region')}
        </Typography>
      ),
      selector: (row) => (
        <Typography variant="body1">{row.region_id}</Typography>
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
              onClick={() => showEditSectorForm(row)}
            >
              <ModeEditIcon fontSize="small" color="secondary" />
            </Button>
            <Button
              variant="Link"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => deleteSectorDialog(row)}
            >
              <DeleteIcon
                fontSize="small"
                sx={{ color: colors.dangerColor[200] }}
              />
            </Button>
            {/* <Button variant="contained" size="small" color="warning" sx={{textTransform:"none"}} onClick={()=>alert("You deleted user ID: "+row.id)}>Deactivate Account</Button> */}
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
        <DeleteSectorDialog
          title={`${t('deleting_sector_info')}...`}
          text={`${t('you_are_deleting_sector')} ${
            sector ? sector.name : ""
          }". ${t('are_you_sure')}`}
        />
      )}
      {showSectorAddForm && <CreateSector />}
      {showSectorEditForm && <EditSector />}
        <Paper elevation={1} sx={{ marginTop: "10px", marginBottom: "350px" }}>
          <DataTable
            columns={columns}
            data={filteredSectors}
            progressPending={filteredSectors.length <= 0}
            highlightOnHover
            pointerOnHover
            progressComponent={
              <Box mb="20px">
              {/* Display progress bar if the data prop value is empty */}
              {
                requestCompleted===1 && filteredSectors.length<=0 && networkErrorMessage!=="AxiosError" ? `${t('no_record')}`: (
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
                    value={searchSector}
                    onChange={(e) => setSearchSector(e.target.value)}
                  />
                </Box>
                <Box>
                  {showSectorAddForm ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{ textTransform: "none" }}
                      onClick={hideForm}
                    >
                      <VisibilityOffIcon fontSize="small" /> {t('hide_form')}
                    </Button>
                  ) : showSectorEditForm ? (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{ textTransform: "none" }}
                      onClick={hideForm}
                    >
                      <VisibilityOffIcon fontSize="small" /> {t('hide_form')}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{ textTransform: "none" }}
                      onClick={showAddSectorForm}
                    >
                      <AddIcon fontSize="small" /> {t('add_new_sector')}
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

export default SectorsTable;