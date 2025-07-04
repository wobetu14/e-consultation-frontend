import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

function decodeHtmlEntitiesAndConvertBreaks(encodedHtml) {
  // Step 1: Decode HTML entities like &lt; &gt;
  const textArea = document.createElement("textarea");
  textArea.innerHTML = encodedHtml;
  const decodedHtml = textArea.value;

  // Step 2: Replace <br>, <br/>, <br /> with newline
  return decodedHtml.replace(/<br\s*\/?>/gi, "\n");
}

const ConvertHTMLEditor = ({ commentText }) => {
  const rawHtml = commentText || ""; // Use commentText prop or default to empty string

  const [plainText, setPlainText] = useState("");

  useEffect(() => {
    const decoded = decodeHtmlEntitiesAndConvertBreaks(rawHtml);
    setPlainText(decoded);
  }, [rawHtml]);

  return (
    <TextField
      label="Decoded and Editable Text"
      fullWidth
      multiline
      minRows={8}
      value={plainText}
      onChange={(e) => setPlainText(e.target.value)}
    />
  );
};
export default ConvertHTMLEditor;
