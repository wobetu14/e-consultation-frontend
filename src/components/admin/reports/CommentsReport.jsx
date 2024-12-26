import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import jsPDF from "jspdf";
import { Button } from "@mui/material";
import { FileDownload } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import axios from '../../../axios/AxiosGlobal';
import DraftBasicInfo from "./DraftBasicInfo";
import ReportDocumentSections from "./ReportDocumentSections";

/**
 * Create Drafts table and encapsulate Drafts Data Provider and then
 * Render <DraftsTable /> component so that all, dependents to the drafts data context can access
 * the data from the context provided by DraftsDatarovider
 */
const CommentsReport = () => {

    const params = useParams();

    const [documentDetail, setDocumentDetail] = useState(null);
    const [documentSections, setDocumentSections] = useState(null);
    const [documentComments, setDocumentComments] = useState(null);

    useEffect(() => {
        fetchDocumentDetails()
    }, []);

     useEffect(() => {
        fetchDocumentSections();
      }, []);
    
      useEffect(() => {
        fetchDocumentComments();
      }, []);
    
    const fetchDocumentDetails = async () => {
        return await axios
            .get(`drafts/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json;",
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data.data);
                setDocumentDetail(response.data.data);
            });
    };

    const fetchDocumentSections = async () => {
      return await axios
        .get(`draft/${params.id}/draft-sections`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setDocumentSections(response.data.data);
        })
        .catch((error) => {
          <p color="red">{error.response.message}</p>;
        });
    };

    const fetchDocumentComments = async () => {
      return await axios
        .get(`draft/${params.id}/general-comments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json;",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setDocumentComments(response.data.data);
        })
        .catch((error) => {
          <p color="red">{error.response.message}</p>;
        });
    };

    const htmlRef = useRef();
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
      format: 'a4'
    }); 

    const handlePrintPDF = (draft) => {
      doc.html(htmlRef.current, {
        callback: function (doc) {
          doc.save(`${draft}.pdf`);
          const iframe = document.createElement("iframe");
          iframe.src = doc.output("bloburi");
          iframe.setAttribute(
            "style",
            "position:absolute; top:0; left:0; right:0; width:100%; height:100%"
          );
          document.body.appendChild(iframe); 

        },
        margin: [20, 10, 20, 10],
        x: 0,
        y: 0,
        width: 100,
        windowWidth: 1024,
      });
    };
  return (
    <Box ml="10px">
      <Button
        variant="contained"
        color="secondary"
        size="small"
        sx={{
          textTransform: "none",
        }}
        onClick={() => handlePrintPDF(documentDetail.short_title)}
      >
        <FileDownload fontSize="small" />
        <Typography>Download</Typography>
      </Button>

          <Box
                
              ref={htmlRef}>
        <ReportDocumentSections
          documentDetail={documentDetail}
          documentComments={documentComments}
          documentSections={documentSections}
        />
      </Box>
    </Box>
  );
};

export default CommentsReport;
