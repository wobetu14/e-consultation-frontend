import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { BrowserRouter, Link, Outlet, Route, RouterProvider, Routes  } from 'react-router-dom';

import { ColorModeContext, useMode, tokens } from '../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

// import Topbar from '../scenes/dashboard/global/Topbar';
// import Sidebar from '../scenes/dashboard/global/Sidebar';

import Topbar from '../components/admin/partials/global/Topbar';
import Sidebar from '../components/admin/partials/global/Sidebar';
import CommenterSidebar from '../components/guest/CommenterSidebar';



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

function CommenterLayout() {
  const currentLanguageCode=cookies.get('i18next') || 'en'
  const currentLanguage=languages.find(l=>l.code===currentLanguageCode)
  const { t } = useTranslation()

  const [theme, colorMode]=useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App' style={{  backgroundColor:colors.grey[100] }}>
           <CommenterSidebar />
          <main className='content'>
            <Topbar /> 
            <Outlet />
          </main> 
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    
  );
}



export default CommenterLayout;


