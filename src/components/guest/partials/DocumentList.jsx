
import { useTheme } from '@emotion/react';
import { PictureAsPdf } from '@mui/icons-material';
import { Button, Chip, List, ListItem, ListItemText, Paper, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { tokens } from '../../../theme';
import './DocumentDisplay.css'
import DraftPagination from './DraftPagination';

const DocumentList = ({status, deadline, draft}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading]=React.useState(true)

    React.useEffect(()=>{
        const loader=setTimeout(()=>{setLoading(false)}, 3000);
        return () => clearTimeout(loader);
    }, [])
  return (
    <div>
        <Paper elevation={1} sx={{ backgroundColor:colors.grey[200], marginBottom:'20px' }} className="document_list_container">
               {/*  {loading ? (
                    <Skeleton variant='rectangle' animation='wave' height={100} width="100%" />
                ):( */}
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
                        primary={
                            <React.Fragment>
                                <Typography variant='h5'
                                    sx={{ 
                                        display:'inline',
                                        fontWeight:"500",
                                     }}
                                >
                                    {draft.short_title}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                            </Typography>

                            <p>
                                {
                                    draft.summary
                                }
                            {/* {`The Government’s commitment to create a favorable domestic condition 
                            for promoting employment opportunities for those who are able to work is intact, 
                            it has been found necessary to protect the rights, ...`} */}
                            </p>
                            
                            <Stack direction="row" spacing={1}>
                                <div style={{ color:colors.grey[600] }}>
                                    <Chip label={(draft.draft_status.id===1) ? "Open for comment" : "Feedback closed"} 
                                            sx={draft.draft_status.id===1 ? 
                                                { 
                                                backgroundColor:colors.successColor[100], 
                                                color:colors.grey[500],
                                                marginRight:"5px"
                                                }
                                                :
                                                {
                                                    backgroundColor:colors.secondary[100], 
                                                    color:colors.grey[500],
                                                    marginRight:"5px"
                                                }
                                        }
                                            size="small"
                                    />

                                    
                                        {
                                        status===1
                                         ? 
                                          (
                                          <label>
                                              <strong> Closing Date: </strong> {deadline} &nbsp;
                                          </label>
                                          )
                                          :
                                          ''
                                        } 
                                        
                                    <label>
                                        <strong>Law category: </strong> {draft.law_category.name} &nbsp;
                                    </label>

                                    <label>
                                        <strong>Institution: </strong> {draft.institution.name} &nbsp;
                                    </label>
                                </div>
                            </Stack>

                            </React.Fragment>
                        }
                        />

                        
                    </ListItem>
                    {/* <Divider variant='outset' component="li" /> */}
                </List>
                {/* )} */}
            </Paper>
    </div>
  )
}

export default DocumentList