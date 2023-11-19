import { Typography, Button, LinearProgress, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState, useContext } from "react";
import axios from "../../../axios/AxiosGlobal";
import Header from "../AdminHeader";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserContext } from "../../../contexts/UserContext";
import RefreshIcon from '@mui/icons-material/Refresh';

const DraftAssignments = () => {
  const [commentAssignments, setCommentAssignments] = useState(null);

  const { userInfo } = useContext(UserContext);
  const [networkErrorMessage, setNetworkErrorMessage]=useState(null)

  const fetchCommentAssignments = async () => {
    setNetworkErrorMessage(null)
    return await axios
      .get(`comment-repliers?replier=${userInfo.user.id}`,
      { headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json;",
        "Content-Type": "multipart/form-data"
      }})
      .then((res) => res.data.data)
      .then((res) => {
        setCommentAssignments(res);
        setNetworkErrorMessage(null);
      })
      .catch((error) => {
  
        setNetworkErrorMessage(error.name);
      });
  };

  useEffect(() => {
    fetchCommentAssignments();
  }, []);

  const handleNetworkStatus=()=>{
    fetchCommentAssignments();
  }

  return (
    <Box m="0 20px" width={"95%"}>
      <Header title="List of Draft Documents I have been assigned for to reflect on public comments" />

      <TableContainer
        component={Paper}
        sx={{ marginTop: "50px", marginBottom: "350px" }}
      >
        <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  Draft Title
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commentAssignments ? (
              commentAssignments.map((commentAssignment) => (
                <TableRow
                  key={commentAssignment.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography variant="body1">
                      {commentAssignment.draft}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      href={`/draft/reflection-on-comments/${commentAssignment.draft_id}`}
                      sx={{ textTransform: "none", marginRight: "5px" }}
                    >
                      <Typography variant="body1">
                        Reply to comments on this document
                      </Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : networkErrorMessage!==null ? (
              <Typography
              variant="body1"
              >
              Your internet connection may be unstable. You can &nbsp;
                <Button 
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ textTransform:'none' }}
                  onClick={handleNetworkStatus}
                >
                  Try again <RefreshIcon />
                </Button>
            </Typography> 
             ):
            (
                  // <CircularProgress color="secondary" />

                    <Typography variant="body1">
                      Please wait...
                    </Typography>

            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DraftAssignments;
