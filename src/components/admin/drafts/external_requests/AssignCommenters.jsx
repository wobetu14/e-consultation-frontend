import React, { useEffect, useState } from "react";
import axios from "../../../../axios/AxiosGlobal";
import { motion } from "framer-motion";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  Box,
  DialogActions,
  Grid,
  Alert,
  LinearProgress,
} from "@mui/material";

import { useFormik } from "formik";

const AssignCommenters = ({
  requestID,
  requestTitle,
  incomingCommentRequests,

  serverSuccessMsg,
  serverErrorMsg,
  setServerSuccessMsg,
  setServerErrorMsg,
  openAssignCommenterDialog,
  setOpenAssignCommenterDialog,
  title = "Assign more commenters for this draft document.",
}) => {

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

  useEffect(()=>{
    getMyUsersID();
  }, [myUsers])

  useEffect(()=>{
    fetchMyUsers();
  }, [repliersEmail])


  const getMyUsersID = () => {
    if (repliersEmail.length > 0) {
      repliersEmail.map((replier) =>
        setRepliersID([...repliersID, replier.id])
      );
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

  const formikAssignCommenterForm = useFormik({
    initialValues: {
      commentRequestID: requestID,
      noticeMessage:
        "Dear Sir / Madam, This it to inform you that we have assigned you to review and provide feedback on this document.",
      commenters: [],
    },

    onSubmit: (values) => {
      const commentersData = {
        comment_request_id: values.commentRequestID,
        message: values.noticeMessage,
        commenters:
          repliersID.length > 0 ? repliersID.map((replierID) => replierID) : [],
      };

      assignMoreCommenters(commentersData);
    },
  });

  const assignMoreCommenters = async (commentersData) => {
    setServerSuccessMsg(null);
    setServerErrorMsg(null);
    setNetworkError(null);
    setLoading(true);
    return await axios
      .post(`assign-commenters`, commentersData,
      {headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => {
        setServerSuccessMsg(res.data.message);
        setServerErrorMsg(null);
        setNetworkError(null);
        incomingCommentRequests();
        setLoading(false);
        setOpenAssignCommenterDialog(false);
      })
      .catch((errors) => {
        setServerErrorMsg(errors.response.data.message);
        setServerSuccessMsg(null);
        setNetworkError(errors.name);
        setLoading(false);
      });
  };

  return (
    <Dialog open={openAssignCommenterDialog} fullWidth>
      <DialogTitle>
        <Typography variant="h5" fontWeight="600">
          {title} {requestTitle}
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
            onSubmit={formikAssignCommenterForm.handleSubmit}
          >
            <Typography variant="subtitle1" fontWeight="600">
              Assign more commenters
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
                  variant="outlined"
                  label="Select users"
                  color="info"
                  value={(option) => option}
                />
              )}
            />

            <TextField
              label="Write acceptance message (not mandatory)"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={4}
              sx={{ paddingBottom: "10px" }}
              color="info"
              name="noticeMessage"
              value={formikAssignCommenterForm.values.noticeMessage}
              onBlur={formikAssignCommenterForm.handleBlur}
              onChange={formikAssignCommenterForm.handleChange}
            />

            <Box>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ textTransform: "none", marginRight: "5px" }}
              >
                <Typography variant="body2">Assign</Typography>
              </Button>
            </Box>
          </form>
        </DialogContentText>
        <DialogActions>
          <Button
            onClick={() => setOpenAssignCommenterDialog(false)}
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

export default AssignCommenters;