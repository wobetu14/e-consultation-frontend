import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { Grid } from "@mui/material"
import { useTheme } from "@mui/material";
import { tokens, ColorModeContext } from "../../theme";
import { useContext, useState } from "react";
import DrawerComp from "./Drawer";

import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import {Link, NavLink, useNavigate } from "react-router-dom";
import LanguageButton from "../LanguageButton";

import { useTranslation } from 'react-i18next';
import { UserContext } from "../../contexts/UserContext";
import Logout from "../../Logout";

const Topbar = ({menuItems}) => {
  const { t } = useTranslation()

  // User ContextData
  const {userRole, setUserRole, userInfo, userToken, setUserToken}=useContext(UserContext);

    const theme=useTheme()
    const colors=tokens(theme.palette.mode)
    const colorMode=useContext(ColorModeContext);

    // Optimize page for mobile view (Responsive)
    const isMatch=useMediaQuery(theme.breakpoints.down('md'))

    // Indicate which tab is selected
    const [tabValue, setTabValue]=useState(0);

    // Navigate to Sign In page
    const navigate=useNavigate()
   const openSignInPage=(e)=>{
     navigate("/login")
     setTabValue(null)
   }

  //  Navigate to Signup page
  const openSignUpPage=()=>{
    navigate("/create-account")
    setTabValue(null)
  }

  return (
    <>
      <AppBar 
      elevation={0} 
      position='relative'
      sx={{
       backgroundColor:colors.primary[200], 
       zIndex:2 }}>
          <Grid container>
            <Grid item xs={10}>
            
            </Grid>
            <Grid item xs={2}>
                <Box display="flex">
                    <IconButton onClick={colorMode.toggleColorMode} sx={{ color:colors.grey[400] }}>
                        {theme.palette.mode==="dark" ? (
                            <DarkModeOutlinedIcon />
                        ):(
                            <LightModeOutlinedIcon />
                        )} &nbsp;
                    </IconButton>
                    
                    <IconButton>
                        <LanguageButton />
                    </IconButton>
                </Box>
            </Grid>
          </Grid>
      </AppBar>
      <AppBar position='relative' elevation={1} sx={{ backgroundColor:colors.grey[100], zIndex:1}}> {/*  sx={{ backgroundImage:"linear-gradient(45deg, rgba(195,34,159,1) 0%, rgba(253,45,53,1) 100%)", color:"white" }} */}
          <Toolbar>
              {isMatch ? (
                  <DrawerComp />
              ): (
                  <Grid container>
                  <Grid item xs={6}>
                      <Typography variant="h3" color={colors.primary[100]}>
                        {t('ethiopia')}
                      </Typography>
                  </Grid>
                  
                  <Grid item xs={4} >
                      <Tabs 
                      indicatorColor="secondary"
                      textColor="secondary" 
                      value={tabValue}
                      onChange={(e, val)=>(setTabValue(val))}
                      >                
                        {
                            menuItems.map(({id, linkText, to})=>(
                              <Tab 
                              key={id} 
                              label={t(linkText)} 
                              to={to}
                              component={Link}
                              />
                            ))
                        }
                      </Tabs>
                  </Grid>
                  <Grid item xs={2}>
                        <Box display="flex">
                            {
                            (userToken!==null && userToken!==undefined && userRole!=null && userRole!==undefined ) ?  (
                                <>
                                  <Typography variant='h5' sx={{ fontWeight:"600", color:colors.successColor[100] }}>
                                    {userInfo.user.first_name + " " + userInfo.user.middle_name} &nbsp;
                                    {
                                      userRole==='Commenter' ? 
                                      (
                                        <Link to='/commenter' >{t('dashboard')}</Link>
                                      ):
                                      (
                                        <Link to='admin'>{t('dashboard')}</Link>
                                      )
                                    }
                                    
                                     <Logout />
                                  </Typography>
                                </>
                                 
                                ):
                                (
                                  <>
                                    <Button elevation={0} onClick={openSignInPage} sx={{ marginLeft:"auto" }} variant="contained">{t('sign_in')}</Button>
                                    <Button elevation={20} onClick={openSignUpPage} sx={{ marginLeft:1, backgroundColor:colors.brandColor[200], color:"white" }} variant="contained">{t('sign_up')}</Button>
                                  </>
                                )
                            }
                        </Box>
                  </Grid>
              </Grid>
              )} 
          </Toolbar>
      </AppBar>
    </>
  )
}

export default Topbar
