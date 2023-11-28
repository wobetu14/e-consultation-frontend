import {
  Typography,
  Button,
} from "@mui/material";
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
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";

const DraftAssignments = () => {
  const [commentAssignments, setCommentAssignments] = useState(null);

  const { userInfo } = useContext(UserContext);
  const [networkErrorMessage, setNetworkErrorMessage] = useState(null);

  const { t } = useTranslation();

  const fetchCommentAssignments = async () => {
    setNetworkErrorMessage(null);
    return await axios
      .get(`comment-repliers?replier=${userInfo.user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json;",
          "Content-Type": "multipart/form-data",
        },
      })
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

  const handleNetworkStatus = () => {
    fetchCommentAssignments();
  };

  return (
    <Box m="0 20px" width={"95%"}>
      <Header title={t("list_of_assigned_draft_documents")} />

      <TableContainer
        component={Paper}
        sx={{ marginTop: "50px", marginBottom: "350px" }}
      >
        <Table sx={{ minWidth: 550 }} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" fontWeight={600}>
                  {t("short_title")}
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
                        {t("reply_to_comments_on_this_document")}
                      </Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : networkErrorMessage !== null ? (
              <Typography variant="body1">
                {t("network_error_message")} &nbsp;
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none" }}
                  onClick={handleNetworkStatus}
                >
                  {t("try_again")} <RefreshIcon />
                </Button>
              </Typography>
            ) : (
              <Typography variant="body1">{t("please_wait")}...</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DraftAssignments;
