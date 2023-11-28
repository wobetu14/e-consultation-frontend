import { Box } from "@mui/material";
import React from "react";

const Pagination = () => {
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Pagination
          count={3}
          variant="outlined"
          shape="rounded"
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            padding: "0px",
          }}
        />
      </Box>
    </>
  );
};

export default Pagination;