import { AppBar, Box, Button, IconButton, Tab, Tabs, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { Grid } from "@mui/material"
import { useTheme } from "@mui/material";
import { tokens, ColorModeContext } from "../../theme";
import { useContext, useState } from "react";
import DrawerComp from "./Drawer";

import  LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import  DarkModeOutlinedIcon  from '@mui/icons-material/DarkModeOutlined';
import { LanguageOutlined } from "@mui/icons-material";
import {Link, useNavigate } from "react-router-dom";
import LanguageButton from "../LanguageButton";

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';

const languages=[
  {
    code:'en',
    name:'English',
    country_code:'English'
  },

  {
    code:'am',
    name:'አማርኛ',
    country_code:'Ethiopia'
  },
  {
    code:'oro',
    name:'Afan Oromo',
    country_code:'Ethiopia'
  },

  {
    code:'tg',
    name:'ትግርኛ',
    country_code:'Ethiopia'
  },
]




const Topbar = ({menuItems}) => {
  const currentLanguageCode=cookies.get('i18next') || 'en'
  const currentLanguage=languages.find(l=>l.code===currentLanguageCode)
  const { t } = useTranslation()

    const theme=useTheme()
    const colors=tokens(theme.palette.mode)
    const colorMode=useContext(ColorModeContext);

    // Optimize page for mobile view (Responsive)
    const isMatch=useMediaQuery(theme.breakpoints.down('md'))

    // Indicate which tab is selected
    const [tabValue, setTabValue]=useState(0);

    // Hide / Show Menu
    const [showMenu, setShowMenu]=useState(true)

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
       backgroundColor:colors.primary[100], 
       zIndex:2 }}>
          <Grid container>
            <Grid item xs={10}>
                <Typography variant="h6">
                   &nbsp;
                </Typography>
            </Grid>
            <Grid item xs={2}>
              {/* Icons */}
                <Box display="flex">
                    <IconButton onClick={colorMode.toggleColorMode} sx={{ color:colors.grey[400] }}>
                        {theme.palette.mode==="dark" ? (
                            <DarkModeOutlinedIcon />
                        ):(
                            <LightModeOutlinedIcon />
                        )} &nbsp;
{/* 
                        <Typography variant="body1" fontWeight={500}>
                          Theme
                        </Typography> */}
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
                            <Button elevation={0} onClick={openSignInPage} sx={{ marginLeft:"auto" }} variant="contained">{t('sign_in')}</Button>
                            <Button elevation={20} onClick={openSignUpPage} sx={{ marginLeft:1, backgroundColor:colors.brandColor[200], color:"white" }} variant="contained">{t('sign_up')}</Button>
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
