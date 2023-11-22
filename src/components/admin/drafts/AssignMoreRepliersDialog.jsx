import React, { useState } from "react";
import axios from "../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
  Box,
  DialogActions,
  Grid,
  Alert,
  LinearProgress,
} from "@mui/material";
import { tokens } from "../../../theme";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

const AssignMoreRepliersDialog = ({
  draftID,
  documentDetail,
  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openAssignRepliersDialog,
  setOpenAssignRepliersDialog,
  title,
}) => {
  const params = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);

  const [instIDs, setInsIDs] = useState([]);
  const [repliersEmail, setRepliersEmail] = useState([]);
  const [myUsers, setMyUsers] = useState([]);
  const [repliersID, setRepliersID] = useState([]);
  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError]=useState(null);

  const {t}=useTranslation();

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

  React.useEffect(()=>{
    fetchInstitutions();
  },[])

  React.useEffect(()=>{
    getInstitutionsID();
  },[selectedInstitutions])

  React.useEffect(()=>{
    getMyUsersID();
  }, [repliersEmail])

  React.useEffect(() => {
    fetchMyUsers();
  }, []);

  const getMyUsersID = () => {
    if (repliersEmail.length > 0) {
      repliersEmail.map((replier) =>
        setRepliersID([...repliersID, replier.id])
      );
    }
  };

  const getInstitutionsID = () => {
    if (selectedInstitutions.length > 0) {
      selectedInstitutions.map((selectedInstitution) =>
        setInsIDs([...instIDs, selectedInstitution.id])
      );
    }
  };

  const fetchInstitutions = async () => {
    try {
      const res = await axios.get("public/institutions",
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      setInstitutions(res.data.data.data);
    } catch (error) {
    }
  };

  const fetchMyUsers = async () => {
    try {
      const res = await axios.get(`commenters-per-institution`,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }});
      setMyUsers(res.data.data);
    } catch (error) {
    }
  };

  const formikAcceptanceForm = useFormik({
    initialValues: {
      draft_id: draftID,
      comment_repliers: [],
    },

    onSubmit: (values) => {
      const requestData = {
        draft_id: draftID,
        comment_repliers:
          repliersID.length > 0 ? repliersID.map((replierID) => replierID) : [],
      };

      assignMoreRepliers(requestData);
    },
  });

  const assignMoreRepliers = async (requestData) => {
    setServerErrorMsg(null);
    setServerSuccessMsg(null);
    setNetworkError(null);
    setLoading(true);

    return await axios
      .post(`additional-repliers`, requestData,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null);
        setLoading(false);
        setOpenAssignRepliersDialog(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setNetworkError(errors.code);
        setLoading(false);
      });
  };

  return (
    <Dialog open={openAssignRepliersDialog}>
      <DialogTitle>
        <Typography variant="h5" fontWeight="600">
          {title} 
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
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
                  <Alert severity="error" style={errorStyle}>
                    {t('network_error_message')}
                  </Alert>
                ) : null}
              </Typography>

              {loading ? <LinearProgress size="small" color="info" /> : ""}
            </motion.span>
          </Grid>

          <form
            style={{ marginBottom: "30px" }}
            onSubmit={formikAcceptanceForm.handleSubmit}
          >
            <Typography variant="subtitle1" fontWeight="600">
              {t('assign_repliers')}
            </Typography>
            <Autocomplete
              multiple
              id="tags-standard"
              freeSolo
              autoSelect
              color="info"
              sx={{ paddingBottom: "10px" }}
              options={myUsers}
              getOptionLabel={(option) =>
                option.first_name + " " + option.middle_name
              }
              onChange={(e, value) => setRepliersEmail(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label={t('enter_email_address')}
                  value={(option) => option}
                  color="info"
                />
              )}
            />

            <Box>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                type="submit"
                sx={{
                  textTransform: "none",
                  marginRight: "5px",
                  backgroundColor: colors.successColor[200],
                  color: colors.grey[300],
                }}
                onClick={assignMoreRepliers}
              >
                <Typography variant="body2">{t('assign_and_close')}</Typography>
              </Button>
            </Box>
          </form>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => setOpenAssignRepliersDialog(false)}
            variant="outlined"
            size="small"
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            <Typography variant="body2">{t('cancel')}</Typography>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AssignMoreRepliersDialog;