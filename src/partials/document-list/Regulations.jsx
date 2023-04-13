import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Button, Chip, Grid, Paper, Skeleton, Stack } from '@mui/material';
import Pics from "../../images/fdreconstitution.jpeg"
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DocumentList from '../../components/guest/partials/DocumentList';

const RegulationDocs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading]=React.useState(true)

    React.useEffect(()=>{
        const loader=setTimeout(()=>{setLoading(false)}, 3000);
        return () => clearTimeout(loader);
    }, [])
  return (
      <>
        <DocumentList status={1} deadline={"May 02, 2023"} />  
        <DocumentList status={0} deadline={"Mar. 10, 2023"}/>  
        <DocumentList status={0} deadline={"Feb. 24, 2023"}/>  
        <DocumentList status={1} deadline={"Apr. 25, 2023"} />  
     </>
  );
}

export default RegulationDocs;