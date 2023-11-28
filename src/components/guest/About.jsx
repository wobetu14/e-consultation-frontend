import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Box margin="0 110px">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Grid
          container
          sx={{
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h3">About FDRE Econsulation Portal</Typography>
          </Box>
        </Grid>
      </motion.span>
    </Box>
  );
};

export default About;