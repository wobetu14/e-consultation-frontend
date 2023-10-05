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
      console.log(error);
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
      console.log("My users");
      console.log(res.data.data);
      setMyUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formikAcceptanceForm = useFormik({
    initialValues: {
      draft_id: params.id,
      comment_repliers: [],
    },

    onSubmit: (values) => {
      const requestData = {
        draft_id: params.id,
        comment_repliers:
          repliersID.length > 0 ? repliersID.map((replierID) => replierID) : [],
      };

      assignMoreRepliers(requestData);
    },
  });

  const assignMoreRepliers = async (requestData) => {
    console.log(requestData);
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
        setNetworkError(errors.name);
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
                {networkError ? (
                  <Alert severity="error" style={errorStyle}>
                    Your internet connection may be unstable. Please try again.
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
              Assign Repliers
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
                  label="Enter email addresses"
                  value={(option) => option}
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
                <Typography variant="body2">Assign and close</Typography>
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
            <Typography variant="body2">Cancel</Typography>
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AssignMoreRepliersDialog;