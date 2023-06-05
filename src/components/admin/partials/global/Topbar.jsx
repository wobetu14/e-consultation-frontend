import React, {useContext} from 'react'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../../../theme';

import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import  NotificationsOutlinedIcon  from '@mui/icons-material/NotificationsOutlined';
import  SettingsOutlinedIcon  from '@mui/icons-material/SettingsOutlined';
import  PersonOutlinedIcon  from '@mui/icons-material/PersonOutlined';
import  SearchIcon  from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Logout from '../../../../Logout';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';


const Topbar = () => {
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);
    const colorMode=useContext(ColorModeContext);
    const {t}=useTranslation()

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
        <Box 
         display="flex"
         backgroundColor={colors.grey[400]}
         borderRadius="3px"
        >
           {/*  <InputBase style={{ }} sx={{ ml:2, flex:1 }} placeholder="Search"/>
            <IconButton type="button" sx={{ p:1 }}>
                <SearchIcon />
            </IconButton> */}
        </Box>

        {/* Icons */}
        <Box display="flex">
                <Button variant="text" 
                color="primary" 
                size="small" 
                href='/'
                sx={{ textTransform:"none" }}
                >
                    {/* <Typography variant="body2"> */}
                      <HomeIcon fontSize='small' color="primary" /> &nbsp; {t('home')}
                    {/* </Typography> */}
                </Button>
            <Logout />
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode==="dark" ? (
                    <DarkModeOutlinedIcon />
                ):(
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
            {/* <IconButton>
                <NotificationsOutlinedIcon/>
            </IconButton> */}
          {/*   <IconButton>
                <SettingsOutlinedIcon />
            </IconButton> */}
            <IconButton>
                <PersonOutlinedIcon />
            </IconButton>
        </Box>
    </Box>
  )
}

export default Topbar