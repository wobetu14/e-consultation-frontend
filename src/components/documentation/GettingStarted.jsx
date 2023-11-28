import { Typography } from "@mui/material";
import React from "react";

function GettingStarted() {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", paddingLeft: "15px", paddingTop: "15px" }}
      >
        Accessing the portal
      </Typography>
      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        The FDRE Public Consultation Portal is available at{" "}
        <a
          href="http://www.e-consultation.gov.et"
          target="_blank"
          rel="noreferrer"
        >
          http://www.e-consultation.gov.et
        </a>
      </Typography>
    </>
  );
}

export default GettingStarted;
