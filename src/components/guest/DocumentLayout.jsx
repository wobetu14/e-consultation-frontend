import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import cookies from 'js-cookie';
import { BrowserRouter, Link, Outlet, Route, RouterProvider, Routes  } from 'react-router-dom';
import Topbar from '../../partials/main-menu/Topbar';
import { tokens, useMode } from '../../theme';
import Footer from '../../partials/Footer';

// import { ColorModeContext, useMode, token } from '../theme';
// import { CssBaseline, ThemeProvider } from '@mui/material';

// import Topbar from '../scenes/dashboard/global/Topbar';
// import Sidebar from '../scenes/dashboard/global/Sidebar';

// import Topbar from '../components/admin/partials/global/Topbar';
// import Sidebar from '../components/admin/partials/global/Sidebar';


const DocumentLayout = () => {
 
  const [theme, colorMode]=useMode();
  const colors = tokens(theme.palette.mode);
const {t}=useTranslation();

const menuItemsText=[
  {id:1, linkText:`${t('home')}`, to:"/"},
  {id:2,linkText:`${t('about')}`, to:"/about"},
  {id:3,linkText:`${t('help_center')}`, to:"/help"},
  // {id:4,linkText:`${t('admin')}`, to:"/admin"},
];

  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
  
        <div >  
          <main className='content'>   
            <Topbar menuItems={menuItemsText} />
              <Outlet />
            <Footer />
          </main> 
        </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
    
  );
}



export default DocumentLayout;


