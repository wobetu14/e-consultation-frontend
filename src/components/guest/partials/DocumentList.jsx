
import { useTheme } from '@emotion/react';
import { PictureAsPdf } from '@mui/icons-material';
import { Button, Chip, List, ListItem, ListItemText, Paper, Skeleton, Stack, Typography } from '@mui/material'
import React, { useTransition } from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { tokens } from '../../../theme';
import './DocumentDisplay.css'
import DraftPagination from './DraftPagination';

const DocumentList = ({status, deadline, draft, loading, setLoading}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {t}=useTranslation();

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
                                        fontWeight:"600",
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
                                variant="body1"
                                color="text.primary"
                            >
                                { draft.summary}
                            </Typography>

                            <p>

                            {/* {`The Government’s commitment to create a favorable domestic condition 
                            for promoting employment opportunities for those who are able to work is intact, 
                            it has been found necessary to protect the rights, ...`} */}
                            </p>
                            
                            <Stack direction="row" spacing={1}>
                                <div style={{ color:colors.grey[600] }}>

                                {
                                   (draft.draft_status.name==="Open") 
                                   ? 
                                   (
                                    <Chip label={t('open_for_comment')} 
                                    size="small"
                                    sx={{ 
                                        backgroundColor:colors.successColor[100], 
                                        color:colors.grey[500],
                                        marginRight:"5px"
                                        }}
                                    />
                                   ) 
                                   : 
                                   (draft.draft_status.name==="Closed") 
                                   ?
                                   (
                                   <Chip label={t('closed_for_comment')} 
                                   size="small"
                                   sx={{
                                        backgroundColor:colors.secondary[100], 
                                        color:colors.grey[500],
                                        marginRight:"5px"
                                    }} 
                                   />):""
                                   } 
 
                                        {
                                        draft.draft_status.name==="Open"
                                         ? 
                                          (
                                          <label>
                                              <strong> {t('draft_closing_date')}: </strong> {draft.comment_closing_date} &nbsp;
                                          </label>
                                          )
                                          :
                                          ''
                                        } 
                                        
                                    <label>
                                        <strong>{t('law_category')}: </strong> {draft.law_category.name} &nbsp;
                                    </label>

                                    <label>
                                        <strong>{t('institution')}: </strong> {draft.institution.name} &nbsp;
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