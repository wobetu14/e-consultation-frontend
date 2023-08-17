import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { motion } from "framer-motion";
import AdminUserGuideContainer from './AdminUserGuideContainer';
import Header from '../../admin/AdminHeader';
import DownloadUserManual from '../DownloadManual';
import DownloadDraftTemplate from './DownloadDraftTemplate';
import DownloadDeveloperGuide from './DownloadDeveloperGuid';
import DraftPreparationGuide from './DraftPreparationGuide';

const ResourceCenter = () => {
  return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Resouce Center" subtitle="User Manual and Downloadable Resources collection" />
            </Box>

            <Box width={"85%"}>
                <Grid sx={{ paddingBottom: "5px", paddingTop: "5px" }}>
                    <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    >
                <Header title="Downloadable Resources" />
                        <Grid spacing={2} container>
                            <Grid xs={4} item>
                                <DownloadUserManual />
                            </Grid>

                            <Grid xs={4} item>
                                <DownloadDraftTemplate />
                            </Grid>

                            <Grid xs={4} item>
                                <DownloadDeveloperGuide />
                            </Grid>
                        </Grid>
                    </motion.span>
                </Grid>
            </Box>

            <Box width={"85%"} sx={{ marginTop:"30px" }}>
                <Header title="Preparing Draft Document" />
                <Grid>
                    <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    >
                       <DraftPreparationGuide />
                    </motion.span>
                </Grid>
            </Box>

            <Box width={"85%"} sx={{ marginTop:"30px" }}>
                <Header title="User Manual HTML version" />
                
                <Grid>
                    <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    >
                        <AdminUserGuideContainer />
                    </motion.span>
                </Grid>
            </Box>
        </Box>
  )
}

export default ResourceCenter