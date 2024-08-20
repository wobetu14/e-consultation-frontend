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
          href="https://e-consultation.gov.et"
          target="_blank"
          rel="noreferrer"
        >
          https://e-consultation.gov.et
        </a>
      </Typography>

      <Typography sx={{ paddingLeft: "15px", paddingTop: "15px" }}>
        Watch the video tutorial here {" "}
        <a
          href="https://youtu.be/SgH5c3S9Ol0"
          target="_blank"
          rel="noreferrer"
        >
          E-Consultation Portal Video Tutorial
        </a>
      </Typography>
    </>
  );
}

export default GettingStarted;
