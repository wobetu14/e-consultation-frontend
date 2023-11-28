import { Box, Grid, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

import { UserContext } from "../../../contexts/UserContext";
import DraftInvitationCheckpoint from "../../guest/auth/DraftInvitationCheckpoint";

const RedirectCommentInvitation = () => {
  const params = useParams();
  const [hasAccount, setHasAccount] = useState(false);

  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    redirectUSer();
  }, []);

  const redirectUSer = async () => {
    if (userInfo) {
      setHasAccount(true);
      navigate(`/draft/${params.id}`);
    }
  };

  return (
    <Box sx={{ marginTop: "100px" }}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Grid align="center">
          {}
          <Typography variant="h5" fontWeight="600">
            {hasAccount === false && (
              <DraftInvitationCheckpoint draftID={params.id} />
            )}
          </Typography>
        </Grid>
      </motion.span>
    </Box>
  );
};

export default RedirectCommentInvitation;
