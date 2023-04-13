import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, Grid, Paper, Skeleton } from '@mui/material';
import Pics from "../../images/fdreconstitution.jpeg"
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';

const RegulationDocs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading]=React.useState(true)

    React.useEffect(()=>{
        const loader=setTimeout(()=>{setLoading(false)}, 3000);
        return () => clearTimeout(loader);
    }, [])
  return (
            <Paper elevation={1} sx={{ backgroundColor:colors.grey[200] }}>
                {loading ? (
                    <Skeleton variant='rectangle' animation='wave' height={100} width="100%" />
                ):(
                    <List elevation={1} sx={{ width: '100%'}}> 
                       {/* bgcolor: 'background.paper'  */}
                    <ListItem alignItems="flex-start">
                        {/* <ListItemAvatar>
                        <img alt="Cindy Baker" 
                         src={Pics} 
                         style={{ 
                             width:"50px", 
                             height:"70px",
                              margin:"0 10px 0 0", 
                              borderRadius:"3px" }} />
                        </ListItemAvatar> */}
                        <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        {/* <ListItemAvatar>
                        <img alt="Cindy Baker" 
                         src={Pics} 
                         style={{ 
                             width:"50px", 
                             height:"70px",
                             margin:"0 10px 0 0", 
                              borderRadius:"3px" }} />
                        </ListItemAvatar> */}
                        <ListItemText
                        primary="Summer BBQ"
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                to Scott, Alex, Jennifer
                            </Typography>
                            {" — Wish I could come, but I'm out of town this…"}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                        {/* <ListItemAvatar>
                        <img alt="Cindy Baker" 
                         src={Pics} 
                         style={{ 
                             width:"50px", 
                             height:"70px",
                             margin:"0 10px 0 0", 
                              borderRadius:"3px" }} />
                        </ListItemAvatar> */}
                        <ListItemText
                        primary="Oui Oui"
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Sandra Adams
                            </Typography>
                            {' — Do you have Paris recommendations? Have you ever…'}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                </List>
                )}
            </Paper>
  );
}

export default RegulationDocs;